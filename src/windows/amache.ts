import { Amcache } from "../../types/windows/amcache.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse `Amcache` entries on the systemdrive
 * @returns Array of `Amcache` entries parsed from the sysystemdrive letter or `WindowsError`
 */
export function getAmcache(): Amcache[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const results: string = Deno.core.ops.get_amcache();

    const data: Amcache[] = JSON.parse(results);
    return data;
  } catch (err) {
    return new WindowsError("AMCACHE", `failed to parse amcache: ${err}`);
  }
}

/**
 * Function to parse `Amcache` entries at alternative path
 * @param path Full path to Amcache.hve file
 * @returns Array of `Amcache` entries or `WindowsError`
 */
export function getAltAmcache(path: string): Amcache[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const results: string = Deno.core.ops.get_alt_amcache(path);

    const data: Amcache[] = JSON.parse(results);
    return data;
  } catch (err) {
    return new WindowsError(
      "AMCACHE",
      `failed to parse amcache at ${path}: ${err}`,
    );
  }
}
