/**
 * Chromium history is stored in a SQLITE file.
 * `artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Chromium is running.
 *
 * References:
 *  - https://en.wikiversity.org/wiki/Chromium_browsing_history_database
 *  - https://gist.github.com/dropmeaword/9372cbeb29e8390521c2
 */
export interface ChromiumHistory {
  /**Array of history entries */
  history: RawChromiumHistory[];
  /**Path associated with the history file */
  path: string;
  /**User associated with the history file */
  user: string;
}

/**
 * An interface representing the Chromium SQLITE tables: `urls` and `visits`
 */
export interface RawChromiumHistory {
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
  /**Last visit time in UNIXEPOCH seconds */
  last_visit_time: number;
  /**Hiden value */
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
}

/**
 * Chromium downloads are stored in a SQLITE file
 * `Artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Chromium is running.
 *
 * References:
 * https://en.wikiversity.org/wiki/Chromium_browsing_history_database
 */
export interface ChromiumDownloads {
  /**Array of downloads entries */
  downloads: RawChromiumDownloads[];
  /**Path associated with the downloads file */
  path: string;
  /**User associated with the downloads file */
  user: string;
}

/**
 * An interface representing the Chromium SQLITE tables: `downloads` and  `downloads_url_chains`
 */
export interface RawChromiumDownloads {
  /**Row ID */
  id: number;
  /**GUID for download */
  guid: string;
  /**Path to download */
  current_path: string;
  /**Target path to download */
  target_path: string;
  /**Download start time in UNIXEPOCH seconds */
  start_time: number;
  /**Bytes downloaded */
  received_bytes: number;
  /**Total bytes downloaded */
  total_bytes: number;
  /**State value */
  state: number;
  /**Danger type value */
  danger_type: number;
  /**Interrupt reaason value */
  interrupt_reason: number;
  /**Raw byte hash value */
  hash: number[];
  /**Download end time in UNIXEPOCH seconds */
  end_time: number;
  /**Opened value */
  opened: number;
  /**Last access time in UNIXEPOCH seconds */
  last_access_time: number;
  /**Transient value */
  transient: number;
  /**Referer URL */
  referrer: string;
  /**Download source URL */
  site_url: string;
  /**Tabl URL */
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
  /**Last modified time as STRING */
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
}

export interface ChromiumCookies {
  creation: number;
  host_key: string;
  top_frame_site_key: string;
  name: string;
  value: string;
  /**This value is currently Base64 encoded */
  encrypted_value: string;
  path: string;
  expires: number;
  is_secure: boolean;
  is_httponly: boolean;
  last_access: number;
  has_expires: boolean;
  is_persistent: boolean;
  priority: number;
  samesite: number;
  source_scheme: number;
  source_port: number;
  is_same_party: number;
  last_update: number;
  db_path: string;
}

export interface ChromiumAutofill {
  name?: string;
  value?: string;
  value_lower?: string;
  date_created: number;
  date_last_used: number;
  /**Default is 1 */
  count: number;
  db_path: string;
}

export interface ChromiumBookmarks {
  bookmark_bar: ChromiumBookmarkChildren[];
  other: ChromiumBookmarkChildren[];
  synced: ChromiumBookmarkChildren[];
  path: string;
}

export interface ChromiumBookmarkChildren {
  /**In UNIXEPOCH seconds */
  date_added: number;
  /**In UNIXEPOCH seconds */
  date_last_used: number;
  guid: string;
  id: number;
  name: string;
  type: string;
  url: string;
  meta_info: Record<string, string>,
}