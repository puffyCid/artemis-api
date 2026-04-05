---
description: vSphere Installation Bundles
keywords:
  - esxi
  - plaintext
---

# VIB Packages

ESXi vSphere Installation Bundles (VIB) are packages used to install applications on ESXi devices. Artemis supports parsing installed VIB packages on ESXi systems.

Other parsers:

- Any program that read a text file

References:

- [Whats a vib](https://blogs.vmware.com/cloud-foundation/2011/09/13/whats-in-a-vib/)

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse ESXi VIB files.

```typescript
import { getVibs } from "./artemis-api/mod";

function main() {
    const results = getVibs();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `VibInfo`.

```typescript
export interface VibInfo {
    message: string;
    datetime: string;
    timestamp_desc: "VIB Package Installed" | "VIB Package Released";
    artifact: "ESXi VIB Package";
    data_type: "esxi:vib:entry";
    vib_version: number;
    install_date: string;
    name: string;
    version: string;
    vendor: string;
    summary: string;
    description: string;
    /**Can be spoofed easily. No guarantee to be UTC*/
    release_date: string;
    level: string;
    vib_type: string;
    payloads: VibPayload[];
    urls: string[];
    evidence: string;
    installed: boolean;
    timezone: string;
}
```
