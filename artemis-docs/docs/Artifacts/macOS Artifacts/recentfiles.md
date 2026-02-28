---
description: macOS Recent Files
keywords:
  - macos
  - plist
---

# Recent Files

Artemis supports parsing macOS recently open files (sfl files). These plist files contain files and directories recently opened by macOS applications

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`Recent Files` data.

## Sample API Script

```typescript
import { sharedFilelist } from "./artemis-api/mod";

function main() {
    const results = sharedFilelist();
    console.log(JSON.stringify(results));
}

main();
```

## Output Structure

An array of `RecentFiles` objects

```typescript
export interface RecentFiles {
    evidence: string;
    shared_file_type: SharedFileType;
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: "Recent Files";
    data_type: "macos:plist:recentfile:entry";
    plist_data_type: PlistDataType;
    [ key: string ]: unknown;
}

export enum SharedFileType {
    FinderFavorite = "Finder Favorite",
    VolumeFavorite = "Volume Favorite",
    UnknownFavorite = "Unkonwn Favorite",
    ApplicationRecentFiles = "Application Recent File",
    ProjectFavorite = "Tag Favorite",
    RecentApplication = "Recent Application",
    RecentDocuments = "Recent Documents",
}

export enum PlistDataType {
    Bookmark = "Bookmark",
    CodeSign = "Code Signing"
}
```
