import { Amcache } from "../../types/windows/amcache";
import { WindowsError } from "./errors";

/**
 * Function to parse `Amcache` entries on the systemdrive
 * @param path Optional path to the Amcache file
 * @returns Array of `Amcache` entries parsed from the sysystemdrive letter or `WindowsError`
 */
export function getAmcache(path?: string): Amcache[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const results = js_amcache(path);
    return results;
  } catch (err) {
    return new WindowsError("AMCACHE", `failed to parse amcache: ${err}`);
  }
}
