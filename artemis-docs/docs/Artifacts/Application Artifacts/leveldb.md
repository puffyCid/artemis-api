---
description: Open source embedded NoSQL database
keywords:
  - database
---

# LevelDb

LevelDb is an open source embedded NoSQL database used by many popular applications. It is commonly used by Chromium based browsers or Electron applications.
Artemis supports parsing and extracting entries from LevelDb.

# References

- https://www.cclsolutionsgroup.com/post/hang-on-thats-not-sqlite-chrome-electron-and-leveldb
- https://github.com/libyal/dtformats/blob/main/documentation/LevelDB%20database%20format.asciidoc
- https://chromium.googlesource.com/chromium/src.git/+/62.0.3178.1/content/browser/indexed_db/leveldb_coding_scheme.md


# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
SQLite information.

# Sample API Script

```typescript
import { LevelDb, PlatformType, } from "./artemis-api/mod";

function main() {
    const info = new LevelDb("Path to leveldb directory", PlatformType.Linux);
    console.log(JSON.stringify(info.tables()));
}

main();
```

# Output Structure

An array of `LevelDbEntry` entries.

```typescript
export interface LevelDbEntry {
    sequence: number;
    key_type: number;
    value_type: ValueType;
    value: string | number | boolean | unknown[] | Record<string, ProtoTag>;
    shared_key: string;
    origin: string;
    key: string;
    path: string;
}

export enum ValueType {
    String = "String",
    Null = "Null",
    Number = "Number",
    Date = "Date",
    Binary = "Binary",
    Array = "Array",
    Unknown = "Unknown",
    Protobuf = "Protobuf",
    Utf16 = "Utf16",
}
```