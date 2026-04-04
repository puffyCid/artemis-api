---
sidebar_position: 8
---

# ESXi

Artemis has basic support for parsing forensic artifacts on ESXi systems.

A main focus point of artemis is to make a best effort to not rely on the
ESXi APIs. Since artemis is a forensic focused tool, we do not want to rely
on APIs from a potentially compromised system.

Currently artemis is unable to extract volatile artifacts from memory such as:

- Processes 
- System info
- Network connections

