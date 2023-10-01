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
   [IntelliJ](https://www.jetbrains.com/idea/) with the Rust plugin may also
   works.

artemis has been developed on:

- macOS 12 (Monterey) and higher
- Windows 10 and higher

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
cd artemis

# Build debug version
cargo build
# Build release version
cargo build --release
```
