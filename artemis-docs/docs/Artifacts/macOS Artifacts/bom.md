---
description: macOS bill of materials (BOM)
keywords:
  - macos
  - file metadata
  - binary
---

# Bill of Materials

macOS Bill of Materials (`BOM`) files are created when a user installs an
application using the builtin package installer on macOS. BOM files contain
metadata associated with the install application.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse `BOM`
data.

# Sample API Script

```typescript
import { parseBom } from "./artemis-api/mod.ts";

function main() {
  const path = "path to bom file";
  const results = parseBom(path);
  console.log(results);
}
```

# Output Structure

A `BOM` object structure

```typescript
export interface Bom {
  package_name: string;
  install_data: string;
  package_id: string;
  package_version: string;
  install_process_name: string;
  install_prefix_path: string;
  path: string;
  /**Path to BOM file */
  bom_path: string;
  files: BomFiles[];
}

/**
 * Bill of Materials (BOM) data
 */
export interface BomFiles {
  /**User ID. Often blank */
  uid: number;
  /**Group ID. Often blank */
  gid: number;
  /**File permissions as decimal value */
  mode: number;
  /**File size */
  size: number;
  /**Path to file */
  path: string;
  /**Modified timestamp of file */
  modified: string;
  /**CRC-32 checksum for file */
  checksum: string;
}
```
