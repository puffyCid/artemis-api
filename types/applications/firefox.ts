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
  db_path: string;
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
  db_path: string;
}

export interface FirefoxCookies {
  id: number;
  origin_attributes: string;
  name?: string;
  value?: string;
  host?: string;
  path?: string;
  expiry?: number;
  last_accessed?: string;
  creation_time?: string;
  is_secure?: boolean;
  is_http_only?: boolean;
  in_browser_element: boolean;
  same_site: boolean;
  raw_same_site: boolean;
  scheme_map: number;
  db_path: string;
}

export interface FirefoxFavicons {
  icon_url: string;
  expires: string;
  db_path: string;
}

export interface FirefoxProfiles {
  full_path: string;
  version: number;
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
  db_path: string;
}

export enum Respository {
  Persistent = "Persistent",
  Default = "Default",
  Private = "Private",
  Unknown = "Unknown",
  Temporary = "Temporary",
}