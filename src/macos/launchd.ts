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

/**
 * Function to parse `Launchd daemons` on a macOS system
 * @returns Array of `Launchd daemons` parsed from a plist file
 */
export function get_launchd_daemons(): Launchd[] {
  // Array of JSON objections
  const data = Deno[Deno.internal].core.ops.get_launchd_daemons();
  const launchd_array: Launchd[] = JSON.parse(data);

  return launchd_array;
}

/**
 * Function to parse `Launchd agents` on a macOS system
 * @returns Array of `Launchd agents` parsed from a plist file
 */
export function get_launchd_agents(): Launchd[] {
  // Array of JSON objections
  const data = Deno[Deno.internal].core.ops.get_launchd_agents();
  const launchd_array: Launchd[] = JSON.parse(data);

  return launchd_array;
}
