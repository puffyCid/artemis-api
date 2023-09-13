/**
 * Journal files are the logs associated with the Systemd service
 * Systemd is a popular system service that is common on most Linux distros
 * The logs can contain data related to application activity, sudo commands, and more
 *
 * References:
 *  - https://systemd.io/JOURNAL_FILE_FORMAT/
 *  - https://wiki.archlinux.org/title/Systemd/Journal
 *  - https://github.com/systemd/systemd/blob/main/src/libsystemd/sd-journal/journal-def.h
 *  - https://www.freedesktop.org/software/systemd/man/systemd.journal-fields.html
 */
export interface Journal {
  /**User ID associated with entry */
  uid: number;
  /**Group ID associated with entry */
  gid: number;
  /**Process ID associated with entry */
  pid: number;
  /**Thread ID associated with entry */
  thread_id: number;
  /**Command associated with entry */
  comm: string;
  /**Priority associated with entry */
  priority: string;
  /**Syslog facility associated with entry */
  syslog_facility: string;
  /**Executable file associated with entry */
  executable: string;
  /**Cmdline args associated with entry */
  cmdline: string;
  /**Effective capabilities of process associated with entry */
  cap_effective: string;
  /**Session of the process associated with entry */
  audit_session: number;
  /**Login UID of the process associated with entry */
  audit_loginuid: number;
  /**Systemd Countrol Group associated with entry */
  systemd_cgroup: string;
  /**Systemd owner UID associated with entry */
  systemd_owner_uid: number;
  /**Systemd unit associated with entry */
  systemd_unit: string;
  /**Systemd user unit associated with entry */
  systemd_user_unit: string;
  /**Systemd slice associated with entry */
  systemd_slice: string;
  /**Sysemd user slice associated with entry */
  systemd_user_slice: string;
  /**Systemd invocation ID associated with entry */
  systemd_invocation_id: string;
  /**Kernel Boot ID associated with entry */
  boot_id: string;
  /**Machine ID of host associated with entry */
  machine_id: string;
  /**Hostname associated with entry */
  hostname: string;
  /**Runtime scope associated with entry */
  runtime_scope: string;
  /**Trused Timestamp associated with entry in UNIXEPOCH microseconds */
  source_realtime: number;
  /**Timestamp associated with entry in UNIXEPOCH microseconds */
  realtime: number;
  /**How entry was received by the Journal service */
  transport: string;
  /**Journal message entry */
  message: string;
  /**Message ID associated with Journal Catalog */
  message_id: string;
  /**Unit result associated with entry */
  unit_result: string;
  /**Code line for file associated with entry */
  code_line: number;
  /**Code function for file associated with entry */
  code_function: string;
  /**Code file associated with entry */
  code_file: string;
  /**User invocation ID associated with entry */
  user_invocation_id: string;
  /**User unit associated with entry */
  user_unit: string;
  /**
   * Custom fields associated with entry.
   * Example:
   * ```
   * "custom": {
   *            "_SOURCE_MONOTONIC_TIMESTAMP": "536995",
   *            "_UDEV_SYSNAME": "0000:00:1c.3",
   *            "_KERNEL_DEVICE": "+pci:0000:00:1c.3",
   *            "_KERNEL_SUBSYSTEM": "pci"
   *        }
   * ```
   */
  custom: Record<string, string>;
  /**Sequence Number associated with entry */
  seqnum: number;
}
