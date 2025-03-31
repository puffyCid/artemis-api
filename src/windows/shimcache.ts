import { Shimcache } from "../../types/windows/shimcache";
import { WindowsError } from "./errors";

/**
 * Function to parse `Shimcache` entries on the systemdrive
 * @param path Optional path t Registry file
 * @returns Array of `Shimcache` entries parsed from the sysystemdrive letter or `WindowsError`
 */
export function getShimcache(path?: string): Shimcache[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_shimcache(path);

    return data;
  } catch (err) {
    return new WindowsError("SHIMCACHE", `failed to parse shimcache: ${err}`);
  }
}
