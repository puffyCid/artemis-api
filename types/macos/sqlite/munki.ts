/**
 * Munki tracked pplication usage
 */
export interface MunkiApplicationUsage {
  /**Application event such as: activate, quite, launch */
  event: string;
  /**Application bundle ID */
  bundle_id: string;
  /**Application version */
  app_version: string;
  /**Path the application */
  app_path: string;
  /**Last time of the event */
  last_time: string;
  /**Number of times of the event */
  number_times: number;
}
