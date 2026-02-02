---
description: The default macOS browser
keywords:
  - browser
  - apple
---

# Safari

Safari is the builtin web browser an Apple devices. Artemis supports parsing:

- browser history
- download history
- Cookies
- Favicons
- Bookmarks
- Extensions

References:

- [History Schema](https://gist.github.com/l1x/68e206f56bcc22cde3d76cc8fed49f3f)
- [Cookies](https://github.com/libyal/dtformats/blob/main/documentation/Safari%20Cookies.asciidoc)


## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
Safari data.

## Sample API Script

```typescript
import { PlatformType, Safari } from "./artemis-api/mod";

function main() {
    const client = new Safari(PlatformType.Darwin);
    console.log(JSON.stringify(client.history()));
}

main();
```

## Output Structure

Depending on the the functions used artemis will return the objects below:


```typescript
export interface SafariHistory {
  /**Row ID value */
  id: number;
  /**Page URL */
  url: string;
  /**Expansion for domain */
  domain_expansion: string;
  /**Page visit count */
  visit_count: number;
  /**Daily visits */
  daily_visit_counts: string | null;
  /**Weekly visits */
  weekly_visit_counts: string | null;
  /**Autocomplete triggers for page */
  autocomplete_triggers: number | null;
  /**Recompute visits count */
  should_recompute_derived_visit_counts: number;
  /**Visit score value */
  visit_count_score: number;
  /**Status code value */
  status_code: number;
  /**Visit time */
  visit_time: string;
  /**Load successful value */
  load_successful: number;
  /**Page title */
  title: string | null;
  /**Attributes value */
  attributes: number;
  /**Score value */
  score: number;
  /**Path associated with the history file */
  path: string;
  unfold: Url | undefined;
  /**Browser version */
  version: number;
  message: string;
  datetime: string;
  timestamp_desc: "URL Visited";
  artifact: "URL History";
  data_type: "macos:safari:history:entry";
}

export interface SafariDownloads {
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
  /**Download finish date */
  download_entry_finish: string;
  /**Path to file to run */
  path: string;
  /**Path represented as Catalog Node ID */
  cnid_path: string;
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
  plist_path: string;
  unfold: Url | undefined;
  /**Browser version */
  version: number;
  message: string;
  datetime: string;
  timestamp_desc: "File Download Start";
  artifact: "File Download";
  data_type: "macos:safari:downloads:entry";
}

export interface Cookie {
  flag: CookieFlag;
  domain: string;
  name: string;
  path: string;
  value: string;
  expiration: string;
  created: string;
  message: string;
  datetime: string;
  timestamp_desc: "Cookie Expires";
  artifact: "Website Cookie";
  data_type: "macos:safari:cookies:entry";
  [key: string]: any;
}

export enum CookieFlag {
  IsSecure = "IsSecure",
  Unknown = "Unknown",
  IsHttp = "IsHttp",
  IsSecureHttp = "IsSecureHttp",
}

export interface SafariBookmark {
  title: string;
  url: string;
  description: string;
  /**Path to the Bookmarks.plist file */
  path: string;
  /**Browser version */
  version: number;
  message: string;
  datetime: string;
  timestamp_desc: "Bookmark Created";
  artifact: "Website Bookmark";
  data_type: "macos:safari:bookmark:entry";
}

export interface SafariFavicon {
  uuid: string;
  url: string;
  favicon_url: string;
  created: string;
  /**Path to the favicons.db file */
  path: string;
  /**Browser version */
  version: number;
  message: string;
  datetime: string;
  timestamp_desc: "Favicon Created";
  artifact: "URL Favicon";
  data_type: "macos:safari:favicons:entry";
}

export interface SafariExtensions {
  name: string;
  key: string;
  team_id: string;
  accessible_origins: string[];
  added: string;
  enabled: boolean;
  permissions: string[];
  /**Path to the Extensions.plist file */
  path: string;
  /**Browser version */
  version: number;
  message: string;
  datetime: string;
  timestamp_desc: "Extension Installed";
  artifact: "Browser Extension";
  data_type: "macos:safari:extension:entry";
}
```
