---
sidebar_position: 3
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

A main focus point of the library `artemis-core` is to make a best effort to not
rely on the Windows APIs. Since `artemis-core` is a forensic focused library, we
do not want to rely on APIs from a potentially compromised system.

However, `artemis-core` does use the Windows API for a handful of artifacts:

- Processes - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  used to pull a process listing using Windows APIs
- Systeminfo - The [sysinfo](https://github.com/GuillaumeGomez/sysinfo) crate is
  also to get system information using Winodws APIs
- The Windows API is also used to decompress proprietary Windows compression
  algorithms.
  - Both Prefetch and some NTFS files may be compressed, `artemis-core` will
    attempt to use Windows API to decompress these files
