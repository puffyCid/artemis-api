import { UserAssist } from "../../types/windows/userassist.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse `UserAssist` entries on the systemdrive
 * @param resolve Enable folder description GUID lookups by parsing the SYSTEM Registry file before parsing UserAssist.
 * @returns Array of `UserAssist` entries parsed from the sysystemdrive letter or `WindowsError`
 */
export function getUserassist(resolve: boolean): UserAssist[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_userassist(resolve);

    const results: UserAssist[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("USERASSIST", `failed to parse userassist: ${err}`);
  }
}

/**
 * Function to parse `UserAssist` entries on an alternative path
 * @param path Full path to NTUSER.DAT file
 * @param resolve Enable folder description GUID lookups by parsing the SYSTEM Registry file before parsing UserAssist.
 * @returns Array of `UserAssist` entries or `WindowsError`
 */
export function getAltUserassist(
  path: string,
  resolve: boolean,
): UserAssist[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_userassist(path, resolve);

    const results: UserAssist[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "USERASSIST",
      `failed to parse userassist at ${path}: ${err}`,
    );
  }
}
