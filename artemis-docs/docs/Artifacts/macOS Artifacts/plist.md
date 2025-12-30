---
description: macOS configuration files
keywords:
  - macOS
  - binary
  - plaintext
---

# Plist

macOS property lists (`plist`) are the primary format for application
configurations. The contents of `plists` can be: xml, json, or binary. XML is
most common.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse plist files.

```typescript
import { getPlist } from "./artemis-api/mod";

function main() {
  const results = getPlist("test.plist");
  console.log(JSON.stringify(results));
}
```
# Configuration Optaions

N/A

# Output Structure

A JSON representation of the `plist` contents or raw plist bytes.

```typescript
Record<String, unknown> | Record < string, unknown > [] | Uint8Array;
```
