---
description: macOS system extensions
keywords:
  - macOS
  - plist
  - persistence
---

# System Extensions

macOS system extensions are applications that are granted privileged access to
the macOS system. They are often associated with networking tools or security
software. System extensions can also be used for persistence.

By default artemis will try to extract installed extensions at
/Library/SystemExtensions/db.plist. However, you may also provide an optional
alternative path to db.plist.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to get
installed System extensions.

# Sample API Script

```typescript
import {
  systemExtensions,
} from "./artemis-api/mod.ts";

async function main() {
  const results = systemExtensions();

  console.log(results);
}
```

# Output Structure

An array of `SystemExtension`

```typescript
export interface SystemExtension {
  path: string;
  uuid: string;
  state: string;
  id: string;
  version: string;
  categories: string[];
  bundle_path: string;
  team: string;
}
```
