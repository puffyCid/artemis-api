---
description: User accounts file
keywords:
  - esxi
  - plaintext
---

# Accounts

ESXi tracks user account info in the file `/etc/passwd`. Artemis supports extracting account info from the passwd file.

Other parsers:

- Any program that can read a text file

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse ESXi user accounts.

```typescript
import { esxiAccounts } from "./artemis-api/mod";

function main() {
    const results = esxiAccounts();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `Accounts`.

```typescript
export interface Accounts {
    message: string;
    datetime: string;
    timestamp_desc: "Passwd File Modified";
    artifact: "ESXi User Account";
    data_type: "esxi:users:entry";
    evidence: string;
    uid: number;
    gid: number;
    info: string;
    shell: string;
    home: string;
}
```
