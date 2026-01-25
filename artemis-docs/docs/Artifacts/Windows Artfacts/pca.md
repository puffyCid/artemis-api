---
description: Program Compatability Assistant
keywords:
  - windows
---

# PCA

Windows Program Compatability Assistant (PCA) tracks recent applications that are executed.

References:
- [DFIR blog](https://aboutdfir.com/new-windows-11-pro-22h2-evidence-of-execution-artifact/)

## Collection
You have to use the artemis [api](../../API/overview.md) in order to collect PCA entries.

## Sample API Script

```typescript
import { parsePca } from "./artemis-api/mod";

function main() {
    const results = parsePca();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `ProgramCompatabilityAssist`

```typescript
export interface ProgramCompatabilityAssist {
    last_run: string;
    path: string;
    run_status: number;
    file_description: string;
    vendor: string;
    version: string;
    program_id: string;
    exit_message: string;
    pca_type: PcaType;
    message: string;
    datetime: string;
    source: string;
    timestamp_desc: "Last Run";
    artifact: "Windows Program Compatability Assist";
    data_type: "windows:pca:entry";
}

export enum PcaType {
    AppLaunch = "AppLaunch",
    General = "General",
}
```