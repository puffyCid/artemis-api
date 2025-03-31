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

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse a
single ESE database.

# Sample API Script

```typescript
import { EseDatabase } from "./artemis-api/src/windows/ese";
import { WindowsError } from "./artemis-api/src/windows/errors";

function main() {
  // Provide path to the UAL file
  const path = "C:\\Windows\\System32\\LogFiles\\sum\\Current.mdb";

  const ese = new EseDatabase(path);

  const catalog = ese.catalogInfo();
  if (catalog === WindowsError) {
    return catalog;
  }

  for (const entry of catalog) {
    console.log(`${entry.name} - Catalog Type: ${entry.catalog_type}`);
  }
}
```

# Output Structures

Depending on functions used the artemis API will returning the following objects

```typescript
/** Generic Interface for dumping ESE tables */
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
  /** All timestamps have been converted to UNIXEPOCH seconds */
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
  UnsignedShort = "UnsignedShort",
  Unknown = "Unknown",
}

/**
 * Metadata about the ESE database Catalog
 */
export interface Catalog {
  /**Fixed data */
  obj_id_table: number;
  /**Fixed data */
  catalog_type: CatalogType;
  /**Fixed data */
  id: number;
  /** Fixed data - Column only if the `catalog_type` is Column, otherwise father data page (FDP) */
  column_or_father_data_page: number;
  /**Fixed data */
  space_usage: number;
  /**Fixed data - If `catalog_type` is Column then these are columns flags */
  flags: number;
  /**Fixed data */
  pages_or_locale: number;
  /**Fixed data */
  root_flag: number;
  /**Fixed data */
  record_offset: number;
  /**Fixed data */
  lc_map_flags: number;
  /**Fixed data */
  key_most: number;
  /**Fixed data */
  lv_chunk_max: number;
  /**Variable data */
  name: string;
  /**Variable data */
  stats: Uint8Array;
  /**Variable data */
  template_table: string;
  /**Variable data */
  default_value: Uint8Array;
  /**Variable data */
  key_fld_ids: Uint8Array;
  /**Variable data */
  var_seg_mac: Uint8Array;
  /**Variable data */
  conditional_columns: Uint8Array;
  /**Variable data */
  tuple_limits: Uint8Array;
  /**Variable data */
  version: Uint8Array;
  /**Variable data */
  sort_id: Uint8Array;
  /**Tagged data */
  callback_data: Uint8Array;
  /**Tagged data */
  callback_dependencies: Uint8Array;
  /**Tagged data */
  separate_lv: Uint8Array;
  /**Tagged data */
  space_hints: Uint8Array;
  /**Tagged data */
  space_deferred_lv_hints: Uint8Array;
  /**Tagged data */
  local_name: Uint8Array;
}

export enum CatalogType {
  Table = "Table",
  Column = "Column",
  Index = "Index",
  LongValue = "LongValue",
  Callback = "Callback",
  SlvAvail = "SlvAvail",
  SlvSpaceMap = "SlvSpaceMap",
  Unknown = "Unknown",
}

export interface TableInfo {
  obj_id_table: number;
  table_page: number;
  table_name: string;
  column_info: ColumnInfo[];
  long_value_page: number;
}

export interface ColumnInfo {
  column_type: ColumnType;
  column_name: string;
  column_data: number[];
  column_id: number;
  column_flags: ColumnFlags[];
  column_space_usage: number;
  column_tagged_flags: TaggedDataFlag[];
}

export enum ColumnFlags {
  NotNull = "NotNull",
  Version = "Version",
  AutoIncrement = "AutoIncrement",
  MultiValued = "MultiValued",
  Default = "Default",
  EscrowUpdate = "EscrowUpdate",
  Finalize = "Finalize",
  UserDefinedDefault = "UserDefinedDefault",
  TemplateColumnESE98 = "TemplateColumnESE98",
  DeleteOnZero = "DeleteOnZero",
  PrimaryIndexPlaceholder = "PrimaryIndexPlaceholder",
  Compressed = "Compressed",
  Encrypted = "Encrypted",
  Versioned = "Versioned",
  Deleted = "Deleted",
  VersionedAdd = "VersionedAdd",
}

enum TaggedDataFlag {
  Variable = "Variable",
  Compressed = "Compressed",
  LongValue = "LongValue",
  MultiValue = "MultiValue",
  MultiValueSizeDefinition = "MultiValueSizeDefinition",
  Unknown = "Unknown",
}
```
