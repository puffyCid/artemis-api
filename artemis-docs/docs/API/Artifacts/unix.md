---
description: Interact with Unix Artifacts
---

# Unix

These functions can be used to pull data related to Unix artifacts. They are
supported on both Linux and macOS.

You can access these functions by using git to clone the API [TypeScript bindings](https://github.com/puffyCid/artemis-api).  
Then you may import them into your TypeScript code.

For example:
```typescript
import { getBashHistory } from "./artemis-api/mod";

function main() {
  const results = getBashHistory();
  return results;
}

main();
```

### getBashHistory() -> BashHistory[] | UnixError

Get bash history for all users.

### getZshHistory() -> ZshHistory[] | UnixError

Get zsh history for all users.

### getPythonHistory() -> PythonHistory[] | UnixError

Get python history for all users.

### getCron() -> Cron[] | UnixError

Get Cron entries
