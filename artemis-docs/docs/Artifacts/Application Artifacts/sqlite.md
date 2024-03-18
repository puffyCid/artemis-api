---
description: Open source embedded database
keywords:
  - database
---

# SQLite

SQLite is an open source embedded database used by many popular applications.
Artemis supports sending queries to SQLite databases. It is able to query locked
databases.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
SQLite information.

# Sample API Script

```typescript
import {
  querySqlite,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

function main() {
  const path = "path to sqlite file";
  const query = "select * from table";

  const results = querySqlite(path, query);

  console.log(results);
}
```

# Output Structure

An array of `Record<string, unknown>` entries.
