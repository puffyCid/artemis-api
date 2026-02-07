---
description: Windows Logon events
keywords:
  - windows
  - eventlogs
---

# Logons

Artemis supports extracting Logon entries from the Windows EventLog
Security.evtx file.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Logon entries.

## Sample API Script

```typescript
import {
  logons,
} from "./artemis-api/mod";

function main() {
  const path = "path to Security.evtx";
  const results = logons(path);

  console.log(results);
}

main();
```

## Output Structure

An array of `Logons`

```typescript
export interface LogonsWindows {
  logon_type: LogonType;
  sid: string;
  account_name: string;
  account_domain: string;
  logon_id: string;
  logon_process: string;
  authentication_package: string;
  source_ip: string;
  source_workstation: string;
  eventlog_generated: string;
  message: string;
  datetime: string;
  timestamp_desc: "Account Logon" | "Account Logoff";
  artifact: "Logon EventLog" | "Logoff EventLog";
  data_type: "windows:eventlogs:logon:entry" | "windows:eventlogs:logoff:entry";
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
