import { Shimcache } from "../../types/windows/shimcache.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse `Shimcache` entries on the systemdrive
 * @returns Array of `Shimcache` entries parsed from the sysystemdrive letter or `WindowsError`
 */
export function getShimcache(): Shimcache[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_shimcache();

    const results: Shimcache[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("SHIMCACHE", `failed to parse shimcache: ${err}`);
  }
}

/**
 * Function to parse `Shimcache` entries on an alternative path
 * @param path Full path to SYSTEM file
 * @returns Array of `Shimcache` entries or `WindowsError`
 */
export function getAltShimcache(path: string): Shimcache[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_shimcache(path);

    const results: Shimcache[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "SHIMCACHE",
      `failed to parse shimcache at path ${path}: ${err}`,
    );
  }
}
