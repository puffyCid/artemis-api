---
sidebar_position: 2
---

# Linux

Currently artemis has been tested on Ubuntu 18.04 and higher, Fedora, and Arch
Linux. Similar to the Windows and macOS versions a main focus point of the
library `artemis-core` is to make a best effort to not rely on the macOS APIs.

Since `artemis-core` is a forensic focused library, we do not want to rely on
APIs from a potentially compromised system.

However, `artemis-core` does use the Linux API for a handful of artifacts:

- Processes - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  used to pull a process listing using Linux APIs
- Systeminfo - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  also to get system information using Linux APIs
