---
sidebar_position: 1
---

# Prerequisites

There are few required applications you will need in order to build and develop
artemis.

1. artemis is written in Rust. So you will need to download and install the
   [Rust](https://www.rust-lang.org/) programming language
2. Git
3. [Rust analyzer](https://rust-analyzer.github.io/)
4. An IDE or text editor. [VSCode](https://code.visualstudio.com/) or
   [VSCodium](https://vscodium.com/) are great choices.
5. The command runner [Just](https://github.com/casey/just). Just is used to
   help build the entire artemis project and is **highly** recommended
6. cmake (for building zlib)

:::info

If you use Chocolatey to install cmake. You need to make sure to install with:
`choco install cmake.install --installargs '"ADD_CMAKE_TO_PATH=User"'`

Cmake is not added to you path by [default](https://github.com/chocolatey-community/chocolatey-packages/issues/987)

:::

:::info

Windows users will need to add extra arguments to the just command:\
`just --shell pwsh.exe --shell-arg -c`

On Windows if you get an error like:\
`error: Recipe _wasm could not be run because just could not find the shell: program not found`

that means you forgot provide: `just --shell pwsh.exe  --shell-arg -c`

:::

artemis has been developed on:

- macOS 12 (Monterey) and higher
- Windows 10 and higher
- Linux distros such as Ubuntu, Arch Linux, and Debian

# Building

Once you have the prerequisites installed you can build artemis.

1. Clone artemis repo at
   [https://github.com/puffycid/artemis](https://github.com/puffycid/artemis)
2. Navigate to the repo
3. Run `just cli` or `just --shell pwsh.exe  --shell-arg -c cli` for Windows

```sh
# Download artemis source code
git clone https://github.com/puffycid/artemis
cd artemis

# Build just the CLI executable
just cli

# Build just the library
just core
```

Full list of just commands (via `just --list`)

| Command    | Description                                      |
| ---------- | ------------------------------------------------ |
| build      | Build the entire artemis project                 |
| cli        | Build the artemis executable                     |
| complex    | Run the scc tool against the artemis source code |
| core       | Build the artemis library                        |
| default    | Run clippy                                       |
| ese        | Run all the ESE parsing tests                    |
| filesystem | Run all the filesystem tests                     |
| linux      | Run all the Linux tests                          |
| macos      | Run all the macOS tests                          |
| nextest    | Run all tests using nextest                      |
| runtime    | Run all the JS runtime tests                     |
| server     | Build the artemis server and start it            |
| shellitems | Run all the ShellItem parsing tests              |
| test       | Run all artemis tests                            |
| unix       | Run all Unix tests                               |
| windows    | Run all Windows tests                            |
| wmi        | Run all WMI parsing tests                        |

# Additional Optional Tools

1. [nextest](https://nexte.st/) can be used as an alternative to
   `cargo test --release`
2. [scc](https://github.com/boyter/scc) can be used to measure code complexity
   in artemis

# Advanced

If you want to build the entire artemis project, you will need additional
prerequisites. These additional prerequisites are required to build the
experimental server and webui.

:::info

The binaries downloaded from GitHub do not contain the server and webui
components/workspaces. They just contain the cli components/workspace.

:::

## Advanced Prerequisites

1. Install [NodeJS](https://nodejs.org/en). NodeJS is required to install
   TailWindCSS and DaisyUI
2. Install [Insomnia](https://github.com/Kong/insomnia). You do not need an
   account. Local Scratch Pad works fine.
3. Add WASM support for Rust via `rustup target add wasm32-unknown-unknown`
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
