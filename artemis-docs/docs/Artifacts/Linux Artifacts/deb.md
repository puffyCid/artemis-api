---
description: Debian packages
keywords:
  - linux
  - plaintext
---

# Deb Packages

Deb packages are the default package format for installing software on Debian
and Debian derived systems (ex: Ubuntu, Linux Mint, etc). Artemis supports
parsing the /var/lib/dpkg/status file to get installed deb packages.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
installed deb packages.

# Sample API Script

```typescript
import {
  getDebInfo,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const results = getDebInfo();

  console.log(results);
}
```

# Output Structure

An array of `DebPackages` entries.

```typescript
export interface DebPackages {
  name: string;
  version: string;
  size: number;
  arch: string;
  status: string;
  maintainer: string;
  section: string;
  priority: string;
  homepage: string;
  dependencies: string[];
}
```
