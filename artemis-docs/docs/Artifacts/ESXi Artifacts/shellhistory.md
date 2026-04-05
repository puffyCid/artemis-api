---
description: Shell history
keywords:
  - esxi
  - plaintext
---

# Shell History

ESXi systems track shell history when connected via SSH in the file `/.ash_history`. Artemis supports extracting entries from the `/.ash_history` file.

Other parsers:

- Any program that read a text file

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse ESXi Shell History files.

```typescript
import { getAshHistory, PlatformType } from "./artemis-api/mod";

function main() {
    let path = "/.ash_history";
    // Override the default ash_history path normal linux systems.
    // ESXi ash history is located at "/.ash_history"
    const results = getAshHistory(PlatformType.Linux, path);
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `AshHistory`.

```typescript
export interface AshHistory {
  /**Line entry */
  history: string;
  /**Line number */
  line: number;
  /**Path to `.zsh_history` file */
  evidence: string;
}
```
