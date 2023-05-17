/**
 * Windows `Shimcache` (also called: AppCompatCache, Application Compatability Cache, AppCompat) are Registry entries that track application execution.
 * These entries are only written when the system is shutdown/rebooted.
 *
 * References:
 *  - https://www.mandiant.com/resources/blog/caching-out-the-val
 *  - https://winreg-kb.readthedocs.io/en/latest/sources/system-keys/Application-compatibility-cache.html
 */
export interface Shimcache {
  /**Entry number for shimcache. Entry zero (0) is most recent execution */
  entry: number;
  /**Full path to application file */
  path: string;
  /**Standard Information Modified timestamp in UNIXEPOCH seconds */
  last_modified: number;
  /**Full path to the Registry key */
  key_path: string;
}

/**
 * Function to parse `Shimcache` entries on the systemdrive
 * @returns Array of `Shimcache` entries parsed from the sysystemdrive letter
 */
export function get_shimcache(): Shimcache[] {
  // Array of JSON objects
  const data = Deno[Deno.internal].core.ops.get_shimcache();
  const shim_array: Shimcache[] = JSON.parse(data);

  return shim_array;
}

/**
 * Function to parse `Shimcache` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `Shimcache` entries parsed from a Windows drive letter
 */
export function get_alt_shimcache(drive: string): Shimcache[] {
  // Array of JSON objects
  const data = Deno[Deno.internal].core.ops.get_alt_shimcache(drive);
  const shim_array: Shimcache[] = JSON.parse(data);

  return shim_array;
}
