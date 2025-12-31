---
description: KDE Text editor
keywords:
  - linux
  - kde
---

# Kate

Kate is a popular text editor for the KDE Desktop environment. Artemis
supports parsing recently opened files by Kate.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
recent opened files by Kate.

```typescript
import { kateRecentFiles } from "./artemis-api/src/mod";

function main() {
  const results = kateRecentFiles();
  console.log(results);
}

main();
```

## Output Structure

An array of `RecentFiles` entries.

```typescript
export interface RecentFiles {
    /**Path Kate session file */
    session_file: string;
    /**Path to recent file */
    file: string;
    /**Session file created */
    session_file_created: string;
    /**Session file modified */
    session_file_modified: string;
    /**Session file accessed */
    session_file_accessed: string;
    /**Session file changed */
    session_file_changed: string;
}
```
