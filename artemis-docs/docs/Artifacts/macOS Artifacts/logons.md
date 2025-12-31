---
description: macOS Logon events
keywords:
  - macos
  - unifiedlogs
---

# Logons

Artemis supports extracting Logon entries from the macOS Unified Log.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Logon entries.

## Sample API Script

```typescript
import { FileError } from "./artemis-api/src/filesystem/errors";
import { glob } from "./artemis-api/src/filesystem/files";
import { logonsMacos } from "./artemis-api/src/macos/unifiedlogs/logons";

function main() {
  const logs = glob("/var/db/diagnostics/Special/*");
  if (logs instanceof FileError) {
    return;
  }
  let values = [];

  for (const entry of logs) {
    const data = logonsMacos(entry.full_path);
    values = values.concat(data);
  }
  console.log(values);
}

main();
```

## Output Structure

An array of `LogonMacos`

```typescript
export interface LogonMacos {
  username: string;
  uid: number;
  gid: number;
  timestamp: string;
  message: string;
  pid: number;
  thread_id: number;
  system_timezone: string;
}
```
