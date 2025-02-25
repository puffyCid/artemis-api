---
sidebar_position: 2
---

# Installation

Currently only Windows, macOS, and Linux binaries from
[GitHub Releases](https://github.com/puffyCid/artemis/releases) are provided.
Currently these binaries are **unsigned**.

Grab the latest **stable** release
[here](https://github.com/puffyCid/artemis/releases)

**Nightly** releases can be downloaded
[here](https://github.com/puffyCid/artemis/releases/tag/nightly)

## Supported Systems

Currently artemis has been tested on the following types of systems:

- Windows 8.1 and higher. Arch: 64-bit
- macOS Catalina and higher. Arch: 64-bit and ARM
- Ubuntu, Fedora, Arch Linux. Arch: 64-bit and ARM

If you would like support for another OS or architecture please open an issue.

## GitHub Releases

Once downloaded for you platform from GitHub, extract the binary from the
archive and you should be able to start collecting forensic data!

## Build from Source

You may also build artemis from [source](https://github.com/puffycid/artemis).
In order build artemis you will need to install the Rust programming langague.

- Instructions to install Rust can be found on the
  [Rust Homepage](https://www.rust-lang.org/).

Once Rust is installed you can download the source code for artemis using git:

```
git clone https://github.com/puffycid/artemis
```

Navigate to your downloaded repo and the cli directory and run:

```
// from the cli/ directory in the artemis repo
cargo build
```

By default cargo builds a `debug` version of the binary. If you want to build
the `release` version (**recommended**) of the binary run:

```
cargo build --release
```

The release version will be **much** faster and smaller than the debug version.
The compiled binary will be located at:

- `<path to artemis repo>\target\debug\artemis` for the debug version
- `<path to artemis repo>\target\release\artemis` for the release version

:::info

Alternatively, you may also install the command runner
[Just](https://github.com/casey/just) and run:

```
just cli
or for Windows
just --shell pwsh.exe --shell-arg -c cli
```

to compile artemis

Please see the [Contributing](../Contributing/overview.md) documentation if you
would like to compile the entire project including optional experimental
components

::::
