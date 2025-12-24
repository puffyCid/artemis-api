---
sidebar_position: 1
description: How to script with artemis
---

# Overview

A really cool capability of artemis is it contains an embedded JavaScript
runtime thats designed specifically for DFIR! Artemis uses
[Boa](https://boajs.dev/) a JS engine written in Rust.

Using an embedded JS engine allows us to call Rust functions from JavaScript!\
For example, the artemis function `get_registry()` can be used to parse a
provided Registry file on disk. By registering this function with Boa we can
call this function directly from JavaScript! In addition to JavaScript, we have
[TypeScript](https://www.typescriptlang.org/) bindings that we can leverage!

To summarize:

1. We can create a script using TypeScript and call Rust functions directly
2. Compile TypeScript to JavaScript
3. Execute JavaScript using artemis

:::info

The JS runtime in artemis is kind of like the VQL language for
[Velociraptor](https://docs.velociraptor.app/docs/vql/) or the
[Dissect forensic framework](https://github.com/fox-it/dissect)

All three let you script forensic collections and parsing

:::

# Prerequisites for Scripting.

1. A text-editor or IDE that supports TypeScript.
   [VSCodium](https://vscodium.com/) and
   [VSCode](https://code.visualstudio.com/) have been tested
2. A TypeScript to JavaScript bundler
   - [esbuild](https://esbuild.github.io/). Is a a popular one and is extremely
     fast
