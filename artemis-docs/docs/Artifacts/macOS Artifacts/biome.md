---
description: macOS BIOME data
keywords:
  - macos
  - protobuf
  - binary
---

# Bill of Materials

macOS BIOME data contains data related to application runtime. It partially
replaces the KnowledgeC.db.\
Its kind of similar to Windows SRUM

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`BIOME` data.

# Sample API Script

```typescript
import { parseBiome } from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const results = parseBom();
  console.log(results);
}
```

# Output Structure

A `Biome` object structure

```typescript
export interface Biome {
  path: string;
  /**
   * BIOME files contain Protobuf data. Each type of BIOME needs to be extracted.
   * Further research could be done to extract raw data into specific interfaces
   * If parsing fails, we base64 encode the protobuf data and include that
   */
  raw: Record<string, unknown>[];
}
```
