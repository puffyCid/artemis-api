---
description: Alias data on macOS
keywords:
  - macOS
  - binary
  - file metadata
---

# Alias

macOS `alias` data is similar to Windows `Shortcut` artifacts. It points to
another file on the system. Alias data is sometimes found in plist files. The
macOS [Firewall](./firewall.md) artifact contains alias data.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
alias data.

## Sample API Script

```typescript
import { parseAlias } from "./artemis-api/mod";

function main() {
  // Need to obtain alias bytes from another file. Plist files may have alias data.
  // Ex: The macOS Firewall artifact contains alias data
  const results = parseAlias(new Uint8Array());
  console.log(results);
}
```

## Output Structure

An `alias` object structure

```typescript
export interface Alias {
  kind: string;
  volume_name: string;
  volume_created: string;
  filesystem_type: number;
  disk_type: number;
  cnid: number;
  target_name: string;
  target_cnid: number;
  target_created: string;
  target_creator_code: number;
  target_type_code: number;
  number_directory_levels_from_alias_to_root: number;
  number_directory_levels_from_root_to_target: number;
  volume_attributes: number;
  volume_filesystem_id: number;
  tags: AliasTags;
}

export interface AliasTags {
  carbon_paths: string[];
  paths: string[];
}
```
