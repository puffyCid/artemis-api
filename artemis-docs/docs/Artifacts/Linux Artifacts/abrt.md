---
description: Abrt crashes
keywords:
  - linux
  - plaintext
---

# Abrt

[Abrt](https://abrt.readthedocs.io/en/latest/index.html) is a popular crash detector on Linux systems. Sometimes when an application crashes it may generate an abrt data dump containing metadata about the crashed process

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect abrt crashes.

# Sample API Script

```typescript
import { extractAbrt } from "./artemis-api/mod";

async function main() {
    const results = await extractAbrt();
    console.log(JSON.stringify(results));

    return results;
}

main();
```

# Output Structure

An array of `Abrt` entries.

```typescript
export interface Abrt {
    executable: string;
    pid: number;
    cmdline: string;
    reason: string;
    hostname: string;
    last_occurrence: string;
    user: string;
    data_directory: string;
    backtrace: string | Record<string, unknown>;
    environment: string;
    home: string;
    message: string;
    datetime: string;
    timestamp_desc: "Abrt Last Occurrence";
    artifact: "Abrt";
    data_type: "linux:abrt:entry";
}
```
