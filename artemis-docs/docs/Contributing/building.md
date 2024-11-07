---
sidebar_position: 1
---

# Prerequisites

## Automated Setup

If you would like to build and develop Artemis yourself you will need a few
required applications:

1. Artemis is written in Rust. So you will need to download and install the
   [Rust](https://www.rust-lang.org/) programming language
2. Git
3. [Rust analyzer](https://rust-analyzer.github.io/)
4. An IDE or text editor. [VSCode](https://code.visualstudio.com/) or
   [VSCodium](https://vscodium.com/) are great choices.
5. The command runner [Just](https://github.com/casey/just).

Windows users will need to install
[Chocolatey](https://community.chocolatey.org/). In addition, you will need to
install the MSVC version of [Rust](https://www.rust-lang.org/) macOS users will
need to install [Homebrew](https://brew.sh/)

You can use Just to automate most of the setup process.

:::info

Ubuntu users can run: `just setup-ubuntu`\
Fedora users can run `just setup-fedora`\
Windows users can run `just setup-windows` (after you have installed Chocolatey
and Rust)\
macOS users can run `just setup-macos` (after you have installed Homebrew)

Windows users will need to add extra arguments to the just command:\
`just --shell pwsh.exe --shell-arg -c`

On Windows if you get an error like:\
`error: Recipe _wasm could not be run because just could not find the shell: program not found`

it means you forgot provide: `just --shell pwsh.exe  --shell-arg -c`

:::

If you would like to install the build dependencies manaully, review the Just
files .setup folder in the artemis repo for your platform.

Artemis has been developed on:

- macOS 12 (Monterey) and higher
- Windows 10 and higher
- Linux distros such as Ubuntu, Debian, and Fedora

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

| Command       | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| build         | Build the entire artemis project                                  |
| cli           | Build the artemis executable                                      |
| complex       | Run the scc tool against the artemis source code                  |
| core          | Build the artemis library                                         |
| default       | Run clippy                                                        |
| ese           | Run all the ESE parsing tests                                     |
| filesystem    | Run all the filesystem tests                                      |
| linux         | Run all the Linux tests                                           |
| macos         | Run all the macOS tests                                           |
| nextest       | Run all tests using nextest                                       |
| runtime       | Run all the JS runtime tests                                      |
| server        | Build the artemis server and start it                             |
| client        | Build the artemis client and attempt to connect to artemis server |
| shellitems    | Run all the ShellItem parsing tests                               |
| test          | Run all artemis tests                                             |
| unix          | Run all Unix tests                                                |
| windows       | Run all Windows tests                                             |
| wmi           | Run all WMI parsing tests                                         |
| outlook       | Run all the Outlook parsing tests                                 |
| spotlight     | Run all the Spotlight parsing tests                               |
| setup-ubuntu  | Install all artemis development dependencies on Ubuntu            |
| setup-fedora  | Install all artemis development dependencies on Fedora            |
| setup-windows | Install all artemis development dependencies on Windows           |
| setup-macos   | Install all artemis development dependencies on macOS             |

### Server Interaction

Download and import the Insomnia config from the repository to interact with the
server. The server is experimental and not bundled in the GitHub binaries
