---
description: Windows RDP Logon events
keywords:
  - windows
  - eventlogs
---

# RDP

Artemis supports extracting RDP Logon entries from the Windows EventLog
Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx file. Artemis will try to correlate logon and logoff entries.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Logon entries.

## Sample API Script

```typescript
import {  rdpLogons } from "./artemis-api/mod";

function main() {
  const values = rdpLogons();
  console.log(JSON.stringify(values));
}

main();
```

## Output Structure

An array of `RdpActivity`

```typescript
export interface RdpActivity {
    session_id: number;
    user: string;
    domain: string;
    account: string;
    source_ip: string;
    logon_time: string;
    logoff_time: string;
    hostname: string;
    activity_id: string;
    /** RDP Session duration in seconds */
    duration: number;
    message: string;
    datetime: string;
    timestamp_desc: "RDP Logon" | "RDP Reconnect";
    artifact: "RDP EventLogs";
    reconnections: number;
    disconnections: number;
    session_arbitration_started: string;
    session_arbitration_ended: string;
    data_type: "windows:eventlogs:rdp:entry";
}
```
