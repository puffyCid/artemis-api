---
description: Interact with FreeBSD Artifacts
---

# FreeBSD

These functions can be used to pull data related to FreeBSD artifacts.

You can access these functions by using git to clone the API [TypeScript bindings](https://github.com/puffyCid/artemis-api).  
Then you may import them into your TypeScript code.

For example:
```typescript
import { getPkgs } from "./artemis-api/mod";

function main() {
  const start = 0;
  const limit = 100;

  const results = getPkgs(start, limit);
  return results;
}

main();
```

### getPkgs(offset, limit, path) -> Pkg[] | LinuxError

Get list of installed pkgs on the system. You may provide an optional alternative
full path to the local.sqlite file.

You must provided an offset and the amount of packages to query from the
database.


| Param    | Type   | Description                                                                 |
| -------- | ------ | --------------------------------------------------------------------------- |
| offset   | number | Query offset to start at. 0 will start at the first package in the database |
| limit    | number | How many packages to query                                                  |
| alt_path | string | Optional path to the local.sqlite file                                      |