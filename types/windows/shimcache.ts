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
  /**Standard Information Modified timestamp */
  last_modified: string;
  /**Full path to the Registry key */
  key_path: string;
}
