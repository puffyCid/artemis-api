---
sidebar_position: 2
---

# macOS

Currently artemis has been tested on macOS Catalina and higher. Similar to the
Windows version a main focus point of the library `artemis-core` is to make a
best effort to not rely on the macOS APIs.

Since `artemis-core` is a forensic focused library, we do not want to rely on
APIs from a potentially compromised system.

However, `artemis-core` does use the macOS API for a handful of artifacts:

- Processes - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  used to pull a process listing using macOS APIs
- Systeminfo - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  also to get system information using macOS APIs
