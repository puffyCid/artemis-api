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
/**
 * Parsed RDP events
 */
export interface RdpActivity {
    /**Session ID associated with RDP */
    session_id: number;
    /**User associated RDP logon */
    user: string;
    /**Domain associated with the user */
    domain: string;
    /**Account associated with the RDP logon */
    account: string;
    source_ip: string;
    /**Hostname associated with evtx file */
    hostname: string;
    /**Activity ID associated with EventLog entry */
    activity_id: string;
    message: string;
    datetime: string;
    timestamp_desc: "RDP Logon" | "RDP Reconnect" | "RDP Logoff" | "RDP Disconnect";
    artifact: "RDP EventLog";
    data_type: "windows:eventlogs:rdp:entry";
}
```
