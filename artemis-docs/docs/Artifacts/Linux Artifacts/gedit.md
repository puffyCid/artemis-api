---
description: GNOME Text editor
keywords:
  - linux
  - gnome
---

# Gedit

Gedit is a popular text editor for the GNOME Desktop environment. Artemis
supports parsing recently opened files by gedit.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
recent opened files by gedit.

```typescript
import { geditRecentFiles } from "./artemis-api/src/linux/gnome/gedit";

function main() {
  const results = geditRecentFiles();
  console.log(results);
}

main();
```

## Output Structure

An array of `RecentFiles` entries.

```typescript
/**
 * Recent Files opened by gedit
 */
export interface RecentFiles {
  /**Path to file */
  path: string;
  /**Last accessed */
  accessed: string;
  /**Path to `gedit-metdata.xml` */
  gedit_source: string;
}
```
