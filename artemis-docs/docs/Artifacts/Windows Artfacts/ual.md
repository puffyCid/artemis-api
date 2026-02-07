---
description: Windows User Access Log
keywords:
  - windows
  - ese
---

# User Access Log

The Windows User Access Log (UAL) is an ESE database containing logon activity
to a system. This database only exists on Windows Servers. Artemis supports
parsing both unlocked and locked UAL databases.

This database is **not** related to to the M365 UAL (Unified Audit Logging).

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect UAL keys.

## Sample API Script

```typescript
import { FileError } from "./artemis-api/src/filesystem/errors";
import { glob } from "./artemis-api/src/filesystem/files";
import { WindowsError } from "./artemis-api/src/windows/errors";
import { UserAccessLogging } from "./artemis-api/src/windows/ese/ual";

function main() {
  const glob_path = "C:\\System32\\LogFiles\\Sum\\*.mdb";
  const paths = glob(glob_path);
  if (paths instanceof FileError) {
    return;
  }

  let role = undefined;
  for (const path of paths) {
    if (path.filename !== "SystemIdentity.mdb") {
      continue;
    }

    const ual = new UserAccessLogging(path.full_path);
    role = ual;
  }

  if (role === undefined) {
    return;
  }

  console.log(role.pages);

  for (const path of paths) {
    if (path.filename === "SystemIdentity.mdb") {
      continue;
    }
    console.log(`Parsing: ${path.full_path}`);

    const clients = new UserAccessLogging(path.full_path);

    const data = clients.getUserAccessLog(clients.pages, role);
    if (data instanceof WindowsError) {
      console.error(data);
      continue;
    }
    console.log(data.length);
  }
}

main();
```

## Output Structure

An array of `UserAccessLog`

```typescript
export interface UserAccessLog {
  total_accesses: number;
  last_logon: string;
  first_logon: string;
  ip: string;
  username: string;
  domain: string;
  domain_username: string;
  role_guid: string;
  role_name: string;
}
```
