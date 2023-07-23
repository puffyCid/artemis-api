/**
 * Safari history is stored in a SQLITE file.
 * `artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Safari is running.
 *
 * References:
 *  - https://gist.github.com/l1x/68e206f56bcc22cde3d76cc8fed49f3f
 *  - https://docs.velociraptor.app/exchange/artifacts/pages/macos.applications.safari.history/
 */
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
  /**Visit time in UNIXEPOCH seconds */
  visit_time: number;
  /**Load successful value */
  load_successful: boolean;
  /**Page title */
  title: string;
  /**Attributes value */
  attributes: number;
  /**Score value */
  score: number;
}

/**
 * Get Safari history for all users on a endpoint
 * @returns Array of `SafariHistory` entries for all users
 */
export function getSafariUsersHistory(): SafariHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_users_history();

  const history: SafariHistory[] = JSON.parse(data);
  return history;
}

/**
 * Get Safari history from provided `History.db` file
 * @param path Full path to `History.db` file
 * @returns `RawSafariHistory` entries for file
 */
export function getSafariHistory(path: string): RawSafariHistory[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_history(path);

  const history: RawSafariHistory[] = JSON.parse(data);
  return history;
}

/**
 * Safari downloads are stored in a PLIST file
 * `Artemis` uses the `plist` crate to read the PLIST file. The data is stored in a binary `Bookmark` format
 *
 * References:
 * https://mac-alias.readthedocs.io/en/latest/
 * https://eclecticlight.co/2020/05/21/bookmarks-a-type-of-alias-their-access-and-use/
 */
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
  /**Download start date in UNIXEPOCH seconds */
  download_entry_date: number;
  /**Download finish date in UNIXEPOCH seoconds */
  download_entry_finish: number;
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
  /**Is target file executable */
  is_executable: boolean;
  /**Does target file have file reference flag */
  file_ref_flag: boolean;
}

/**
 * Get Safari downloads for all users on a endpoint
 * @returns Array of `SafariDownloads` entries for all users
 */
export function getSafariUsersDownloads(): SafariDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_users_downloads();

  const downloads: SafariDownloads[] = JSON.parse(data);
  return downloads;
}

/**
 * Get Safari downloads from provided `Downloads.plist` file
 * @param path Full path to `History` file
 * @returns `RawSafariDownloads` entries for file
 */
export function getSafariDownloads(path: string): RawSafariDownloads[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_safari_downloads(path);

  const downloads: RawSafariDownloads[] = JSON.parse(data);
  return downloads;
}
