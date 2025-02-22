+++
title = 'Getting started with CMake'
summary = "CMake made slightly simpler"
description = "CMake made slightly simpler"
date = '2025-02-22'
tags = ['C', 'Build Systems', 'Beginner']
showReadingTime = false
showComments = true
+++
CMake is one of the most popular build systems for C/C++ today, and its flexibility makes it a great choice for C projects of any size. 
Many CMake tutorials exist (including [this official one](https://cmake.org/cmake/help/latest/guide/tutorial/A%20Basic%20Starting%20Point.html)) but I usually find them difficult to follow; they tend to assume that the reader has pre-existing CMake experience, and they're usually either too detailed or not detailed enough.

Here's my take on a practical, beginner-friendly guide to CMake.

# What does CMake do?
**TL;DR: CMake builds your build system, which it then uses to compile and link your code.**

IDEs like Visual Studio and CLion leverage their own build systems under the hood. 
They allow the user to tweak their build configuration, but reasonable defaults are selected on the user's behalf.

Command-line friendly C/C++ builds traditionally rely on Makefiles or build systems like Ninja, both of which require a nontrivial understanding of their syntax to author. 
CMake simplifies this by generating build files for various build systems, including Make and Ninja, from a higher-level project description.

The best way to understand the value of CMake is through a concrete example.

## Building a single file

{{< notice note >}}
I worked through this example in Debian via WSL. 
I installed dependencies via:
```
sudo apt update && sudo apt upgrade
sudo apt install build-essential
sudo apt install cmake
```
{{< /notice >}}

Let's say I have this uninteresting file, `sum.c`:

```c
#include <stdio.h>
int main(void)
{
    int a, b, sum;
    printf("Enter two space-separated numbers: ");
    sum = a + b;
    printf("The sum is %d\n", sum);
    return 0;
}
```

I can compile this file into an executable with `gcc sum.c -o sum`, but I can also use CMake for my build.
Here's what a minimum viable `CMakeList.txt` for this file would look like:

```cmake
cmake_minimum_required(VERSION 3.25)
project(Sum)
add_executable(Sum sum.c)
```

- We specify a minimum required CMake version with [cmake_minimum_required()](https://cmake.org/cmake/help/v3.25/command/cmake_minimum_required.html).
CMake has deprecated and added various features over its lifetime, and this setting says, "if you're not updated to this version, builds won't work."
- [project()](https://cmake.org/cmake/help/v3.25/command/project.html?highlight=project) defines my project's name.
- [add_executable({project_name} {sources_filename})](https://cmake.org/cmake/help/v3.25/command/add_executable.html?highlight=add_executable) sets the sources files that should be built to create my project. 

{{< notice note >}}
Like CMake, the C++ standard has changed significantly over time. 
[CXX_STANDARD](https://cmake.org/cmake/help/v3.25/prop_tgt/CXX_STANDARD.html) can be used to specify which C++ standard your project depends on.
I've excluded this property from my `CMakeList.txt` because my sample project is written in C.
{{< /notice >}}

From the root of our project directory, we run CMake with: `cmake .`

CMake will output something like:

```
-- The C compiler identification is GNU 12.2.0
-- The CXX compiler identification is GNU 12.2.0
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done
-- Generating done
-- Build files have been written to: /home/gibby/repos/math
```

If I check my project directory, I'll see that CMake has generated a bunch of files: `CMakeCache.txt`, `cmake_install.cmake`, a `CMakeFiles` directory, and a `Makefile`. 
You don’t need to worry about the meaning or contents of these files - that’s the magic of CMake. 
Given a declarative `CMakeLists.txt`, CMake generates all the necessary configuration to compile an executable. 
No build system expertise is needed.

{{< notice tip >}}
If you're using git, you shouldn't check-in these generated files. 
Here's how I exclude CMake files in my `.gitignore`:

```
build/
CMakeCache.txt
CMakeFiles/
cmake_install.cmake
Makefile
```
{{< /notice >}}

Next, run: `cmake --build .`

CMake will output something like:

```
[ 50%] Building C object CMakeFiles/Sum.dir/sum.c.o
[100%] Linking C executable Sum
[100%] Built target Sum
```

At this point, I can run my built executable with `./sum`. I have achieved bare minimum CMake proficiency!

## Building several files
Let's say that I want to extend my project to support `subtract` alongside `sum`. 
I define `main.c` like this:

```c
#include <stdio.h>
#include <string.h>

void sum(); // Updated sum.c to contain void sum() instead of int main(void)
void subtract();

int main(int argc, char *argv[])
{
    if (strcmp(argv[1], "sum") == 0) {
        sum();
    } else if (strcmp(argv[1], "sub") == 0) {
        subtract();
    } else {
        fprintf(stderr, "Error: Invalid argument. Use 'sum' or 'sub'.\n");
        return 1;
    }

    return 0;
}
```

(We'll say that `subtract.c` is as uninteresting as `sum.c` is.)

At this point, if I rerun `cmake .` then nothing happens. 
As far as CMake is concerned, `sum.c` still exists so my `CMakeLists.txt` is still technically valid. 
But if I attempt to rerun `cmake --build`, I'll hit these nasty errors:

```
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/12/../../../x86_64-linux-gnu/Scrt1.o: in function `_start':
(.text+0x17): undefined reference to `main'
collect2: error: ld returned 1 exit status
gmake[2]: *** [CMakeFiles/Sum.dir/build.make:97: Sum] Error 1
gmake[1]: *** [CMakeFiles/Makefile2:83: CMakeFiles/Sum.dir/all] Error 2
gmake: *** [Makefile:91: all] Error 2
```

Confusing and scary! 
CMake is complaining because `sum.c` no longer contains `main()`, so it can't be used to create an executable anymore.
We need to update `CMakeLists.txt` to fix this. 
The change is small:

{{< highlight cmake "hl_lines=3" >}}
cmake_minimum_required(VERSION 3.25)
project(Math)
add_executable(Math sum.c subtract.c main.c) # No commas!
{{< / highlight >}}

Obviously we don't want to manually update this config every time we add a new file to our project. 
Let's rearrange the project like this:

```
└── 📁src
    └── CMakeLists.txt
    └── main.c
    └── subtract.c
    └── sum.c
└── CMakeLists.txt
```

The root-level `CMakeLists.txt` contains:

```cmake
cmake_minimum_required(VERSION 3.25)
project(Math)
add_subdirectory(src)
```

[add_subdirectory()](https://cmake.org/cmake/help/v3.25/command/add_subdirectory.html?highlight=add_subdirectory) is a new command.
It tells CMake, "the project will contain stuff in `src`, go read the `CMakeLists.txt` over there."

`src/CMakeLists.txt` contains:

```cmake
file(GLOB SOURCES "*.c")
add_executable(Math ${SOURCES})
set_target_properties(
    Math PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
)
```

- The [file(GLOB)](https://cmake.org/cmake/help/latest/command/file.html#glob) line means, "find all files in this directory that match `*.c` and store them as variable `SOURCES`."
This will contain all of the `.c` files in `src`. 
- Just like we had in our simple example, `add_executable()` is used to tell CMake which files are needed to build the `Math` project. 
We pass in the `${SOURCES}` variable instead of a hard-coded list of files.
- The final line updates the target properties of `Math` so that the `Math` executable is output to `${CMAKE_BINARY_DIR}`, which is the root dir of our project. 
If you omit this line, then running `cmake --build .` from the root will output `Math` into `/src`.

{{< notice tip >}}
This change has CMake creating an executable named `Math`, but I still have old `Sum` executables sitting in my workspace.
`cmake --build . --clean-first` can be used to cleanup old CMake artifacts prior to building.
{{< /notice >}}

## Linking libraries
As a final extension to this `Math` project, let's define a new `util` library. 
We can use this library to store common functions like `isEven()` or `isPrime()`.

We add `util` to the project like this:

{{< highlight md "hl_lines=2-5" >}}
└── 📁src
    └── 📁util
        └── CMakeLists.txt
        └── util.c
        └── util.h
    └── CMakeLists.txt
    └── main.c
    └── subtract.c
    └── sum.c
└── CMakeLists.txt
{{< / highlight >}}

The contents of `util.c` and `util.h` are uninteresting, but the contents of `src/util/CMakeLists.txt` are important:

```cmake
file(GLOB UTIL_SOURCES "*.c")
add_library(util ${UTIL_SOURCES})
```

This is pretty similar to `src/CMakeLists.txt`, but we use [add_library](https://cmake.org/cmake/help/v3.25/command/add_library.html?highlight=add_library) instead of `add_executable`. 
We consider this `util` subdirectory to be a library because we want to use this code in the `Math` executable; we don't want to produce separate `Math` and `Util` executables. 
I don't specify a special `RUNTIME_OUTPUT_DIRECTORY` because I personally don't care where the library ends up, as long as it's accessible to `Math`.

`sum.c` and `subtract.c` can access the functionality in `util` via `#include "util/util.h"`, but we still need to update `src/CMakeLists.txt` to compile the executable successfully. 
Here are the necessary changes:

{{< highlight cmake "hl_lines=2 4" >}}
file(GLOB SOURCES "*.c")
add_subdirectory(util)
add_executable(Math ${SOURCES})
target_link_libraries(Math util)
set_target_properties(
    Math PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
)
{{< / highlight >}}

We set `add_subdirectory(util)` to ensure that CMake processes `src/util/CMakeLists.txt` during compilation, just like we set `add_subdirectory(src)` from the root. 
Then we use [target_link_libraries()](https://cmake.org/cmake/help/v3.25/command/target_link_libraries.html?highlight=target_link_libraries) to tell CMake, "make sure you link `Math` to this `util` library".

With these changes, output of `cmake --build .` looks like this:

```
cmake --build .
[ 16%] Building C object src/util/CMakeFiles/util.dir/util.c.o
[ 33%] Linking C static library libutil.a
[ 33%] Built target util
[ 50%] Linking C executable ../Math
[100%] Built target Math
```

And that's about it! 

CMake has a lot of features and can be used to generate highly complex build systems, but as a C/C++ hobbyist, this is basically all that I've ever needed from CMake. 
I usually avoid using heavyweight IDEs, and CMake has made C development a lot more accessible to me.