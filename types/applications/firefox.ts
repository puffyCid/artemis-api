import { Url } from "../http/unfold";

/**
 * Firefox history is stored in a SQLITE file.
 * `artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Firefox is running.
 *
 * References:
 *  - https://kb.mozillazine.org/Places.sqlite
 */

/**
 * An interface representing the Firefox SQLITE tables: `moz_places` and `moz_origins`
 */
export interface FirefoxHistory {
  /**SQLITE row id */
  moz_places_id: number;
  /**Page URL */
  url: string;
  /**Page title */
  title: string;
  /**URL in reverse */
  rev_host: string;
  /**Page visit count */
  visit_count: number;
  /**Hidden value */
  hidden: number;
  /**Typed value */
  typed: number;
  /**Frequency value */
  frequency: number;
  /**Last visit time */
  last_visit_date: string;
  /**GUID for entry */
  guid: string;
  /**Foreign count value */
  foreign_count: number;
  /**Hash of URL */
  url_hash: number;
  /**Page description */
  description: string;
  /**Preview image URL value */
  preview_image_url: string;
  /**Prefix value (ex: https://) */
  prefix: string;
  /** Host value */
  host: string;
  unfold: Url | undefined;
  evidence: string;
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "URL Visited";
  artifact: "URL History";
  data_type: "application:firefox:history:entry";
}

/**
 * An interface representing the Firefox SQLITE tables: `moz_places`, `moz_origins`, `moz_annos`, `moz_anno_attributes`
 */
export interface FirefoxDownloads {
  /**ID for SQLITE row */
  id: number;
  /**ID to history entry */
  place_id: number;
  /**ID to anno_attribute entry */
  anno_attribute_id: number;
  /**Content value */
  content: string;
  /**Flags value */
  flags: number;
  /**Expiration value */
  expiration: number;
  /**Download type value */
  download_type: number;
  /**Date added */
  date_added: string;
  /**Last modified */
  last_modified: string;
  /**Downloaded file name */
  name: string;
  /**SQLITE row id */
  moz_places_id: number;
  /**Page URL */
  url: string;
  /**Page title */
  title: string;
  /**URL in reverse */
  rev_host: string;
  /**Page visit count */
  visit_count: number;
  /**Hidden value */
  hidden: number;
  /**Typed value */
  typed: number;
  /**Frequency value */
  frequency: number;
  /**Last visit time */
  last_visit_date: string;
  /**GUID for entry */
  guid: string;
  /**Foreign count value */
  foreign_count: number;
  /**Hash of URL */
  url_hash: number;
  /**Page description */
  description: string;
  /**Preview image URL value */
  preview_image_url: string;
  evidence: string;
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "File Download Start";
  artifact: "File Download";
  data_type: "application:firefox:downloads:entry";
}

export interface FirefoxCookies {
  id: number;
  origin_attributes: string;
  name: string;
  value: string;
  host: string;
  path: string;
  expiry: string;
  last_accessed: string;
  creation_time: string;
  is_secure: boolean;
  is_http_only: boolean;
  in_browser_element: boolean;
  same_site: boolean;
  scheme_map: number;
  evidence: string;
  version: string;
  message: string;
  datetime: string;
  timestamp_desc: "Cookie Expires";
  artifact: "Website Cookie";
  data_type: "application:firefox:cookies:entry";
}

export interface FirefoxFavicons {
  icon_url: string;
  expires: string;
  evidence: string;
  message: string;
  datetime: string;
  timestamp_desc: "Favicon Expires";
  artifact: "URL Favicon";
  data_type: "application:firefox:favicons:entry";
  version: string;
}

export interface FirefoxProfiles {
  full_path: string;
  version: string;
}

export interface FirefoxStorage {
  repository: Respository;
  suffix?: string;
  group: string;
  origin: string;
  client_usages: string;
  last_access: string;
  accessed: number;
  persisted: number;
  evidence: string;
  message: string;
  datetime: string;
  version: string;
  timestamp_desc: "Website Storage Last Accessed";
  artifact: "Website Storage";
  data_type: "application:firefox:storage:entry";
}

export enum Respository {
  Persistent = "Persistent",
  Default = "Default",
  Private = "Private",
  Unknown = "Unknown",
  Temporary = "Temporary",
}

export interface FirefoxAddons {
  installed: string;
  updated: string;
  active: boolean;
  visible: boolean;
  author: string;
  addon_version: string;
  path: string;
  evidence: string;
  message: string;
  datetime: string;
  name: string;
  description: string;
  version: string;
  creator: string;
  timestamp_desc: "Extension Installed";
  artifact: "Browser Extension";
  data_type: "application:firefox:extension:entry";
}

export interface FirefoxFormHistory {
  timestamp_desc: "Last Searched";
  artifact: "Form History";
  data_type: "application:firefox:formhistory:entry";
  datetime: string;
  message: string;
  version: string;
  path: string;
  evidence: string;
  search_term: string;
  last_used: string;
  first_used: string;
  fieldname: string;
  guid: string;
  times_used: number;
  source: string;
}

export interface FirefoxBookmark {
  timestamp_desc: "Bookmark Created";
  artifact: "Browser Bookmark";
  data_type: "application:firefox:bookmark:entry";
  datetime: string;
  message: string;
  version: string;
  path: string;
  evidence: string;
  added: string;
  last_modified: string;
  title: string;
  id: number;
  guid: string;
  icon: string;
  uri: string;
}

export interface FirefoxBookmarkRaw {
  guid: string;
  title: string;
  index: number;
  dateAdded: bigint;
  lastModified: bigint;
  id: number;
  typeCode: number;
  type: string;
  root: string;
  iconUri: string | undefined;
  uri: string | undefined;
  children: FirefoxBookmarkRaw[] | undefined
}

export interface FirefoxSession {
  timestamp_desc: "Session Started";
  artifact: "Browser Session";
  data_type: "application:firefox:session:entry";
  datetime: string;
  message: string;
  version: string;
  path: string;
  evidence: string;
  last_accessed: string;
  url: string;
  title: string;
  id: number;
  tab_closed: string;
  window_closed: string;
  session_start: string;
}

/**
 * There is a **ton** of info in Firefox session JSON files
 * Only getting a little bit right now.
 * Other data:
 *  - Referrer URL
 *  - Image
 *  - Lots of GUIDs
 *  - Lots of base64 data
 */
export interface FirefoxSessionRaw {
  version: (string | number)[];
  windows: {
    tabs: {
      lastAccessed: bigint;
      entries: {
        url: string;
        title: string;
        ID: number;
      }[]
    }[],
    _closedTabs: {
      state: {
        entries: {
          url: string;
          title: string;
          ID: number;
        }[],
        lastAccessed: bigint;
      },
      closedAt: bigint;
    }[],
    closedAt: bigint | undefined;
  }[],
  session: {
    lastUpdate: bigint;
    startTime: bigint;
  }
}

export interface FirefoxPermissions {
  timestamp_desc: "Modified";
  artifact: "Browser Permission";
  data_type: "application:firefox:permissions:entry";
  datetime: string;
  message: string;
  version: string;
  path: string;
  evidence: string;
  url: string;
  type: string;
  permission_type: PermissionType;
  expire_type: PermissionExpire;
  expire_time: string;
  modified: string;
  id: number;
}

export enum PermissionType {
  Temporary = "Temporary",
  Allowed = "Allowed",
  Blocked = "Blocked",
  Unknown = "Unknown",
}

/**
 * Defined in source code
 * https://bugzilla.mozilla.org/show_bug.cgi?id=519263
 */
export enum PermissionExpire {
  Never = "Never",
  Session = "Session",
  Time = "Time",
  Unknown = "Unknown",
}