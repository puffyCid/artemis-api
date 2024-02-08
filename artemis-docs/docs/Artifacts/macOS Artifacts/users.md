---
description: macOS users
keywords:
  - macos
  - accounts
  - plist
---

# Users

Gets user info parsing the `plist` files at
`/var/db/dslocal/nodes/Default/users`.

Other Parsers:

- Any tool that can parse a `plist` file

References:

- N/A

# TOML Collection

```toml
system = "macos"

[output]
name = "users_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "users"
[artifacts.users]
# Optional
# alt_path = ""
```

# Collection Options

- `alt_path` Use an alternative Users path. This configuration is **optional**.
  By default artemis will read all Users at
  `/var/db/dslocal/nodes/Default/users`

# Output Structure

An array of `Users` entries

```typescript
export interface Users {
  /**UID for the user */
  uid: string[];
  /**GID associated with the user */
  gid: string[];
  /**User name */
  name: string[];
  /**Real name associated with user */
  real_name: string[];
  /**Base64 encoded photo associated with user */
  account_photo: string[];
  /**Timestamp the user was created in UNIXEPOCH seconds */
  account_created: number;
  /**Password last changed for the user in UNIXEPOCH seconds */
  password_last_set: number;
  /**Shell associated with the user */
  shell: string[];
  /**Unlock associated with the user */
  unlock_options: string[];
  /**Home path associated with user */
  home_path: string[];
  /**UUID associated with user */
  uuid: string[];
```
