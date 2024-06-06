---
description: Windows Logon events
keywords:
  - windows
  - eventlogs
---

# Logons

Artemis supports extracting Logon entries from the Windows EventLog
Security.evtx file. Artemis will try to correlate logon and logoff entries.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Logon entries.

# Sample API Script

```typescript
import {
  logons,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

async function main() {
  const path = "path to Security.evtx";
  const results = logons(path);

  console.log(results);
}
```

# Output Structure

An array of `Logons`

```typescript
export interface Logons {
  logon_type: LogonType;
  sid: string;
  account_name: string;
  account_domain: string;
  logon_id: string;
  logon_process: string;
  authentication_package: string;
  source_ip: string;
  source_workstation: string;
  logon_time: string;
  logoff_time: string;
  duration: number;
}

export enum LogonType {
  Network = "Network",
  Interactive = "Interactive",
  Batch = "Batch",
  Service = "Service",
  Unlock = "Unlock",
  NetworkCleartext = "NetworkCleartext",
  NewCredentials = "NewCredentials",
  RemoteInteractive = "RemoteInteractive",
  CacheInteractive = "CacheInteractive",
  Unknown = "Unknown",
}
```
