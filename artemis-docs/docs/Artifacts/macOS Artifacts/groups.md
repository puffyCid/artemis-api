---
description: macOS groups
keywords:
  - macos
  - accounts
  - plist
---

# Groups

Gets group info parsing the `plist` files at
`/var/db/dslocal/nodes/Default/groups`.

Other Parsers:

- Any tool that can parse a `plist` file

References:

- N/A

# TOML Collection

```toml
system = "macos"

[output]
name = "groups_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "groups-macos"
[artifacts.groups_macos]
# Optional
# alt_path = ""
```

# Collection Options

- `alt_path` Use an alternative Groups path. This configuration is **optional**.
  By default artemis will read all Groups at
  `/var/db/dslocal/nodes/Default/groups`

# Output Structure

An array of `Groups` entries

```typescript
export interface Groups {
  /**GID for the group */
  gid: string[];
  /**Name of the group */
  name: string[];
  /**Real name associated with the group */
  real_name: string[];
  /**Users associated with group */
  users: string[];
  /**Group members in the group */
  groupmembers: string[];
  /**UUID associated with the group */
  uuid: string[];
}
```
