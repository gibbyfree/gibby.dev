+++
title = 'Static extraction of Docker image artifacts'
summary = 'If a dockerfile is built in a container and no one is around to see it, does it make a sound?'
description = 'If a dockerfile is built in a container and no one is around to see it, does it make a sound?'
date = '2024-05-17'
tags = ['devops', 'guide']
+++
Recently, I've been grappling with Docker containers. When I build a dockerfile via `docker build`, my host machine has limited visibility into the containerized build process. 

This is by Docker design, but still presents a challenge if I want to monitor Docker builds at scale.

I can move monitoring into the dockerfile itself, but then I run into another issue - how do I pull relevant artifacts **out of** the resulting Docker image? Bonus points if I can extract these artifacts **without** running Docker.

{{< notice info >}}
A Dockerfile contains a sequence of build instructions executed within an isolated (containerized) environment. These instructions generate a Docker image, which serve as a blueprint for container creation. 

When an image is executed, Docker creates a container based on the image, effectively reproducing the environment defined in the Dockerfile. 

Each instruction in a Dockerfile corresponds to an *image layer*. A given layer contains the delta between the current layer and the previous one, usually representing a change in the underlying container's file system or configuration.
{{< /notice >}}

# Setting up a Docker image
Let's start by building a Docker image. Here's my motivating example:

```docker
FROM rust:1.76.0-alpine3.18

RUN apk update && apk add strace

COPY . .
WORKDIR /app
RUN strace -o trace.log cargo run
```
This dockerfile copies an application into the Docker build context and traces the application's build with `strace`. `strace` will output its logfile to `trace.log`.

Let's say I'm tracing my build with `strace` because my Rust project is open-source and frequently integrates new open-source dependencies. To protect myself from supply chain attacks, I want to watch for suspicious network calls when my app is executed. The only way to collect this information from the Docker build is by running `strace` from within the container.

# The problem
...But then how do we actually get our hands on `trace.log`? We could `docker run` the container and search its file system manually. But what if I'm trying to integrate this check into my CI pipeline? Can this process be automated?

This general problem applies to any scenario where your Dockerfile produces some artifact that you'd like to extract from the resulting container. 

I'm personally interested in this tracing example because a command like `strace -o trace.log docker build -f Dockerfile .` doesn't produce an interesting `trace.log`, due to the containerized build process that I mentioned earlier. 

# The solution
First, build and save the Docker image:

```sh
docker build -f Dockerfile -t myimage:1.0 .
docker save -o myimage.tar myimage:1.0
```

This `docker build` command builds the `Dockerfile` in the current directory (`.`) and tags the resulting image with `myimage:1.0`. `docker save` compresses the image to a `.tar` file - these `.tar` files are typically used to distribute, deploy, and/or backup Docker images. For my case, `docker save` will save the image in a more easily dissectible format. 

I'll extract the image tarball to a clean output directory:

```sh
mkdir myimage
tar -xvf myimage.tar -C myimage
```

Once extracted, here are the contents of `myimage`:

```md
📁myimage
 └── 📁blobs
     └── 📁sha256
         └── 1fc818d7122c2955f10c33a86a84be0585dce8264f07ff20d26d6e4d77072689
         └── 5500516daa5d159d01f04ea168438de6cbc4a86197cf3b462b7f00e1054f1fe6
         └── 5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef
         └── 60be3224167df7d3927eef73eab4d9fbac87c2ad227db7302f62c715ee1aedcf
         └── 79643e31b5e64ee2c97c3fada467f944d97691b15beeabd27d60bb24dcf62958
         └── 807a30def12c95b7638d81513f8ff014b82e0be9b02c3a2741a2de417afff353
         └── aedc3bda2944bb9bcb6c3d475bee8b460db9a9b0f3e0b33a6ed2fd1ae0f1d445
         └── b7da1d95051fa9e21f5c9934d4abb8686038e4d76775c857a39644fc3a7b8e81
         └── b88b8a4eae96dcec86268cf8c5b53dac6c263430682a7f1705e35eb34f5b4a5a
         └── cb35dc109a5e6c8f76a05a26ae1178fc7489ddf690110600dc0b60ea05d371c0
         └── d708bd3ae8e28161aa0fa6207912621fd352c1126593347982cde1a2e609ac14
         └── dcc8140df88f28d0f2807d30bae4a76c2d597e1dda6f98274d37c5bfc0e9dd06
         └── dd4e2e76f6fc4791b1dd86cee52df664163fd809ed59bd9eb2181a4db94b65a2
         └── e78fc723f9dec6ad6c8cdac73bd8df9c477b3fe62741df0b2e6112d47b35c132
         └── f0a1565b3b4d7c42ab9ad5f613fecdf9c84a493e5c31ee7c155b45e74b5f17d4
         └── f53c508663464b69bf26e90bc5d916b171aa7c946ddc9c6b761aeaed2839996e
 └── index.json
 └── manifest.json
 └── oci-layout
 └── repositories
```

Each of these (extensionless) hashed files under `blobs/sha256` represent a layer in the Docker image. I'm guaranteed to find `trace.log` somewhere in this forest of layers.

## Naive approach
Knowing this, I might try to find `strace.log` with brute force. I can just extract every layer under `blobs/sha256`, then recursively search all child directories for `strace.log`. 

I can try automating this procedure with a script like this:

```bash
#!/bin/bash

BLOBS_DIR="./myimage/blobs/sha256"

# Attempt extraction on all extensionless files
for file in "$BLOBS_DIR"/*; do
    if [ -f "$file" ]; then
        echo "Attempting extraction of $file..."
        tar -xf "$file" -C "$BLOBS_DIR"
    fi
done

# Search for trace.log in the blobs directory
find "$BLOBS_DIR" -type f -name "trace.log"
```

When I run this script, I encounter this error for a few of the layers:
`tar: This does not look like a tar archive` but the script continues on and `trace.log` is eventually located. Yay!

Although this approach works for this simple case, there are some drawbacks. 

My image is based on a lightweight `alpine` image, but if I were using a beefier `ubuntu` image then this script might take a very long time to execute. This is because the base image itself is also contained within `blobs/sha256`, so locating `trace.log` involves extracting layers that contain the image base's file system. 

{{< notice note >}}
When experimenting with this approach in a CI environment, I wanted to cleanup `$BLOBS_DIR` to prevent the unpacked tarball from leaking into my build artifacts. I ran into ownership-related errors when trying to delete base image files form `$BLOBS_DIR`. This may have been an issue specific to my build system though.
{{< /notice >}}

## Better approach
It's possible to locate `strace.log` and extract a *single layer* of the image - i.e., no unnecessary extractions. To do this, we need to leverage some knowledge of the [OCI Image Specification](https://github.com/opencontainers/image-spec/blob/main/spec.md) to decode the contents of `myimage.tar`. 

First, I'll reference the [OCI image manifest spec](https://github.com/opencontainers/image-spec/blob/main/manifest.md) to understand more about `manifest.json`. My image's `manifest.json` looks like this:

```json
[
    {
        "Config": "blobs/sha256/b88b8a4eae96dcec86268cf8c5b53dac6c263430682a7f1705e35eb34f5b4a5a",
        "RepoTags": [
            "myimage:1.0"
        ],
        "Layers": [
            "blobs/sha256/aedc3bda2944bb9bcb6c3d475bee8b460db9a9b0f3e0b33a6ed2fd1ae0f1d445",
            "blobs/sha256/5500516daa5d159d01f04ea168438de6cbc4a86197cf3b462b7f00e1054f1fe6",
            "blobs/sha256/cb35dc109a5e6c8f76a05a26ae1178fc7489ddf690110600dc0b60ea05d371c0",
            "blobs/sha256/79643e31b5e64ee2c97c3fada467f944d97691b15beeabd27d60bb24dcf62958",
            "blobs/sha256/1fc818d7122c2955f10c33a86a84be0585dce8264f07ff20d26d6e4d77072689",
            "blobs/sha256/5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef",
            "blobs/sha256/d708bd3ae8e28161aa0fa6207912621fd352c1126593347982cde1a2e609ac14"
        ],
        "LayerSources": {
            "sha256:1fc818d7122c2955f10c33a86a84be0585dce8264f07ff20d26d6e4d77072689": {
                "mediaType": "application/vnd.oci.image.layer.v1.tar",
                "size": 103592960,
                "digest": "sha256:1fc818d7122c2955f10c33a86a84be0585dce8264f07ff20d26d6e4d77072689"
            },
            "sha256:5500516daa5d159d01f04ea168438de6cbc4a86197cf3b462b7f00e1054f1fe6": {
                "mediaType": "application/vnd.oci.image.layer.v1.tar",
                "size": 138808320,
                "digest": "sha256:5500516daa5d159d01f04ea168438de6cbc4a86197cf3b462b7f00e1054f1fe6"
            },
            "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef": {
                "mediaType": "application/vnd.oci.image.layer.v1.tar",
                "size": 1024,
                "digest": "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef"
            },
            "sha256:79643e31b5e64ee2c97c3fada467f944d97691b15beeabd27d60bb24dcf62958": {
                "mediaType": "application/vnd.oci.image.layer.v1.tar",
                "size": 4128256,
                "digest": "sha256:79643e31b5e64ee2c97c3fada467f944d97691b15beeabd27d60bb24dcf62958"
            },
            "sha256:aedc3bda2944bb9bcb6c3d475bee8b460db9a9b0f3e0b33a6ed2fd1ae0f1d445": {
                "mediaType": "application/vnd.oci.image.layer.v1.tar",
                "size": 7629824,
                "digest": "sha256:aedc3bda2944bb9bcb6c3d475bee8b460db9a9b0f3e0b33a6ed2fd1ae0f1d445"
            },
            "sha256:cb35dc109a5e6c8f76a05a26ae1178fc7489ddf690110600dc0b60ea05d371c0": {
                "mediaType": "application/vnd.oci.image.layer.v1.tar",
                "size": 672828928,
                "digest": "sha256:cb35dc109a5e6c8f76a05a26ae1178fc7489ddf690110600dc0b60ea05d371c0"
            },
            "sha256:d708bd3ae8e28161aa0fa6207912621fd352c1126593347982cde1a2e609ac14": {
                "mediaType": "application/vnd.oci.image.layer.v1.tar",
                "size": 4483072,
                "digest": "sha256:d708bd3ae8e28161aa0fa6207912621fd352c1126593347982cde1a2e609ac14"
            }
        }
    }
]
```

Notice that there are far fewer layers listed under `Layers` than I saw in `myimage/blobs/sha256` earlier. The manifest has filtered out any "empty" layers - i.e., layers that apply environmental changes but don't modify the file system. 

Furthermore, the "layer" listed as the manifest's `Config` isn't a layer at all. This `Config` value is a pointer to the image's `config.json`. (This `Config` path would have produced a `tar: This does not look like a tar archive` error like we saw with the naive approach.)

I can read this image's `config.json` by running this command: 

```sh
cat myimage/blobs/sha256/b88b8a4eae96dcec86268cf8c5b53dac6c263430682
a7f1705e35eb34f5b4a5a > config.json
```

The  `config.json` looks like this:

```json
{
  "architecture": "amd64",
  "config": {
      "Env": [
          "PATH=/usr/local/cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
          "RUSTUP_HOME=/usr/local/rustup",
          "CARGO_HOME=/usr/local/cargo",
          "RUST_VERSION=1.76.0"
      ],
      "Cmd": [
          "/bin/sh"
      ],
      "WorkingDir": "/app"
  },
  "created": "2024-05-13T17:06:51.253198519Z",
  "history": [
      {
          "created": "2024-01-27T00:30:56.150825642Z",
          "created_by": "/bin/sh -c #(nop) ADD file:8729f9c0258836b640e9e789c7ab029cf4547e0596557d54dd4a4d7d8e4a785f in / "
      },
      {
          "created": "2024-01-27T00:30:56.304681072Z",
          "created_by": "/bin/sh -c #(nop)  CMD [\"/bin/sh\"]",
          "empty_layer": true
      },
      {
          "created": "2024-03-11T15:56:03Z",
          "created_by": "RUN /bin/sh -c apk add --no-cache         ca-certificates         gcc # buildkit",
          "comment": "buildkit.dockerfile.v0"
      },
      {
          "created": "2024-03-11T15:56:03Z",
          "created_by": "ENV RUSTUP_HOME=/usr/local/rustup CARGO_HOME=/usr/local/cargo PATH=/usr/local/cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin RUST_VERSION=1.76.0",
          "comment": "buildkit.dockerfile.v0",
          "empty_layer": true
      },
      {
          "created": "2024-03-11T15:56:03Z",
          "created_by":"RUN /bin/sh -c set -eux;     apkArch=\"$(apk --print-arch)\";     case \"$apkArch\" in         x86_64) rustArch='x86_64-unknown-linux-musl'; rustupSha256='b9d84cbba1ed29d11c534406a1839d64274d29805041e0e096d5293ae6390dd0' ;;         aarch64) rustArch='aarch64-unknown-linux-musl'; rustupSha256='841513f7599fcf89c71a62dea332337dfd4332216b60c17648d6effbeefe66a9' ;;
*) echo \u003e\u00262 \"unsupported architecture: $apkArch\"; exit 1 ;;     esac;     url=\"https://static.rust-lang.org/rustup/archive/1.27.0/${rustArch}/rustup-init\";     wget \"$url\";     echo \"${rustupSha256} *rustup-init\" | sha256sum -c -;     chmod +x rustup-init;     ./rustup-init -y --no-modify-path --profile minimal --default-toolchain $RUST_VERSION --default-host ${rustArch};     rm rustup-init;     chmod -R a+w $RUSTUP_HOME $CARGO_HOME;     rustup --version;     cargo --version;     rustc --version; # buildkit",
          "comment": "buildkit.dockerfile.v0"
      },
      {
          "created": "2024-05-13T17:06:49.659900887Z",
          "created_by": "RUN /bin/sh -c apk update \u0026\u0026 apk add strace # buildkit",
          "comment": "buildkit.dockerfile.v0"
      },
      {
          "created": "2024-05-13T17:06:49.823538715Z",
          "created_by": "COPY . . # buildkit",
          "comment": "buildkit.dockerfile.v0"
      },
      {
          "created": "2024-05-13T17:06:49.852497547Z",
          "created_by": "WORKDIR /app",
          "comment": "buildkit.dockerfile.v0"
      },
      {
          "created": "2024-05-13T17:06:51.253198519Z",
          "created_by": "RUN /bin/sh -c strace -o trace.log cargo run # buildkit",
          "comment": "buildkit.dockerfile.v0"
      }
  ],
  "os": "linux",
  "rootfs": {
      "type": "layers",
      "diff_ids": [
          "sha256:aedc3bda2944bb9bcb6c3d475bee8b460db9a9b0f3e0b33a6ed2fd1ae0f1d445",
          "sha256:5500516daa5d159d01f04ea168438de6cbc4a86197cf3b462b7f00e1054f1fe6",
          "sha256:cb35dc109a5e6c8f76a05a26ae1178fc7489ddf690110600dc0b60ea05d371c0",
          "sha256:79643e31b5e64ee2c97c3fada467f944d97691b15beeabd27d60bb24dcf62958",
          "sha256:1fc818d7122c2955f10c33a86a84be0585dce8264f07ff20d26d6e4d77072689",
          "sha256:5f70bf18a086007016e948b04aed3b82103a36bea41755b6cddfaf10ace3c6ef",
          "sha256:d708bd3ae8e28161aa0fa6207912621fd352c1126593347982cde1a2e609ac14"
      ]
  }
}
```
The most important part of this file is the `history` array. Each entry in the `history` array corresponds to a layer, and each entry's `created_by` indicates which build command produced it. If a layer is `created_by` a command like `touch readme.txt`, then this layer .tar will contain `readme.txt`.

In the above `history` array, the entry where `created_by` contains "`-o trace.log`" describes a layer that contains `trace.log`. This is the precise layer that I want to extract.

To map each layer to its sha256 hash, filter out all layers where `empty_layer=true`. The remaining entries in `history` correspond to each hash listed in `rootfs.diff_ids` - meaning `history[n]` corresponds to `rootfs.diff_ids[n]`. 

Once I have the layer's hash, I can proceed with extracting the layer and pulling out `trace.log`.

I wrote a script which automates this entire process, given `myimage.tar`:

```bash
#!/bin/bash

# Extract myimage.tar to a clean directory
mkdir myimage
tar -xvf myimage.tar -C myimage

# Write config.json
configPath=$(jq -r '.[0].Config' myimage/manifest.json)
cat myimage/$configPath > myimage/config.json

# Read myimage/config.json and filter out empty_layer history entries
history=$(jq -c '.history[] | select(.empty_layer != true)' myimage/config.json)
historyArray=($(echo $history | jq -r '.[]'))

# Find the index of the history entry where created_by contains '-o strace.log'
index=-1
for i in "${!historyArray[@]}"; do
  if [[ ${historyArray[i]} == *"-o strace.log"* ]]; then
    index=$i
    break
  fi
done

# Read rootfs.diff_ids and get the entry at the same index
rootfs=$(jq -r ".rootfs.diff_ids[$index]" myimage/config.json)

# Strip the sha256: prefix
rootfs=$(echo $rootfs | sed 's/sha256://')

# Extract the trace.log's layer into a clean directory
mkdir $rootfs
tar -xvf myimage/blobs/sha256/$rootfs -C $rootfs

# Find trace.log in myimage/$rootfs and move it into this script's directory
script_dir=$(dirname "$0")
find $rootfs -name 'trace.log' -exec mv {} "$script_dir" \;

# Cleanup
rm -rf myimage
rm -rf $rootfs
```

This script is dependent on [`jq`](https://jqlang.github.io/jq/), which is a command-line JSON parser. 

## Post-script: ye olde Docker image spec
Prior to adopting the OCI specification with Docker 1.11, Docker had [its own image spec](https://github.com/moby/docker-image-spec/blob/main/spec.md). 

My original solution was written for the older Docker image spec, since I was working with build systems that used an older version of Docker. If you follow these steps with Docker <1.11, these `.json` files will be shaped a little differently. The same approach still works though.

Here's are the key differences that I noticed with the Docker image spec:
- Hashes correspond to directories instead of files, and each hash directory contains a `layer.tar`. Hash directories are at the top-level of the image.
- `config.json` is a `{sha256hash}.json` file in the top-level of the tarball.
- Layer hashes can't be translated using the `rootfs.diff_ids`. Once empty layers are filtered out, `history[n]` corresponds to `manifest.json`'s `layers[n]`. 

I've adopted the script above for Docker image specs here:

```bash
#!/bin/bash

# Extract myimage.tar to a clean directory
mkdir myimage
tar -xvf nc-janitor.tar -C myimage

# Write config.json
configPath=$(echo $manifestJson | jq -r '.[0].Config')
configJson=$(jq '.' $tempDir/$config)

# Read myimage/config.json and filter out empty_layer history entries
history=$(echo $configJson | jq -c '.history[] | select(.empty_layer != true)')

# Find the index of the history entry with -o strace.log
historyArray=($(echo $history | jq -r '.[]'))
index=-1
for i in "${!historyArray[@]}"; do
  if [[ ${historyArray[i]} == *"codeql database create"* ]]; then
    index=$i
    break
  fi
done

# Find the layer tarball that corresponds to the index we found above
layer=$(echo $manifestJson | jq -r ".layers[$index].digest")

# Extract the artifact's layer into a clean directory
mkdir output
tar -xvf myimage/$layer/layer.tar -C $tempDir/$layer

# Find trace.log in myimage/$rootfs and move it to the script's directory
script_dir=$(dirname "$0")
find $rootfs -name 'trace.log' -exec mv {} "$script_dir" \;

# Cleanup
rm -rf myimage
rm -rf output
```

(I'm not totally sure about the stability of Docker's image spec, but this script works for me on image tarballs saved with Docker v1.2.)