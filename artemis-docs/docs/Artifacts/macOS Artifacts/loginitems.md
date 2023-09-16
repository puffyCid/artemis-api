---
description: macOS LoginItems
keywords:
  - macOS
  - persistence
  - plist
  - binary
---

# Loginitems

macOS `LoginItems` are a form of persistence on macOS systems. They are
triggered when a user logs on to the system. They are located at:

- `/Users/%/Library/Application Support/com.apple.backgroundtaskmanagementagent/backgrounditems.btm`
  (pre-Ventura)
- `/var/db/com.apple.backgroundtaskmanagement/BackgroundItems-v4.btm` (Ventura+)
  \
  Both are `plist` files, however the actual `LoginItem` data is in an
  additional binary format known as a `Bookmark` that needs to be parsed.

Other Parsers:

- [Bookmarks](https://mac-alias.readthedocs.io/en/latest/index.html)

References:

- [macOS Persistence](https://www.sentinelone.com/blog/how-malware-persists-on-macos/)
- [Bookmarks](https://michaellynn.github.io/2015/10/24/apples-bookmarkdata-exposed/)

# TOML Collection

```toml
system = "macos"

[output]
name = "loginitems_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "loginitems"
```

# Collection Options

- N/A

# Output Structure

An array of `LoginItem` entries

```typescript
export interface LoginItems {
  /**Path to file to run */
  path: string[];
  /**Path represented as Catalog Node ID */
  cnid_path: number[];
  /**Created timestamp of target file in UNIXEPOCH seconds */
  created: number;
  /**Path to the volume of target file */
  volume_path: string;
  /**Target file URL type */
  volume_url: string;
  /**Name of volume target file is on */
  volume_name: string;
  /**Volume UUID */
  volume_uuid: string;
  /**Size of target volume in bytes */
  volume_size: number;
  /**Created timestamp of volume in UNIXEPOCH seconds */
  volume_created: number;
  /**Volume Property flags */
  volume_flag: number[];
  /**Flag if volume if the root filesystem */
  volume_root: boolean;
  /**Localized name of target file */
  localized_name: string;
  /**Read-Write security extension of target file */
  security_extension_rw: string;
  /**Read-Only security extension of target file */
  security_extension_ro: string;
  /**File property flags */
  target_flags: number[];
  /**Username associated with `Bookmark` */
  username: string;
  /**Folder index number associated with target file */
  folder_index: number;
  /**UID associated with `LoginItem` */
  uid: number;
  /**`LoginItem` creation flags */
  creation_options: number;
  /**Is `LoginItem` bundled in app */
  is_bundled: boolean;
  /**App ID associated with `LoginItem` */
  app_id: string;
  /**App binary name */
  app_binary: string;
  /**Is target file executable */
  is_executable: boolean;
  /**Does target file have file reference flag */
  file_ref_flag: boolean;
  /**Path to `LoginItem` source */
  source_path: string;
}
```
