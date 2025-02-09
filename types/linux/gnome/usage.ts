/**
 * Information about GNOME Application usage
 */
export interface AppUsage {
  /**Application ID */
  id: string;
  /**Application rank score */
  score: number;
  /**Application last seen timestamp */
  "last-seen": string;
  /**Path to the parsed application_state file */
  source: string;
}
