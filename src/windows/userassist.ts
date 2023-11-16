import { UserAssist } from "../../types/windows/userassist.d.ts";
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
 * Function to parse `UserAssist` entries on an alternative drive
 * @param drive drive letter
 * @param resolve Enable folder description GUID lookups by parsing the SYSTEM Registry file before parsing UserAssist.
 * @returns Array of `UserAssist` entries parsed from a Windows drive letter or `WindowsError`
 */
export function getAltUserassist(
  drive: string,
  resolve: boolean,
): UserAssist[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_userassist(drive, resolve);

    const results: UserAssist[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "USERASSIST",
      `failed to parse userassist at drive ${drive}: ${err}`,
    );
  }
}
