---
description: Windows ShellItems
keywords:
  - windows
  - registry
---

# ShellItems

Windows ShellItems are often generated when a user accesses a directory or file
on the system. ShellItems can be found in [Shortcut](./shortcuts.md) files or in
the Registry [MRU](./mru.md).

Artemis supports parsing ShellItem bytes read from either the Registry or a
file.

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
ShellItems.

# Sample API Script

```typescript
import {
  pargetShellItemseMru,
} from "./artemis-api/mod";

async function main() {
  const results = getShellItem(new Uint8Array());

  console.log(results);
}
```

# Output Structure

An array of `JsShellItem`

```typescript
export interface JsShellItem {
  item: ShellItems;
  /**Remaining bytes associated with the data */
  remaining: Uint8Array;
}

export interface ShellItems {
  /**
   * Value of a shellitem
   * Ex: A file path, URL, Volume, GUID, etc
   */
  value: string;
  /**
   * Type of shellitem
   *
   * Can be:
   *   `Directory, URI, RootFolder, Network, Volume, ControlPanel, UserPropertyView, Delegate, Variable, MTP, Unknown, History`
   *
   *  Most common is `Directory`
   */
  shell_type: string;
  /**FAT created timestamp. Only applicable for Directory `shell_type` */
  created: string;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  modified: string;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  accessed: string;
  /**Entry number in MFT. Only applicable for Directory `shell_type` */
  mft_entry: number;
  /**Sequence number in MFT. Only applicable for Directory `shell_type` */
  mft_sequence: number;
  /**Array of Property Stores */
  stores: Record<string, string | number | boolean | null>;
}
```
