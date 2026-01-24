---
description: Background Activities Manager
keywords:
  - windows
  - registry
---

# BAM

Artemis supports extracting Background Activities Manager (BAM) entries from the Windows Registry. BAM entries can record evidence of program execution.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
BAM entries.

## Sample API Script

```typescript
import { backgroundActivitiesManager } from "../artemis-api/src/windows/registry/bam";

function main() {
    const data = backgroundActivitiesManager();
    console.log(JSON.stringify(data));
}

main();
```

## Output Structure

An array of `Bam`

```typescript
export interface Bam{
    key_path: string;
    reg_path: string;
    sid: string;
    path: string;
    last_execution: string;
    message: string;
    datetime: string;
    timestamp_desc: "Last Execution";
    artifact: "Windows Background Activity Monitor";
    data_type: "windows:registry:bam:entry";
}
```
