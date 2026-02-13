---
description: Windows MSI installed events
keywords:
  - windows
  - eventlogs
---

# MSI Installed

Artemis supports extracting MSI installed events from the Windows EventLog
Application.evtx file. 

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Logon entries.

## Sample API Script

```typescript
import { msiInstalled } from "./artemis-api/mod";

function main() {
    const results = msiInstalled();
    console.log(JSON.stringify(results));

}

main();
```

## Output Structure

An array of `MsiInstalled`

```typescript
export interface MsiInstalled {
    name: string;
    language: number;
    version: string;
    mnufacturer: string;
    installation_status: number;
    hostname: string;
    sid: string;
    pid: number;
    thread_id: number;
    message: string;
    datetime: string;
    timestamp_desc: "MSI Installed";
    artifact: "EventLog MSI Installed 1033";
    data_type: "windows:eventlog:application:msi";
    evidence: string;
}
```
