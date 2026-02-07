---
description: Windows Registry Run Keys
  - windows
  - registry
---

# Registry Run Keys

Artemis supports extracting the Windows Registry Run key information from several different Registry files:
- NTUSER.DAT
- SOFTWARE

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect Windows Run Keys.

## Sample API Script

```typescript
import { getRunKeys } from "./artemis-api/mod";

function main() {
    const results = getRunKeys();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `RegistryRunKey`

```typescript
export interface RegistryRunKey {
    key_modified: string;
    key_path: string;
    registry_path: string;
    registry_file: string;
    path: string;
    /**When file was created */
    created: string;
    has_signature: boolean;
    md5: string;
    sha1: string;
    sha256: string;
    value: string;
    name: string;
    message: string;
    datetime: string;
    timestamp_desc: "Registry Last Modified";
    artifact: "Windows Registry Run Key";
    data_type: "windows:registry:run:entry";
}
```
