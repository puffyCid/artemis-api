---
description: Microsoft Office suite
keywords:
  - office software
  - plist
  - registry
---

# Microsoft Office

Microsoft Office software (Word, PowerPoint, Excel, etc) track recently open
files. Artemis supports parsing Office configuration files associated with
tracking recently opened files.

- macOS:
  /Users/\*/Library/Containers/com.microsoft\*/Data/Library/Preferences/com.microsoft.\*.securebookmarks.plist

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

An array of `OfficeRecentFilesMacos` entries. See
[bookmarks](../macOS%20Artifacts/bookmarks.md) for the format.
