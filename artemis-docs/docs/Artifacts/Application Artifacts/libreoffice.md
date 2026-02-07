---
description: Open source Office application
keywords:
  - office software
---

# LibreOffice

LibreOffice is a popular open source office software. Artemis supports parsing
recently opened files by the LibreOffice applications.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
LibreOffice information.

## Sample API Script

```typescript
import {
  PlatformType,
  recentFiles,
} from "./artemis-api/mod";

function main() {
  const results = recentFiles(PlatformType.Darwin);

  console.log(results);
}
```

## Output Structure

An array of `RecentFilesLibreOffice` entries.

```typescript
/**
 * List of files opened by LibreOffice
 */
export interface RecentFilesLibreOffice {
  /**Path to file */
  path: string;
  /**Document title */
  title: string;
  /**Filter for file */
  filter: string;
  /**If file is pinned */
  pinned: boolean;
  /**If file is password protected */
  password: string;
  /**If file is marked readonly */
  readonly: boolean;
  /**Base64 encoded thumbnail of file */
  thumbnail: string;
  /**Path to registrymodifications.xcu */
  source: string;
  message: string;
  datetime: "1970-01-01T00:00:00.000Z";
  timestamp_desc: "N/A";
  artifact: "LibreOffice Recent Files",
  data_type: "application:libreoffice:recentfiles:entry",
}
```
