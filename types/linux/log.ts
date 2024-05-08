/**
 * Linux `Logon` entries are tracked in three (3) files: utmp, wtmp, and btmp
 *
 * - btmp - contains failed logons
 * - wtmp - historical logons
 * - utmp - active logons
 *
 * References:
 *  - https://github.com/libyal/dtformats/blob/main/documentation/Utmp%20login%20records%20format.asciidoc
 */
export interface Logon {
  /**Logon type for logon entry */
  logon_type: string;
  /**Process ID */
  pid: number;
  /** Terminal info */
  terminal: string;
  /**Terminal ID for logon entry */
  terminal_id: number;
  /**Username for logon */
  username: string;
  /**Hostname for logon source */
  hostname: string;
  /**Termination status for logon entry */
  termination_status: number;
  /**Exit status logon entry */
  exit_status: number;
  /**Session for logon entry */
  session: number;
  /**Timestamp for logon in UNIXEPOCH seconds */
  timestamp: number;
  /**Source IP for logon entry */
  ip: string;
  /**Status of logon entry: `Success` or `Failed` */
  status: string;
}
