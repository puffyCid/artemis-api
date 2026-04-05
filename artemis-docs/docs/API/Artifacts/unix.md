---
description: Interact with Unix Artifacts
---

# Unix

These functions can be used to pull data related to Unix artifacts. They are primarily
supported on both Linux, macOS, and FreeBSD.

You can access these functions by using git to clone the API [TypeScript bindings](https://github.com/puffyCid/artemis-api).  
Then you may import them into your TypeScript code.

For example:
```typescript
import { getBashHistory, PlatformType } from "./artemis-api/mod";

function main() {
  const results = getBashHistory(PlatformType.Linux);
  return results;
}

main();
```

### getBashHistory(platform: PlatformType.Linux | PlatformType.Darwin, alt_file?: string) -> BashHistory[] | UnixError

Get bash history for all users.

| Param    | Type         | Description                               |
| -------- | ------------ | ----------------------------------------- |
| platform | PlatformType | Either Linux or macOS platform            |
| alt_file | string       | Optional alternative path to bash history |

### getZshHistory(platform: PlatformType.Linux | PlatformType.Darwin, alt_file?: string) -> ZshHistory[] | UnixError

Get zsh history for all users.

| Param    | Type         | Description                               |
| -------- | ------------ | ----------------------------------------- |
| platform | PlatformType | Either Linux or macOS platform            |
| alt_file | string       | Optional alternative path to zsh history  |

### getAshHistory(platform: PlatformType.Linux | PlatformType.Darwin, alt_file?: string) -> AshHistory[] | UnixError

Get ash history for all users.

| Param    | Type         | Description                               |
| -------- | ------------ | ----------------------------------------- |
| platform | PlatformType | Either Linux or macOS platform            |
| alt_file | string       | Optional alternative path to ash history  |

### getCron() -> Cron[] | UnixError

Get Cron entries
