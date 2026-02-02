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

Ubuntu users can run: **just setup-ubuntu**\
Fedora users can run **just setup-fedora**\
Windows users can run **just setup-windows** (after you have installed Chocolatey
and Rust)\
macOS users can run **just setup-macos** (after you have installed Homebrew)

Windows users will need to add extra arguments to the just command:\
`just --shell pwsh.exe --shell-arg -c`

On Windows if you get an error like:\
`error: Recipe _cargo-plugins could not be run because just could not find the shell: program not found`

it means you forgot provide: `just --shell pwsh.exe  --shell-arg -c`

:::


:::info

If you are using a Windows ARM device. Winget is recommended instead of Chocolatey

:::

If you would like to install the build dependencies manually, review the Just
files .setup folder in the artemis repo for your platform.

Artemis has been developed on:

- macOS 12 (Monterey) and higher
- Windows 10 and higher
- Linux distros such as Ubuntu, Debian, and Fedora

## Building

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
just forensics
```

Full list of just commands (via `just --list`)

```just
Available recipes:
    build                       # Build the entire artemis project.
    complex                     # Review complexity with scc
    default                     # Run cargo clippy on artemis project
    filesystem                  # Test only the FileSystem functions
    nextest                     # Test the entire artemis project using nextest
    runtime                     # Test only the JavaScript runtime
    test                        # Test the entire artemis project
    timeline                    # Test only the timelining functions

    [artifacts]
    ese                         # Test only the ESE parsing functions
    eventlogs                   # Test only the Eventlog parsing functions
    mft                         # Test only the MFT parsing functions
    outlook                     # Test only the Outlook parsing functions
    registry                    # Test only the Registry parsing functions
    shellitems                  # Test only the ShellItems parsing functions
    spotlight                   # Test only the Spotlight parsing functions
    wmi                         # Test only the WMI parsing functions

    [daemon]
    cleanup-podman              # Stop ALL Podman containers and remove and prune ALL container data
    daemon-podman               # Start the example artemis daemon in a Podman container and connect to server Podman container
    daemon-preview              # Spawn three daemon containers to connect to server.
    server-podman               # Start the example daemon server in a Podman container

    [os]
    linux                       # Test all the Linux artifacts
    macos                       # Test all the macOS artifacts
    windows                     # Test all the Windows artifacts

    [package]
    deb version                 # Package Artemis into DEB file
    msi                         # Package Artemis into Windows MSI installer file
    pkg team_id version profile # Package Artemis into macOS PKG installer file
    rpm                         # Package Artemis into RPM file

    [setup]
    setup-fedora                # Setup Artemis development environment for Fedora
    setup-macos                 # Setup Artemis development environment for macOS
    setup-ubuntu                # Setup Artemis development environment for Ubuntu
    setup-windows               # Setup Artemis development environment for Windows

    [workspace]
    cli                         # Just build the artemis binary
    forensics                   # Just build the forensics library
    slim                        # Just build the artemis binary. But do not enable Yara-X

```

### Building for esoteric platforms

Artemis can be compiled for a variety of platforms using [cross](https://github.com/cross-rs/cross). Once you have cross setup you can build artemis for:
- FreeBSD
- NetBSD
- Android
- Linux (RISC-V, musl, PowerPC, SPARC)
- [illumos](https://en.wikipedia.org/wiki/Illumos)

If you want to build for Android or NetBSD you have to disable the yara-x dependency
 - cross build --release --no-default-features

If you want to build for Windows ARM. You will need a Windows ARM VM or device and will need to install [LLVM](https://learn.arm.com/install-guides/llvm-woa/) and cmake.