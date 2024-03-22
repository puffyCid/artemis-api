/**
 * Launchd plist files can contain a large amount of configuration options.
 * See `man launchd.plist` or `https://www.launchd.info/`
 */
export interface Launchd {
  /**JSON representation of launchd plist contents */
  launchd_data: Record<string, unknown>;
  /**Full path of the plist file */
  plist_path: string;
}
