---
sidebar_position: 1
---

# Prerequisites

There a few required applications you will need in order to build and develop
artemis.

1. artemis is written in Rust. So you will need to download and install the
   [Rust](https://www.rust-lang.org/) programming language
2. Git
3. [Rust analzyer](https://rust-analyzer.github.io/)
4. An IDE or text editor. [VSCode](https://code.visualstudio.com/) or
   [VSCodium](https://vscodium.com/) are great choices.

artemis has been developed on:

- macOS 12 (Monterey) and higher
- Windows 10 and higher
- Common popular Linux distros (Ubuntu, Arch Linux, Debian)

# Recommended

1. [Just](https://github.com/casey/just)

# Building

Once you have Rust and Git installed you can build artemis.

1. Clone artemis repo at
   [https://github.com/puffycid/artemis](https://github.com/puffycid/artemis)
2. Navigate to the source code
3. Run `cargo build`. By default cargo builds a `debug` version of the binary.
   If you want to build the `release` version of the binary run
   `cargo build --release`

```sh
# Download artemis source code
git clone https://github.com/puffycid/artemis
cd artemis/cli (or artemis/artemis-core for just the library)

# Build debug version
cargo build
# Build release version
cargo build --release
```

# Advanced

If you want to build the entire artemis project, you will need additional
prerequisites. These additional prerequisites are required to build the
experimental server and webui.

## Advanced Prerequisites

1. Install [NodeJS](https://nodejs.org/en). Required to install TailWindCSS and
   DaisyUI
2. Install [Insomnia](https://github.com/Kong/insomnia). You do not need an
   account. Local Scratch Pad works fine.
3. Add WASM support for Rust `rustup target add wasm32-unknown-unknown`
4. Install TailWindCSS `npm install -D tailwindcss`
5. Install DaisyUI `npm i -D daisyui@latest`
6. Install Typography `npm install -D @tailwindcss/typography`
7. Install [Trunk](https://trunkrs.dev/). Required to compile the webui to web
   assembly
8. Build the entire project with `just build` or build only the server with
   `just server`

### Server Interaction

Download and import the Insomnia config from the repository to interact with the
server.
