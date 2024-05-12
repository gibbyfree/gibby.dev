+++
title = 'Static extraction of Docker image contents'
summary = 'If a dockerfile is built in a container and no one is around to see it, does it make a sound?'
description = 'If a dockerfile is built in a container and no one is around to see it, does it make a sound?'
date = '2024-04-24'
+++
Recently, I've been grappling with Docker containers. When I build a dockerfile via `docker build`, my host machine has limited visibility into the containerized build process. 

This is by Docker design, but still presents a challenge if I want to monitor Docker builds at scale.

I can move monitoring into the dockerfile itself, but then I run into another issue - how do I pull relevant artifacts **out of** the resulting Docker image? Bonus points if I can extract these artifacts **without** running Docker.

{{< notice info >}}
A Dockerfile contains a sequence of build instructions executed within an isolated (containerized) environment. These instructions generate a Docker image, which serve as a blueprint for container creation. 

When an image is executed, Docker creates a container based on the image, effectively reproducing the environment defined in the Dockerfile. 

Each instruction in a Dockerfile corresponds to an *image layer*. A given layer contains the delta between the current layer and the previous one, usually representing a change in the underlying container's filesystem or configuration.
{{< /notice >}}

# Setting up a Docker image
Let's start by building a Docker image. Here's my motivating example:

```docker
FROM rust:1.76.0-alpine3.18

RUN apk update && apk add strace

COPY . .
WORKDIR /app
RUN strace -o trace.log cargo build
```
