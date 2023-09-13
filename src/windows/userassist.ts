import { UserAssist } from "../../types/windows/userassist.d.ts";

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
