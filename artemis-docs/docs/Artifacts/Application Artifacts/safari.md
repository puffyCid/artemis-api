---
description: The default macOS browser
keywords:
  - browser
  - apple
---

# Safari

Safari is the builtin web browser an Apple devices. artemis supports parsing
browsing history and downloads from Safari. History data is stored in a SQLITE
file while downloads data is stored PLIST file and then stored in
[Bookmark](https://mac-alias.readthedocs.io/en/latest/index.html) format

Other Parsers:

- Any program that read a SQLITE database for History data

References:

- [History Schema](https://gist.github.com/l1x/68e206f56bcc22cde3d76cc8fed49f3f)

# TOML Collection

```toml
system = "macos"

[output]
name = "safari_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "abdc"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "safari-history"

[[artifacts]]
artifact_name = "safari-downloads"
```

# Collection Options

- N/A

# Output Structure

An array of `SafariHistory` for history data and `SafariDownloads` for downloads
data per user.

```typescript
export interface SafariHistory {
  /**Array of history entries */
  history: RawSafariHistory[];
  /**Path associated with the history file */
  path: string;
  /**User associated with the history file */
  user: string;
}

/**
 * An interface representing the Safari SQLITE tables: `history_items` and `history_visits`
 */
export interface RawSafariHistory {
  /**Row ID value */
  id: number;
  /**Page URL */
  url: string;
  /**Expansion for domain */
  domain_expansion: string;
  /**Page visit count */
  visit_count: number;
  /**Daily visist in raw bytes */
  daily_visit_counts: number[];
  /**Weekly visist in raw bytes */
  weekly_visit_counts: number[];
  /**Autocomplete triggers for page */
  autocomplete_triggers: number[];
  /**Recompute visits count */
  should_recompute_derived_visit_counts: number;
  /**Visit score value */
  visit_count_score: number;
  /**Status code value */
  status_code: number;
  /**Visit time */
  visit_time: string;
  /**Load successful value */
  load_successful: boolean;
  /**Page title */
  title: string;
  /**Attributes value */
  attributes: number;
  /**Score value */
  score: number;
}

export interface SafariDownloads {
  /**Array of downloads entries */
  downloads: RawSafariDownloads[];
  /**Path associated with the downloads file */
  path: string;
  /**User associated with the downloads file */
  user: string;
}

/**
 * An interface representing Safari downloads data
 */
export interface RawSafariDownloads {
  /**Source URL for download */
  source_url: string;
  /**File download path */
  download_path: string;
  /**Sandbox ID value */
  sandbox_id: string;
  /**Downloaded bytes */
  download_bytes: number;
  /**Download ID value */
  download_id: string;
  /**Download start date */
  download_entry_date: string;
  /**Download finish date in */
  download_entry_finish: stirng;
  /**Path to file to run */
  path: string;
  /**Path represented as Catalog Node ID */
  cnid_path: number;
  /**Created timestamp of target file */
  created: string;
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
  /**Created timestamp of volume */
  volume_created: string;
  /**Volume Property flags */
  volume_flag: VolumeFlags[];
  /**Flag if volume if the root filesystem */
  volume_root: boolean;
  /**Localized name of target file */
  localized_name: string;
  /**Read-Write security extension of target file */
  security_extension_rw: string;
  /**Read-Only security extension of target file */
  security_extension_ro: string;
  /**File property flags */
  target_flags: TargetFlags[];
  /**Username associated with `Bookmark` */
  username: string;
  /**Folder index number associated with target file */
  folder_index: number;
  /**UID associated with `LoginItem` */
  uid: number;
  /**`LoginItem` creation flags */
  creation_options: CreationFlags[];
  /**Is target file executable */
  is_executable: boolean;
  /**Does target file have file reference flag */
  file_ref_flag: boolean;
}
```
