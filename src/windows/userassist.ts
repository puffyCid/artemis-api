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
  /**Last execution time of application in UNIXEPOCH seconds */
  last_execution: number;
  /**Number of times executed */
  count: number;
  /**Registry path to UserAssist entry */
  reg_path: string;
  /**ROT13 encoded path */
  rot_path: string;
  /**Path of executed application with folder description GUIDs resolved */
  folder_path: string;
}

/**
 * Function to parse `UserAssist` entries on the systemdrive
 * @returns Array of `UserAssist` entries parsed from the sysystemdrive letter
 */
export function get_userassist(): UserAssist[] {
  // Array of JSON objects
  const data = Deno.core.ops.get_userassist();
  const assist_array: UserAssist[] = JSON.parse(data);

  return assist_array;
}

/**
 * Function to parse `UserAssist` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `UserAssist` entries parsed from a Windows drive letter
 */
export function get_alt_userassist(drive: string): UserAssist[] {
  // Array of JSON objects
  const data = Deno.core.ops.get_alt_userassist(drive);
  const assist_array: UserAssist[] = JSON.parse(data);

  return assist_array;
}
