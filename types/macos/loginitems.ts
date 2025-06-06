import { CreationFlags, TargetFlags, VolumeFlags } from "./bookmark";

/**
 * `LoginItems` are a form of persistence on macOS systems.
 * They are triggered when a user logs on to the system.
 * They are located at:
 *  - `/Users/%/Library/Application Support/com.apple.backgroundtaskmanagementagent/backgrounditems.btm` (pre-Ventura)
 *  - `/var/db/com.apple.backgroundtaskmanagement/BackgroundItems-v4.btm` (Ventura+)
 *
 * Both are plist files that are parsed to get the `LoginItem` data
 *
 * References:
 *  - https://www.sentinelone.com/blog/how-malware-persists-on-macos/
 */
export interface LoginItems {
  /**Path to file to run */
  path: string;
  /**Path represented as Catalog Node ID */
  cnid_path: string;
  /**Created timestamp of target file */
  created: string;
  /**Path to the volume of target file */
  volume_path: string;
  /**Target file URL type */
  volume_url: string;
  /**Name of volume target file is on */
  volume_name: string;
  /**Volume UUID */
  volume_uuid: string;
  /**Size of target volume in bytes */
  volume_size: number;
  /**Created timestamp of volume */
  volume_created: string;
  /**Volume Property flags */
  volume_flags: VolumeFlags[];
  /**Flag if volume if the root filesystem */
  volume_root: boolean;
  /**Localized name of target file */
  localized_name: string;
  /**Read-Write security extension of target file */
  security_extension_rw: string;
  /**Read-Only security extension of target file */
  security_extension_ro: string;
  /**File property flags */
  target_flags: TargetFlags[];
  /**Username associated with `Bookmark` */
  username: string;
  /**Folder index number associated with target file */
  folder_index: number;
  /**UID associated with `LoginItem` */
  uid: number;
  /**`LoginItem` creation flags */
  creation_options: CreationFlags[];
  /**Is `LoginItem` bundled in app */
  is_bundled: boolean;
  /**App ID associated with `LoginItem` */
  app_id: string;
  /**App binary name */
  app_binary: string;
  /**Is target file executable */
  is_executable: boolean;
  /**Does target file have file reference flag */
  file_ref_flag: boolean;
  /**Path to `LoginItem` source */
  source_path: string;
}
