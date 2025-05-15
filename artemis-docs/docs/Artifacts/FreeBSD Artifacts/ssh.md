---
description: SSH info on FreeBSD
keywords:
  - plaintext
---

# SSH

SSH is a popular tool to access remote systems. Artemis supports parsing the known_hosts SSH file which lists systems accessed via SSH.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
SSH data.

# Sample API Script

```typescript
import { listKnownHosts } from "./artemis-api/mod";

function main() {
    const data = listKnownHosts();
    console.log(JSON.stringify(data));
}

main();
```

# Output Structure

An array of `KnownHosts` objects

```typescript
export interface KnownHosts {
    target: string;
    algorithm: string;
    data: string;
    source: string;
    created: string;
    modified: string;
    accessed: string;
    changed: string;
}
```
