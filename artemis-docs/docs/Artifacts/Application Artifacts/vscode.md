---
description: Open source text editor
keywords:
  - text editor
  - microsoft
---

# VSCode

VSCode is a popular open source text editor created by Microsoft. Artemis
supports parsing several components from VSCode:
- File History
- Installed extensions
- Recently opened files and folders

Artemis also supports parsing the [VSCodium](https://vscodium.com/) application.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
VSCode information.

## Sample API Script

```typescript
import {
  fileHistory,
  getExtensions,
  PlatformType,
} from "./artemis-api/mod";

function main() {
  const results = fileHistory(PlatformType.Darwin);
  const data = getExtensions(PlatformType.Darwin);

  console.log(results);
}
```

## Output Structure

An array of `FileHistory` for file history, `Extensions` for installed
extensions, `RecentFiles` for recent files and folders

```typescript
/**History of files in VSCode */
export interface FileHistory {
  /**Version of History format */
  version: number;
  /**To source file */
  path?: string;
  /**Path to source file */
  resource: string;
  /**Path to history source */
  history_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "File Saved";
  artifact: "File History";
  data_type: "applications:vscode:filehistory:entry";
  /**Name of history file */
  id: string;
  /**Time when file was saved */
  file_saved: number | string;
  /**Based64 encoded file content */
  content?: string;
  source?: string;
  sourceDescription?: string;
  [ key: string ]: unknown;
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

export interface RecentFiles {
  path_type: RecentType;
  path: string;
  enabled: boolean;
  label: string;
  external: string;
  storage_path: string;
}

export enum RecentType {
  File = "File",
  Folder = "Folder"
}
```
