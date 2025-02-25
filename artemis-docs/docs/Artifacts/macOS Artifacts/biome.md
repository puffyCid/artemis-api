---
description: macOS BIOME data
keywords:
  - macos
  - protobuf
  - binary
---

# Biome

macOS BIOME data contains data related to application runtime. It partially
replaces the KnowledgeC.db.\
Its kind of similar to Windows SRUM

Biome files are stored in binary format that contains
[Protobuf](https://protobuf.dev/) data. It is very difficult (nearly impossible)
to parse Protobuf data perfectly without the associated Proto file.

Artemis has been heavily tested to parse App.InFocus Biome data which contains
information related to application runtime. By default artemis will **only**
parse App.InFocus Biome files.\
However, you may enable parsing of all Biome files.

As mentioned in the output structure below, currently artemis does not do any
post-processing of the data.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`BIOME` data.

# Sample API Script

```typescript
import { parseBiome } from "./artemis-api/mod.ts";

function main() {
  const results = parseBiome();
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
