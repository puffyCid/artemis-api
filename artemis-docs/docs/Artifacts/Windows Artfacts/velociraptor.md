---
description: Velociraptor execution events
keywords:
  - windows
  - eventlogs
---

# Velociraptor Execution

Artemis supports extracting [Velociraptor](https://docs.velociraptor.app/) execution events from the Windows EventLog
Application.evtx file. 

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
MSI installed entries.

## Sample API Script

```typescript
import { veloCommands } from "./artemis-api/mod";

function main() {
    const results = veloCommands();
    console.log(JSON.stringify(results));

}

main();
```

## Output Structure

An array of `VeloExecution` objects

```typescript
export interface VeloExecution {
    evidence: string;
    pid: number;
    message: string;
    datetime: string;
    provider: string;
    event_id: number;
    thread_id: number;
    event: string;
    path: string;
    arguments: string[];
    timestamp_desc: "Velociraptor Executed";
    artifact: "Velociraptor EventLog";
    data_type: "windows:eventlogs:velociraptor:entry";
}
```
