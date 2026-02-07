---
description: AnyDesk Remote Access Tool 
keywords:
  - remote access tool
  - remote monitoring and management 
---

# AnyDesk

AnyDesk is a popular remote access tool to connect to remote systems.
Artemis supports parsing several files related to AnyDesk.

- Trace log files
- User config
- System config

Other parsers:

- Any program that can read a text file

# References

- [RATs Review](https://www.synacktiv.com/publications/legitimate-rats-a-comprehensive-forensic-analysis-of-the-usual-suspects#anydesk)
- [Suspicious AnyDesk Use](https://www.cybertriage.com/blog/dfir-next-steps-suspicious-anydesk-use/)

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect AnyDesk data

```typescript
import { AnyDesk, PlatformType } from "../artemis-api/mod";

function main() {
    console.log('Running AnyDesk tests....');
    const results = new AnyDesk(PlatformType.Linux, "./test_data/anydesk");
    const used_alt_dir = true;
    const hits = results.traceFiles(used_alt_dir);
    if (hits.length !== 2872) {
        throw `Got ${hits.length} rows. Expected 2872`;
    }
    
    console.log('All AnyDesk tests passed! 🥳💃🕺');
}

main();
```

## Output Structure

Dependent on browser artifact user wants to parse.

```typescript
/**
 * Object representing a Trace log entry.  
 * This object is Timesketch compatible.  It does **not** need to be timelined
 */
export interface TraceEntry {
    message: string;
    datetime: string;
    timestamp_desc: "Trace Entry";
    artifact: "AnyDesk Trace Log";
    data_type: "applications:anydesk:trace:entry";
    path: string;
    level: string;
    entry_timestamp: string;
    component: string;
    code_function: string;
    pid: number;
    ppid: number;
    subfunction: string;
    log_message: string;
    account: string;
    version: string;
    id: string;
}
```
