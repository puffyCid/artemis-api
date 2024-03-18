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

By default artemis will try to parse the database files at:

- System32\\LogFiles\\Sum

However, you may provide an optional alternative path to the UAL databases.

This database is **not** related to to the M365 UAL (Unified Audit Logging).

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect MRU
keys.

# Sample API Script

```typescript
import {
  userAccessLog,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

async function main() {
  const results = userAccessLog();

  console.log(results);
}
```

# Output Structure

An array of `UserAccessLog`

```typescript
export interface UserAccessLog {
  total_accesses: number;
  last_logon: number;
  first_logon: number;
  ip: string;
  username: string;
  domain: string;
  domain_username: string;
  role_guid: string;
  role_name: string;
}
```
