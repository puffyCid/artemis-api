---
description: Windows Logon events
keywords:
  - windows
  - eventlogs
---

# Logons

Artemis supports extracting Service Install events from the Windows EventLog
System.evtx file.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
Service Install entries.

# Sample API Script

```typescript
import { serviceInstalls } from "./artemis-api/src/windows/eventlogs/services.ts";

function main() {
    const data = serviceInstalls(
        "C:\\Windows\\System32\\winevt\\Logs\\System.evtx",
    );
    console.log(data);
}

main();
```

# Output Structure

An array of `ServiceInstalls`

```typescript
export interface ServiceInstalls {
    name: string;
    image_path: string;
    service_type: string;
    start_type: string;
    account: string;
    hostname: string;
    timestamp: string;
    process_id: number;
    thread_id: number;
    sid: string;
}
```
