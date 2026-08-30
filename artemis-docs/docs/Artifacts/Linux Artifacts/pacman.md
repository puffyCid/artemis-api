---
description: Arch Linux packages
keywords:
  - linux
  - plaintext
---

# Pacman Packages

Pacman packages are the default package format for installing software on Arch Linux.  
Artemis supports parsing the /var/lib/pacman/local/*/desc file to get installed Pacman packages.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
installed Pacman packages.

## Sample API Script

```typescript
import { getPacmanInfo } from "../Projects/artemis-api/mod";

function main() {
    const data = getPacmanInfo();
    console.log(JSON.stringify(data));
}

main();
```

## Output Structure

An array of `PacmanPackages` entries.

```typescript
export interface PacmanPackages {
    name: string;
    version: string;
    url: string;
    build_date: string;
    installed: string;
    author: string;
    size: number;
    description: string;
    licenses: string | string[];
    reason: Reason;
    message: string;
    datetime: string;
    timestamp_desc: "Pacman Package Installed";
    artifact: "Pacman Package";
    data_type: "linux:pacman:entry";
    evidence: string
}

export enum Reason {
    Dependency = "Dependency",
    Explict = "Explict",
}
```


:::info

I use ~~Arch~~ Fedora by the way

:::