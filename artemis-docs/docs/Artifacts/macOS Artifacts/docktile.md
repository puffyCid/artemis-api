---
description: macOS persistence via Dock
keywords:
  - macOS
  - persistence
  - plist
---

# Dock Tiles

A Dock Tile is way to maintain persistence on a macOS system. They are
registered in Info.plist files for Applications. Artemis supports checking for
any Applications containing Dock Tile persistence.

References:

- [TheEvilBit](https://theevilbit.github.io/beyond/beyond_0032/)

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse Dock
Tile data.

```typescript
import { dockTiles } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

async function main() {
  const results = await dockTiles();
  console.log(results);
}
```

# Output Structure

Array of `Applications` with Dock Tile persistence

```typescript
export interface Applications {
  filename: string;
  full_path: string;
  bundle_executable: string;
  bundle_id: string;
  bundle_name: string;
  bundle_short_version: string;
  bundle_version: string;
  display_name: string;
  copyright: string;
  /**Base64 encoded PNG file*/
  icon: string;
  info: string;
}
```
