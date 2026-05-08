---
description: Windows Application Crash events
keywords:
  - windows
  - eventlogs
---

# Crash Event

Artemis supports extracting application crash events from the Windows EventLog
Microsoft-Windows-WER-Diag%4Operational.evtx file. 

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
application crashes from EventLog.

## Sample API Script

```typescript
import { crashEvents } from "./artemis-api/mod";

function main() {
    const results = crashEvents();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `CrashEvent`

```typescript
export interface CrashEvent {
    evidence: string;
    pid: number;
    path: string;
    application_start: string;
    crash_time: string;
    crash_time_from_start: number;
    hostname: string;
    provider: string;
    guid: string;
    channel: string;
    sid: string;
    trigger: string;
    message: string;
    datetime: string;
    timestamp_desc: "Application Crash";
    artifact: "Crash EventLog";
    data_type: "windows:eventlogs:crash:entry";
}
```
