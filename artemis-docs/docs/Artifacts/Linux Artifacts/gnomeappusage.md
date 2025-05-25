---
description: GNOME Application Usage
keywords:
  - linux
  - gnome
---

# GNOME Application Usage

GNOME is popular Linux Desktop environment pre-installed on many Linux
distrubutions. GNOME tracks commonly used applications that a user searches.
Artemis supports parsing this information to obtain recently used applications.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect GNOME app usage.

```typescript
import { gnomeAppUsage } from "./artemis-api/src/linux/gnome/usage";

function main() {
    const results = gnomeAppUsage();
    console.log(results);
}

main();
```

# Output Structure

An array of `AppUsage` entries.

```typescript
/**
 * Information about GNOME Application usage
 */
export interface AppUsage {
    /**Application ID */
    id: string;
    /**Application rank score */
    score: number;
    /**Application last seen timestamp */
    "last-seen": string;
    /**Path to the parsed application_state file */
    source: string;
}
```
