---
sidebar_position: 5
---

# Windows

Currently artemis has been tested on Windows 8.1 and higher. artemis supports
multiple complex binary artifacts on Windows such as:

- NTFS - artemis can parse the raw NTFS disk using the
  [ntfs](https://github.com/ColinFinck/ntfs) crate
- Registry - artemis can parse Registry files on disk
- ESE - artemis can parse ESE database files on disk
- Event Logs - artemis can parse Event Logs using the
  [evtx](https://github.com/omerbenamram/evtx) crate

A main focus point of artemis is to make a best effort to not rely on the
Windows APIs. Since artemis is a forensic focused tool, we do not want to rely
on APIs from a potentially compromised system.

However, artemis does use the Windows API for a handful of artifacts:

- Processes - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  used to pull a process listing using Windows APIs
- Systeminfo - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  also to get system information using Winodws APIs
- The Windows API is also used to decompress proprietary Windows compression
  algorithms.
  - Artemis will try the Windows API to decompress the data. However, if the
    decompression fails, it will also try to manually decompress the data
