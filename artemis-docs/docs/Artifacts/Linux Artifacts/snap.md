---
description: Canonical Snap packages
keywords:
  - linux
  - plaintext
---

# Snap Packages

Snap packages is a package format developed by Canonical that allows developers
to distribute universal Linux packages that will run on a variety of Linux
distributions. Snap is enabled by default on Ubuntu and can be installed on
other Linux distributions. Artemis supports listing installed Snap packages

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
installed Snap packages.

```typescript
import { listSnaps } from "./artemis-api/src/linux/snap";

function main() {
    const results = listSnaps();
    console.log(results);
}

main();
```

## Output Structure

An array of Object containing `SnapState` entries.

```typescript
export interface SnapState {
    type: string;
    /**Array of Snap revisions */
    sequence: Snap[];
    active: boolean;
    /**Current Active revision */
    current: string;
    channel: string;
    /**Last refresh timestamp in UTC */
    "last-refresh-time": string;
    [key: string]: unknown;
}

export interface Snap {
    /**Name of snap */
    name: string;
    /**Application version */
    version: string;
    /**Snap revision */
    revision: number;
    summary?: string;
    description?: string;
    "snap-id": string;
    chanel?: string;
    title?: string;
    [key: string]: unknown;
}
```
