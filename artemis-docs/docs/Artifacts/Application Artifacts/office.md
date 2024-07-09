---
description: Microsoft Office suite
keywords:
  - office software
  - plist
  - registry
---

# Microsoft Office

Microsoft Office software (Word, PowerPoint, Excel, etc) track recently open
files. Artemis supports parsing Office configurations associated with
tracking recently opened files.

- macOS:
  /Users/\*/Library/Containers/com.microsoft\*/Data/Library/Preferences/com.microsoft.\*.securebookmarks.plist
- Windows: \\Users\\\*\\NTUSER.DAT

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Microsoft Office information.

```typescript
import { PlatformType } from "./artemis-api/mod.ts";
import { officeMruFiles } from "./artemis-api/src/applications/office.ts";

function main() {
  const results = officeMruFiles(PlatformType.Darwin);
  console.log(results);
}
```

# Output Structure

On macOS an array of `OfficeRecentFilesMacos` entries. See
[bookmarks](../macOS%20Artifacts/bookmarks.md) for the format.

On Windows an array of `OfficeRecentFilesWindows`.

```typescript
export interface OfficeRecentFilesWindows {
  path: string;
  last_opened: string;
  application: string;
  registry_file: string;
  key_path: string;
}
```
