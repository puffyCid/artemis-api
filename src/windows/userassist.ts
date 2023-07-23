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
export function getUserassist(): UserAssist[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_userassist();

  const results: UserAssist[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse `UserAssist` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `UserAssist` entries parsed from a Windows drive letter
 */
export function getAltUserassist(drive: string): UserAssist[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_userassist(drive);

  const results: UserAssist[] = JSON.parse(data);
  return results;
}
