---
description: Windows Scriptblock events
keywords:
  - windows
  - eventlogs
---

# Scriptblocks

Artemis supports extracting and reassembling PowerShell Scriptblock entries from the Windows PowerShell EventLog. Whenever a large PowerShell script or command is executed, Windows will split the contents of the PowerShell script into multiple EventLog entries.

Artemis can read each of these log entries and reconstruct the original script.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to reassemble PowerShell Scriptblocks.

## Sample API Script

```typescript
import { assembleScriptblocks } from "./artemis-api/mod";

function main() {
    // Can provide optional alt path to Microsoft-Windows-PowerShell%4Operational.evtx
    const data = assembleScriptblocks();
    console.log(JSON.stringify(data));
}

main();
```

## Output Structure

An array of `Scriptblock`

```typescript
/**
 * Object representing a sync log entry.  
 * This object is Timesketch compatible.  It does **not** need to be timelined
 */
export interface Scriptblock {
    total_parts: number;
    message: string;
    datetime: string;
    timestamp_desc: string;
    data_type: string;
    artifact: string;
    id: string;
    source_file: string;
    path: string;
    script_length: number;
    has_signature_block: boolean;
    has_copyright_string: boolean;
    hostname: string;
    version: number;
    activity_id: string;
    channel: string;
    user_id: string;
    process_id: number;
    threat_id: number;
    system_time: string;
    created_time: string;
}
```
