/**
 * Windows `UserAssist` is a Registry artifact that records applications executed via Windows Explorer.
 * These entries are typically ROT13 encoded (though this can be disabled)
 *
 * References:
 *  - https://winreg-kb.readthedocs.io/en/latest/sources/explorer-keys/User-assist.html
 */
export interface UserAssist {
  /**Path of executed application */
  path: string;
  /**Last execution time of application */
  last_execution: string;
  /**Number of times executed */
  count: number;
  /**Registry path to UserAssist entry */
  reg_path: string;
  /**ROT13 encoded path */
  rot_path: string;
  /**Path of executed application with folder description GUIDs resolved */
  folder_path: string;
}
