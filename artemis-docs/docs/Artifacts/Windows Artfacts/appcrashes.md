---
description: Windows Application Crashes
keywords:
  - windows
---

# Application Crashes

Artemis supports extracting application crash events from the Windows Report.wer files. 

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
application crashes from Report.wer files.

## Sample API Script

```typescript
import { extractAppCrash } from "./artemis-api/mod";

function main() {
    const results = extractAppCrash();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `AppCrash`

```typescript
export interface AppCrash {
    timestamp_desc: "Application Crash";
    artifact: "AppCrash File";
    data_type: "windows:app:crash:entry";
    evidence: string;
    message: string;
    path: string;
    datetime: string;
    report_id: string;
    report_type: number;
    application_name: string;
}
```
