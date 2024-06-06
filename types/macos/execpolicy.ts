/**
 * macOS `ExecPolicy` tracks application execution on a system.
 * It only tracks execution of applications that are tracked by GateKeeper
 *
 * References:
 *  - https://eclecticlight.co/2023/03/13/ventura-has-changed-app-quarantine-with-a-new-xattr/
 *  - https://knight.sc/reverse%20engineering/2019/02/20/syspolicyd-internals.html
 */
export interface ExecPolicy {
  /**Is file signed */
  is_signed: number;
  /**Name of executable */
  file_identifier: string;
  /**App bundle ID for entry */
  bundle_identifier: string;
  /**Bundle version for entry */
  bundle_version: string;
  /**Team ID for entry */
  team_identifier: string;
  /**Signing ID for entry */
  signing_identifier: string;
  /**Code Directory hash if available otherwise SHA256 hash of executable*/
  cdhash: string;
  /**SHA256 hash of executable */
  main_executable_hash: string;
  /**Timestamp when the executable was inserted in ExecPolicy database */
  executable_timestamp: string;
  /**Size of file */
  file_size: number;
  /**Is library */
  is_library: number;
  /**Is file used */
  is_used: number;
  /**Parent Application File ID associated with entry. This is often the Parent Process */
  responsible_file_identifier: string;
  /**Is valid entry */
  is_valid: number;
  /**Is quarantined entry */
  is_quarantined: number;
  /**Timestamp for executable measurements */
  executable_measurements_v2_timestamp: string;
  /**Reported timestamp */
  reported_timstamp: string;
  /**Primary key */
  pk: number;
  /**Volume UUID for entry */
  volume_uuid: string;
  /**Object ID for entry */
  object_id: number;
  /**Filesystem type. Typically APFS */
  fs_type_name: string;
  /**App Bundle ID. Should be same as `bundle_identifier` */
  bundle_id: string;
  /**Policy match for entry */
  policy_match: number;
  /**Malware result for entry */
  malware_result: number;
  /**Flags for entry */
  flags: number;
  /**Modified time */
  mod_time: string;
  /**Policy scan cache timestamp */
  policy_scan_cache_timestamp: string;
  /**Revocation check timestamp */
  revocation_check_time: string;
  /**Scan version for entry */
  scan_version: number;
  /**Top policy match for entry */
  top_policy_match: number;
}
