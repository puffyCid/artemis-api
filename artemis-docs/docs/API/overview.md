---
sidebar_position: 1
---

# API Intro

Currently the artemis API is very simplistic. It just exposes Rust functions
that are callable from JavaScript. The
[artemis-api](https://github.com/puffyCid/artemis-api) contains TypeScript
bindings to make it easier for users to script and call these functions.

The API can be broken down into two broad groups of categories:

1. Highlevel helper functions. For example, functions to read files, parse XML,
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

| Category                          | Description                              |
| --------------------------------- | ---------------------------------------- |
| [Windows](./windows.md)           | Functions to parse Windows artifacts     |
| [macOS](./maocs.md)               | Functions to parse macOS artifacts       |
| [Linux](./linux.md)               | Functions to parse Linux artifacts       |
| [Unix](./unix.md)                 | Functions to parse Unix artifacts        |
| [Applications](./applications.md) | Functions to parse Application artifacts |
