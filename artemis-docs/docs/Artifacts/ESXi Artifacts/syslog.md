---
description: Syslog file
keywords:
  - esxi
  - plaintext
---

# Syslog Log

ESXi systems primarily log events to syslog files. Artemis supports extracting entries from syslog.log and gzip compressed syslog files.

Other parsers:

- Any program that can read a text file

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse ESXi Syslog files.

```typescript
import { syslogEsxi } from "./artemis-api/mod";

function main() {
    const results = syslogEsxi();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `Syslog`.

```typescript
export interface Syslog {
    message: string;
    datetime: string;
    timestamp_desc: "Syslog Entry Generated";
    artifact: "ESXi Syslog";
    data_type: "esxi:syslog:entry";
    pid: number;
    evidence: string;
    category: string;
    process: string;
}
```
