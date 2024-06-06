---
description: Most Recently Used entries
keywords:
  - windows
  - registry
---

# Most Recently Used

Artemis support extracting Most Recently Used (MRU) entries from multiple
Registry key paths in the NTUSER.DAT Registry file. MRU keys can provide
evidence if a was accessed on a system. Artemis currently supports the following
MRU keys:

- Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSavePidlMRU
- Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU
- Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect MRU
keys.

# Sample API Script

```typescript
import {
  parseMru,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

async function main() {
  const path = "path to NTUSER.DAT";
  const results = parseMru(path);

  console.log(results);
}
```

# Output Structure

An array of `Mru`

```typescript
export interface Mru {
  ntuser_path: string;
  kind: MruType;
  mru: MruValues[];
}

export interface MruValues {
  /**Filename of MRU entry*/
  filename: string;
  /**Path to MRU entry */
  path: string;
  /**Created time of MRU entry */
  created: string;
  /**Modified time of MRU entry */
  modified: string;
  /**Accessed time of MRU entry */
  accessed: string;
  /**All ShellItems that make up the MRU entry */
  items: ShellItems[];
}

export enum MruType {
  LASTVISITED = "LastVisisted",
  OPENSAVE = "OpenSave",
  RECENTDOCS = "RecentDocs",
}
```
