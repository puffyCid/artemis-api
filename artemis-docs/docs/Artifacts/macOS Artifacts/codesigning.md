---
description: Codesigning info
keywords:
  - macos
  - binary
---

# Codesigning

Artemis can extract some parts of macOS `Codesigning` metadata. Currently it
only supports parsing the Requirements blob from Codesigning metadata.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
Codesigning data.

# Sample API Script

```typescript
import { parseRequirementBlob } from "./artemis-api/mod";

function main() {
  // Need to obtain alias bytes from another file. Plist files may have Codesigning data.
  // Ex: The macOS Firewall artifact contains codesigning data
  const results = parseRequirementBlob(new Uint8Array());
  // The macOS command: csreq -v -r- -t < bytes.raw
  // can be used to compare results
  console.log(results);
}
```

# Output Structure

A `SingleRequirement` object structure

```typescript
export interface SingleRequirement {
  identifier: string;
  team_id: string;
  cdhash: string;
}
```
