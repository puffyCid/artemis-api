---
description: Windows BITS Job events
keywords:
  - windows
  - eventlogs
---

# BITS Job Event

Artemis supports extracting BITS Job events from the Windows EventLog
Microsoft-Windows-Bits-Client%4Operational.evtx file. 

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
BITS Job EventLog entries.

## Sample API Script

```typescript
import { bitsEvents } from "./artemis-api/mod";

function main() {
    const results = bitsEvents();
    console.log(JSON.stringify(results));

}

main();
```

## Output Structure

An array of `BitsEvent`

```typescript
export interface BitsEvent {
    status: BitsState;
    evidence: string;
    job_id: string;
    process: string;
    pid: number;
    user: string;
    title: string;
    message: string;
    datetime: string;
    file_count: number;
    provider: string;
    event_id: number;
    bits_event_time: string;
    activity_id: string;
    thread_id: number;
    bytes_transferred: number;
    timestamp_desc: "BITS Job Created" | "BITS Job Completed";
    artifact: "BITS EventLog";
    data_type: "windows:eventlogs:bits:entry";
}

export enum BitsState {
    Completed = "Complete",
    Created = "Created",
}
```
