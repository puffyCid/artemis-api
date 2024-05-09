---
sidebar_position: 4
---

# macOS

Currently artemis has been tested on macOS Catalina and higher.

A main focus point of artemis is to make a best effort to not rely on the
Windows APIs. Since artemis is a forensic focused tool, we do not want to rely
on APIs from a potentially compromised system.

However, artemis does use the macOS API for a handful of artifacts:

- Processes - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  used to pull a process listing using macOS APIs
- Systeminfo - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  also to get system information using macOS APIs
