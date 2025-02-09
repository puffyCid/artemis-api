---
description: Windows Explorer Search terms
keywords:
  - windows
  - registry
---

# WordWheel

Artemis supports extracting WordWheel entries from the NTUSER.DAT Registry file.
When a user executes a search via Windows Explorer, the search term may get
saved to the Windows Registry.

(However, starting with Windows 11 23H2 WordWheel has been removed).

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
WordWheel keys.

# Sample API Script

```typescript
import {
    parseWordWheel,
} from "./artemis-api/src/windows/registry/wordwheel.ts";

async function main() {
    const path = "glob to NTUSER.DAT files";
    const results = parseWordWheel(path);

    console.log(results);
}
```

# Output Structure

An array of `WordWheelEntry`

```typescript
export interface WordWheelEntry {
    /**Searched term entered in Windows Explorer*/
    search_term: string;
    /**Last modified tiemstamp for Registry key */
    last_modified: string;
    /**Registry file path */
    source_path: string;
    /**Registry key path*/
    reg_path: string;
}
```
