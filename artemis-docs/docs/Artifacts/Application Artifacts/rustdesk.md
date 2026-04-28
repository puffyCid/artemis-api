---
description: RustDesk Remote Access Tool 
keywords:
  - remote access tool
  - remote monitoring and management 
---

# RustDesk

RustDesk is a popular remote access tool to connect to remote systems.
Artemis supports parsing log files related to RustDesk.  

Other parsers:

- Any program that can read a text file

# References

- [RATs Review](https://www.synacktiv.com/publications/legitimate-rats-a-comprehensive-forensic-analysis-of-the-usual-suspects#anydesk)

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect AnyDesk data

```typescript
import { PlatformType, RustDesk } from "../../../mod";

function main() {
    const results = new RustDesk(PlatformType.Linux);
    const hits = results.logs();

    console.log(JSON.stringify(hits));
}

main();
```

## Output Structure

Array of RustDeskLogs

```typescript
export interface RustDeskLogs {
    evidence: string;
    message: string;
    datetime: string;
    level: string;
    code_path: string;
    local_time: string;
    remote_id: string;
    timestamp_desc: "Log Event";
    artifact: "RustDesk Log";
    data_type: "applications:rustdesk:log:entry";
}
```
