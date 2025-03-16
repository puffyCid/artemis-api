---
sidebar_position: 7
---

# FreeBSD

Artemis has basic support for parsing forensic artifacts on FreeBSD systems.

A main focus point of artemis is to make a best effort to not rely on the
FreeBSD APIs. Since artemis is a forensic focused tool, we do not want to rely
on APIs from a potentially compromised system.

However, artemis does use the FreeBSD API for a handful of artifacts:

- Processes - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  used to pull a process listing using FreeBSD APIs
- Systeminfo - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  also to get system information using FreeBSD APIs

