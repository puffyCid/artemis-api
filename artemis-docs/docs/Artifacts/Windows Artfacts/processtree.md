---
description: Windows process trees
keywords:
  - windows
  - eventlogs
---

# Process Tree

Artemis supports creating a process tree from the Windows Security.evtx EventLog. Specifically from the 4688 entries.
Artemis can read each of these log entries and attempt to create a process tree from the data

## Collection

You have to use the artemis [api](../../API/overview.md) in order to reconstruct process trees.

## Sample API Script

```typescript
import { processTreeEventLogs } from "./artemis-api/mod";

function main() {
    const results = processTreeEventLogs();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `EventLogProcessTree`

```typescript
/**
 * Object representing a reassembled process tree from 4688 Security EventLog
 * This object is Timesketch compatible.  It does **not** need to be timeline
 */
export interface EventLogProcessTree {
    pid: number;
    parent_pid: number;
    process_name: string;
    process_path: string;
    parent_name: string;
    parent_path: string;
    user: string;
    sid: string;
    domain: string;
    commandline: string;
    /**Complete process tree for a process */
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: string;
    evtx_path: string;
    data_type: string;
    record: number;
    logon_id: number;
}
```
