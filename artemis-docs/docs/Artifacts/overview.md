---
sidebar_position: 1
---

# Artifacts Overview

Artemis supports over 80 different types of artifacts! All of these artifacts
can be collected from a TOML collection or from simple JavaScript code.

In addition, custom artifacts can be created using JavaScript by using the
Artemis API. An example, of this is the macOS
[Firewall](https://github.com/puffyCid/artemis-api/blob/main/src/macos/plist/firewall.ts)
API.

See [API Overview](../API/overview.md) for more details.

A breakdown of artifacts by OS is below.

| OS                                | Number of Artifacts |
| --------------------------------- | ------------------- |
| [Windows](./windows.md)           | 37                  |
| [macOS](./macos.md)               | 40                  |
| [Linux](./linux.md)               | 18                  |
| [Applications](./applications.md) | 7                   |

Artemis also supports parsing apps and artifacts from unencrypted iTunes backups

| OS              | Number of Apps/Artifacts |
| --------------- | ------------------------ |
| [iOS](./ios.md) | 6                        |
