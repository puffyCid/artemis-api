---
description: Extensible Storage Engine (ESE) database
keywords:
  - windows
  - ese
  - persistence
---

# Extensible Storage Engine

Extensible Storage Engine (ESE) database is an open source database used on
Windows systems. ESE databases are used by many different kinds of Windows
applications such as:

- Windows Search
- BITS (pre-Windows 11)
- UAL
- Edge (pre-Chromium version)

Artemis supports parsing both unlocked and locked ESE databases.

:::warning

Larger ESE databases will consume more memory and resources

:::

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse a
single ESE database.

# Sample API Script

```typescript
import {
  parseTable,
} from "https://raw.githubusercontent.com/puffycid/artemis-api/master/mod.ts";

async function main() {
  const path = "path to ese file";
  const tables = ["table1", "table2"];

  const results = parseTable(path, tables);

  console.log(results);
}
```

# Output Structure

A `Record<string, EseTable[][]>` object structure. Where `string` is your table
name and `EseTable[][]` is an array of rows and columns.

```typescript
const data: EseTable[][] = [];

for (const row of data) {
  for (const column of row) {
    console.log(column.column_name);
  }
}
```

```typescript
export interface EseTable {
  column_type: ColumnType;
  column_name: string;
  /**Binary data is base64 encoded. All data is decompressed if possible */
  column_data: string;
}

export enum ColumnType {
  Nil = "Nil",
  Bit = "Bit",
  UnsignedByte = "UnsignedByte",
  Short = "Short",
  Long = "Long",
  Currency = "Currency",
  Float32 = "Float32",
  Float64 = "Float64",
  DateTime = "DateTime",
  Binary = "Binary",
  /** Can be ASCII or Unicode */
  Text = "Text",
  LongBinary = "LongBinary",
  /**Can be ASCII or Unicode */
  LongText = "LongText",
  SuperLong = "SuperLong",
  UnsignedLong = "UnsignedLong",
  LongLong = "LongLong",
  Guid = "Guid",
  UnsingedShort = "UnsingedShort",
  Unknown = "Unknown",
}
```
