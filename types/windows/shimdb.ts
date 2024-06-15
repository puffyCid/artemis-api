/**
 * Windows Shimdatabase (ShimDB) can be used by Windows applications to provided compatibility between Windows versions.
 * It does this via `shims` that are inserted into the application that modifies function calls.
 * Malicious custom shims can be created as a form of persistence.
 *
 * References:
 *  - https://www.geoffchappell.com/studies/windows/win32/apphelp/sdb/index.htm
 *  - https://www.mandiant.com/resources/blog/fin7-shim-databases-persistence
 */
export interface Shimdb {
  /**Array of `TAGS` associated with the index tag*/
  indexes: TagData[];
  /**Data associated with the Shimdb */
  db_data: DatabaseData;
  /**Path to parsed sdb file */
  sdb_path: string;
}

/**
 * SDB files are composed of `TAGS`. There are multiple types of `TAGS`
 * `data` have `TAGS` that can be represented via a JSON object
 * `list_data` have `TAGS` that can be represented as an array of JSON objects
 *
 * Example:
 * ```
 * "data": {
 *    "TAG_FIX_ID": "4aeea7ee-44f1-4085-abc2-6070eb2b6618",
 *    "TAG_RUNTIME_PLATFORM": "37",
 *    "TAG_NAME": "256Color"
 * },
 * "list_data": [
 *   {
 *      "TAG_NAME": "Force8BitColor",
 *      "TAG_SHIM_TAGID": "169608"
 *    },
 *    {
 *      "TAG_SHIM_TAGID": "163700",
 *      "TAG_NAME": "DisableThemes"
 *    }
 * ]
 * ```
 *
 * See https://www.geoffchappell.com/studies/windows/win32/apphelp/sdb/index.htm for complete list of `TAGS`
 */
export interface TagData {
  /**TAGs represented as a JSON object */
  data: Record<string, string>;
  /**Array of TAGS represented as a JSON objects */
  list_data: Record<string, string>[];
}

/**
 * Metadata related to the SDB file
 */
export interface DatabaseData {
  /**SDB version info */
  sdb_version: string;
  /**Compile timestamp of the SDB file */
  compile_time: string;
  /**Compiler version info */
  compiler_version: string;
  /**Name of SDB */
  name: string;
  /**Platform ID */
  platform: number;
  /**ID associated with SDB */
  database_id: string;
  /**
   * The SDB file may contain additional metadata information
   * May include additional `TAGS`
   */
  additional_metadata: Record<string, string>;
  /**Array of `TAGS` associated with the SDB file */
  list_data: TagData[];
}
