---
sidebar_position: 1
---

# API Intro

Currently the artemis API is very basic. It mainly exposes Rust functions that
are callable from JavaScript. The
[artemis-api](https://github.com/puffyCid/artemis-api) contains TypeScript
bindings to make it easier for users to script and call these functions. There
also a handful of API functions for artifact parsers that are written in pure
TypeScript.

Checkout the [Getting started section](../Intro/Scripting/boa.md) for walkthrough on how to start scripting with artemis!

The API can be broken down into two broad groups of categories:

1. High level helper functions. For example, functions to read files, parse XML,
   base64 encode and decode, etc

| Category                            | Description                                         |
| ----------------------------------- | --------------------------------------------------- |
| [Filesystem](./Helper/filesystem)   | Functions to interact with the filesystem           |
| [Encoding](./Helper/encoding)       | Functions to assist with encoding and decoding data |
| [Environment](./Helper/environment) | Functions to get environment variable details       |
| [Time](./Helper/time)               | Functions to convert timestamps                     |
| [System](./Helper/system)           | Functions to get system related data                |
| [Nom](./Helper/nom)                 | Functions to parse data using nom                   |

2. Functions to directly parse OS artifacts

| Category                                    | Description                              |
| ------------------------------------------- | ---------------------------------------- |
| [Windows](./Artifacts/windows.md)           | Functions to parse Windows artifacts     |
| [macOS](./Artifacts/macos.md)               | Functions to parse macOS artifacts       |
| [Linux](./Artifacts/linux.md)               | Functions to parse Linux artifacts       |
| [Unix](./Artifacts/unix.md)                 | Functions to parse Unix artifacts        |
| [FreeBSD](./Artifacts/freebsd.md)           | Functions to parse FreeBSD artifacts     |
| [Applications](./Artifacts/applications.md) | Functions to parse Application artifacts |
