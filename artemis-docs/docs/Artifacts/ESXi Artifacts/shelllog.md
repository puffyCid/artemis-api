---
description: Shell log file
keywords:
  - esxi
  - plaintext
---

# Shell Log

ESXi systems track shell commands executed when connected via SSH in the file shell.log. Artemis supports extracting entries from the shell.log file.

Other parsers:

- Any program that can read a text file

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse ESXi shell log files.

```typescript
import { shellLogHistory } from "./artemis-api/mod";

function main() {
    const results = shellLogHistory();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `ShellHistory`.

```typescript
export interface ShellHistory {
    message: string;
    datetime: string;
    timestamp_desc: "Shell Command Execution";
    artifact: "ESXi Shell History";
    data_type: "esxi:shell:entry";
    pid: number;
    account: string;
    command: string;
    evidence: string;
    category: string;
}
```
