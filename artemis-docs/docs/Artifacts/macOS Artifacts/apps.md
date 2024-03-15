---
description: Applications on macOS
keywords:
  - macOS
  - file metadata
---

# Applications

Users often install applications on macOS devices. Artemis has the ability to
parse Application metadata at common paths. In addition, it can scan the entire
filesystem (asynchronously) looking for installed applications.

By default artemis will look for apps at:

- /usr/local/Cellar
- /opt/homebrew/Cellar
- /Applications
- /System/Applications

# Collection

You have to use the artemis [api](../../API/overview.md) in order to installed
applications.

# Sample API Script

```typescript
import {
  listApps,
  scanApps,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

async function main() {
  // Gets simple application listing at known macOS paths.
  const results = listApps();
  // Scans the entire filesystem looking for installed apps
  const data = await scanApps();
}
```

# Output Structure

Array of `Applications`

```typescript
export interface Applications {
  filename: string;
  full_path: string;
  bundle_executable: string;
  bundle_id: string;
  bundle_name: string;
  bundle_short_version: string;
  bundle_version: string;
  display_name: string;
  copyright: string;
  /**Base64 encoded PNG file*/
  icon: string;
  info: string;
}
```
