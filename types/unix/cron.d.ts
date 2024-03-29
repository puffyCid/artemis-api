/**
 * `Cron` is an application that lets users create jobs on an endpoint. It is common on Unix, Linux, and macOS systems.
 * A `Cron` job can be configured to execute a command on at a specific time.  It is a popular form of persistence on supported systems.
 *
 * References:
 *  - https://en.wikipedia.org/wiki/Cron
 */
export interface Cron {
  /**What hour should cron job run. * means every hour */
  hour: string;
  /**What minute should cron job run. * means every minute  */
  min: string;
  /**What day should cron job run. * means every day */
  day: string;
  /**What month should cron job run. * means every month */
  month: string;
  /**What weekday should cron job run. * means every day */
  weekday: string;
  /**Command to execute when cron job is triggered */
  command: string;
}
