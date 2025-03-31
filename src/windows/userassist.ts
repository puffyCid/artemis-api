import { UserAssist } from "../../types/windows/userassist";
import { WindowsError } from "./errors";

/**
 * Function to parse `UserAssist` entries
 * @param resolve Enable folder description GUID lookups by parsing the SYSTEM Registry file before parsing UserAssist.
 * @param path Optinal path to an alternative Registry file
 * @returns Array of `UserAssist` entries parsed from the sysystemdrive letter or `WindowsError`
 */
export function getUserassist(
  resolve: boolean,
  path?: string,
): UserAssist[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_userassist(resolve, path);

    return data;
  } catch (err) {
    return new WindowsError("USERASSIST", `failed to parse userassist: ${err}`);
  }
}
