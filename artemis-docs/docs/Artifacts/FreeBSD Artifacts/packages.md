---
description: Installed Pkgs
keywords:
  - freebsd
  - sqlite
---

# Packages

Pkg are the default package format for installing software on FreeBSD systems. Artemis supports
querying the /var/db/pkg/local.sqlite database to get installed packages.


## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
installed packages.

## Sample API Script

```typescript
import { getPkgs } from "./artemis-api/mod";

function main() {
    let offset = 0;
    let limit = 100;
    
    const results = getPkgs(offset, limit);

    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `Pkg` entries.

```typescript
export interface Pkg {
    id: number;
    origin: string;
    name: string;
    version: string;
    comment: string;
    desc: string;
    mtree_id: number | null;
    pkg_message: string | null;
    arch: string;
    maintainer: string;
    www: string | null;
    prefix: string;
    flatsize: number;
    automatic: boolean;
    locked: boolean;
    licenselogic: boolean;
    installed: string | null;
    pkg_format_version: number | null;
    dep_formula: string | null;
    vital: boolean;
    manifest_digest: string | null;
    message: string;
    datetime: string;
    timestamp_desc: "Package Installed";
    artifact: "FreeBSD PKG";
    data_type: "freebsd:pkg:entry";
}
```
