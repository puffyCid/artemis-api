/**
 * macOS `unifiedlogs` are the primary files associated with logging with system activity.
 * They are stored in a binary format at `/var/db/diagnostics/`.
 *
 * References:
 *  - https://eclecticlight.co/2018/03/19/macos-unified-log-1-why-what-and-how/
 *  - https://www.mandiant.com/resources/blog/reviewing-macos-unified-logs
 *  - https://www.crowdstrike.com/blog/how-to-leverage-apple-unified-log-for-incident-response/
 */
export interface UnifiedLog {
  /**Subsystem used by the log entry */
  subsystem: string;
  /**Library associated with the log entry */
  library: string;
  /**Log entry category */
  category: string;
  /**Process ID associated with log entry */
  pid: number;
  /**Effective user ID associated with log entry */
  euid: number;
  /**Thread ID associated with log entry */
  thread_id: number;
  /**Activity ID associated with log entry */
  activity_id: number;
  /**UUID of library associated with the log entry */
  library_uuid: string;
  /**UNIXEPOCH timestamp of log entry in nanoseconds */
  time: bigint;
  /**ISO RFC 3339 timestamp with nanosecond precision */
  timestamp: string;
  /**Log entry event type */
  event_type: string;
  /**Log entry log type */
  log_type: string;
  /**Process associated with log entry */
  process: string;
  /**UUID of process associated with log entry */
  process_uuid: string;
  /**Raw string message  associated with log entry*/
  raw_message: string;
  /**Boot UUID associated with log entry */
  boot_uuid: string;
  /**Timezone associated with log entry */
  timezone_name: string;
  /**Strings associated with the log entry */
  message_entries: Record<string, string | number>;
  /**
   * Resolved message entry associated log entry.
   * Merge of `raw_message` and `message_entries`
   */
  message: string;
}
