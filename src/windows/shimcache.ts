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
 * Function to parse `Shimcache` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `Shimcache` entries parsed from a Windows drive letter or `WindowsError`
 */
export function getAltShimcache(drive: string): Shimcache[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_shimcache(drive);

    const results: Shimcache[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "SHIMCACHE",
      `failed to parse shimcache at drive ${drive}: ${err}`,
    );
  }
}
