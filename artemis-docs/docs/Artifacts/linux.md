---
sidebar_position: 3
---

# Linux

Currently artemis has been tested on Ubuntu 18.04 and higher, Fedora, and Arch
Linux.

A main focus point of artemis is to make a best effort to not rely on the
Windows APIs. Since artemis is a forensic focused tool, we do not want to rely
on APIs from a potentially compromised system.

However, artemis does use the Linux API for a handful of artifacts:

- Processes - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  used to pull a process listing using Linux APIs
- Systeminfo - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  also to get system information using Linux APIs
