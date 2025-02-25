---
description: Chocolatey packages
keywords:
  - windows
  - plaintext
---

# Chocolatey

Chocolatey is an open source package manager for Windows. Artemis supports
getting a list of installed Chocolatey packages on the system.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to get
installed Chocolatey packages.

# Sample API Script

```typescript
import {
  getChocolateyInfo,
} from "./artemis-api/mod.ts";

function main() {
  const results = getChocolateyInfo();

  console.log(results);
}
```

# Output Structure

An array of `ChocolateyInfo`

```typescript
export interface ChocolateyInfo {
  name: string;
  version: string;
  summary: string;
  author: string;
  license: string;
  tags: string[];
  path: string;
}
```
