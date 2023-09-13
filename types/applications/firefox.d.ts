/**
 * Firefox history is stored in a SQLITE file.
 * `artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Firefox is running.
 *
 * References:
 *  - https://kb.mozillazine.org/Places.sqlite
 */
interface FirefoxHistory {
  /**Array of history entries */
  history: RawFirefoxHistory[];
  /**Path associated with the history file */
  path: string;
  /**User associated with the history file */
  user: string;
}

/**
 * An interface representing the Firefox SQLITE tables: `moz_places` and `moz_origins`
 */
interface RawFirefoxHistory {
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
  /**Last visit time in UNIXEPOCH seconds */
  last_visit_date: number;
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
}

/**
 * Firefox downloads are stored in a SQLITE file
 * `Artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Firefox is running.
 *
 * References:
 * https://kb.mozillazine.org/Places.sqlite
 */
interface FirefoxDownloads {
  /**Array of downloads entries */
  downloads: RawFirefoxDownloads[];
  /**Path associated with the downloads file */
  path: string;
  /**User associated with the downloads file */
  user: string;
}

/**
 * An interface representing the Firefox SQLITE tables: `moz_places`, `moz_origins`, `moz_annos`, `moz_anno_attributes`
 */
interface RawFirefoxDownloads {
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
  /**Date added in UNIXEPOCH seconds */
  date_added: number;
  /**Last modified in UNIXEPOCH seconds */
  last_modified: number;
  /**Downloaded file name */
  name: string;
  /**History data associated with downloaded file */
  history: RawFirefoxHistory;
}
