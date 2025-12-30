---
description: Brave browser
keywords:
  - browser
---

# Brave

Brave is an open source web browser created and maintained by Brave Software.

Artemis supports parsing the list of artifacts below:

- History
- Downloads
- Cookies
- Autofill
- Bookmarks
- Login Data
- Extensions
- Preferences
- Detect Incidental Party State (DIPS)
- Local Storage
- Browser sessions
- Favicons
- Shortcuts
- Retrospect - A powerful capability that timelines all artifacts. It is based on [Hindsight](https://github.com/obsidianforensics/hindsight)

You have to use the artemis [api](../../API/overview.md) in order to collect Brave data.  
Since Brave is based on Chromium, many of the Brave artifacts will be identical to Chromium

Other parsers:

- Any program that read a SQLITE database

References:

- [History](https://en.wikiversity.org/wiki/Chromium_browsing_history_database)
- [Schema](https://gist.github.com/dropmeaword/9372cbeb29e8390521c2)


# Sample API Script

```typescript
import { Brave } from "./artemis-api/mod";
import { PlatformType } from "./artemis-api/src/system/systeminfo";

function main() {
    const client = new Brave(PlatformType.Darwin);
    console.log(JSON.stringify(client.cookies()));
}

main();
```

# Output Structure

Dependent on browser artifact user wants to parse.

```typescript
/**
 * An interface representing the Chromium SQLITE tables: `urls` and `visits`
 */
export interface ChromiumHistory {
  /**Row ID value */
  id: number;
  /**Page URL */
  url: string;
  /**Page title */
  title: string;
  /**Page visit count */
  visit_count: number;
  /**Typed count value */
  typed_count: number;
  /**Last visit time*/
  last_visit_time: string;
  /**Hidden value */
  hidden: number;
  /**Visits ID value */
  visits_id: number;
  /**From visit value */
  from_visit: number;
  /**Transition value */
  transition: number;
  /**Segment ID value */
  segment_id: number;
  /**Visit duration value */
  visit_duration: number;
  /**Opener visit value */
  opener_visit: number;
  unfold: Url | undefined;
  /**Path to the HISTORY sqlite file */
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "URL Visited";
  artifact: "URL History";
  data_type: string;
  browser: BrowserType;
}

/**
 * An interface representing the Chromium SQLITE tables: `downloads` and  `downloads_url_chains`
 */
export interface ChromiumDownloads {
  /**Row ID */
  id: number;
  /**GUID for download */
  guid: string;
  /**Path to download */
  current_path: string;
  /**Target path to download */
  target_path: string;
  /**Download start time */
  start_time: string;
  /**Bytes downloaded */
  received_bytes: number;
  /**Total bytes downloaded */
  total_bytes: number;
  /**State value */
  state: number;
  /**Danger type value */
  danger_type: number;
  /**Interrupt reason value */
  interrupt_reason: number;
  /**Raw byte hash value */
  hash: number[];
  /**Download end time */
  end_time: string;
  /**Opened value */
  opened: number;
  /**Last access time */
  last_access_time: string;
  /**Transient value */
  transient: number;
  /**Referer URL */
  referrer: string;
  /**Download source URL */
  site_url: string;
  /**Tab URL */
  tab_url: string;
  /**Tab referrer URL */
  tab_referrer_url: string;
  /**HTTP method used */
  http_method: string;
  /**By ext ID value */
  by_ext_id: string;
  /**By ext name value */
  by_ext_name: string;
  /**Etag value */
  etag: string;
  /**Last modified time */
  last_modified: string;
  /**MIME type value */
  mime_type: string;
  /**Original mime type value */
  original_mime_type: string;
  /**Downloads URL chain ID value */
  downloads_url_chain_id: number;
  /**Chain index value */
  chain_index: number;
  /**URL for download */
  url: string;
  /**Path to the HISTORY sqlite file */
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "File Download Start";
  artifact: "File Download";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumCookies {
  creation: string;
  host_key: string;
  top_frame_site_key: string;
  name: string;
  value: string;
  /**This value is currently Base64 encoded */
  encrypted_value: string;
  path: string;
  expires: string;
  is_secure: boolean;
  is_httponly: boolean;
  last_access: string;
  has_expires: boolean;
  is_persistent: boolean;
  priority: number;
  samesite: number;
  source_scheme: number;
  source_port: number;
  is_same_party: number;
  last_update: string;
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Cookie Expires";
  artifact: "Website Cookie";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumAutofill {
  name?: string;
  value?: string;
  value_lower?: string;
  date_created: string;
  date_last_used: string;
  /**Default is 1 */
  count: number;
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Autofill Created";
  artifact: "Website Autofill";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumBookmarks {
  date_added: string;
  date_last_used: string;
  guid: string;
  id: number;
  name: string;
  type: string;
  url: string;
  meta_info: Record<string, string>;
  bookmark_type: BookmarkType;
  path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Bookmark Added";
  artifact: "Browser Bookmark";
  data_type: string;
  browser: BrowserType;
}

export enum BookmarkType {
  Bar = "Bookmark Bar",
  Sync = "Synced",
  Other = "Other",
  Unknown = "Unknown",
}

export interface ChromiumLogins {
  origin_url: string;
  action_url?: string;
  username_element?: string;
  username_value?: string;
  password_element?: string;
  password_value?: string;
  submit_element?: string;
  signon_realm: string;
  date_created: string;
  blacklisted_by_user: number;
  scheme: number;
  password_type?: number;
  times_used?: number;
  form_data?: string;
  display_name?: string;
  icon_url?: string;
  federation_url?: string;
  skip_zero_click?: number;
  generation_upload_status?: number;
  possible_username_pairs?: string;
  id: number;
  date_last_used: string;
  moving_blocked_for?: string;
  date_password_modified: string;
  sender_email?: string;
  sender_name?: string;
  date_received?: string;
  sharing_notification_display: number;
  keychain_identifier?: string;
  sender_profile_image_url?: string;
  db_path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Last Login";
  artifact: "Website Login";
  data_type: string;
  browser: BrowserType;
}

/**
 * Detect Incidental Party State (DIPS) collects metrics on websites
 */
export interface ChromiumDips {
  site: string;
  first_site_storage?: string | null;
  last_site_storage?: string | null;
  first_user_interaction?: string | null;
  last_user_interaction?: string | null;
  first_stateful_bounce?: string | null;
  last_stateful_bounce?: string | null;
  first_bounce?: string | null;
  last_bounce?: string | null;
  first_web_authn_assertion: string | null;
  last_web_authn_assertion: string | null;
  /**Path to DIPS database */
  path: string;
  /**Browser version */
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "First Interaction";
  artifact: "Browser DIPS";
  data_type: string;
  browser: BrowserType;
}

export interface ChromiumProfiles {
  full_path: string;
  version: string;
  browser: BrowserType;
}

export enum ChromiumCookieType {
  Unknown = "Unknown",
  Http = "HTTP",
  Script = "Script",
  Other = "Other",
}

/**
 * Object representing a Local Storage LevelDb entry.  
 * This object is Timesketch compatible.  It does **not** need to be timelined
 */
export interface ChromiumLocalStorage extends LevelDbEntry {
  version: string;
  message: string;
  datetime: string;
  browser: BrowserType;
  timestamp_desc: "Local Storage Entry Write" | "Local Storage Write Ahead Log";
  artifact: "Level Database";
  data_type: "applications:leveldb:entry";
}

export interface ChromiumSession {
  version: string;
  message: string;
  datetime: string;
  browser: BrowserType;
  timestamp_desc: "Last Active";
  artifact: "Browser Session";
  data_type: string;
  session_id: string;
  last_active: string;
  url: string;
  title: string;
  session_type: SessionType;
  path: string;
}

export enum SessionType {
  Session = "Session",
  Tab = "Tab",
}
```
