---
description: Authorizations database
keywords:
  - macOS
  - sqlite
---

# Authorizations

The macOS authorization database at /private/var/db/auth.db contains operations
associated with sensitive permissions. Artemis supports querying
the database (SQLite) and extracting the entries.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect Authorizations
data.

## Sample API Script

```typescript
import { authorizations } from "./artemis-api/mod";

function main() {
    const results = authorizations();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `Authorizations` entries.

```typescript
export interface Authorizations {
    id: number;
    name: string;
    type: number;
    class: number;
    group: string;
    kofn: number;
    timeout: number;
    flags: number;
    tries: number;
    version: number;
    created: string;
    modified: string;
    hash: string;
    identifier: string;
    requirement: SingleRequirement | string;
    comment: string;
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}
```
