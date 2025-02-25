---
description: Open source text editor
keywords:
  - text editor
  - microsoft
---

# VSCode

VSCode is a popular open source text editor created by Microsoft. Artemis
supports parsing installed extensions and getting file history from the
application. Artemis also supports parsing the VSCodium application.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
VSCode information.

# Sample API Script

```typescript
import {
  fileHistory,
  getExtensions,
  PlatformType,
} from "./artemis-api/mod.ts";

function main() {
  const results = fileHistory(PlatformType.Darwin);
  const data = getExtensions(PlatformType.Darwin);

  console.log(results);
}
```

# Output Structure

An array of `FileHistory` for file history and `Extensions` for installed
extensions.

```typescript
/**History of files in VSCode */
export interface FileHistory {
  /**Version of History format */
  version: number;
  /**To source file */
  path: string;
  /**History of source file */
  entries: Entries[];
  /**Path to history source */
  history_path: string;
}

/**
 * Metadata related to file history entry
 */
interface Entries {
  /**Name of history file */
  id: string;
  /**Time when file was saved */
  timestamp: string;
  /**Based64 encoded file content */
  content: string;
}

export interface Extensions {
  path: string;
  data: Record<string, unknown>[];
}
```
