import { Amcache } from "../../types/windows/amcache.d.ts";
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
 * Function to parse `Amcache` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `Amcache` entries parsed from a Windows drive letter or `WindowsError`
 */
export function getAltAmcache(drive: string): Amcache[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const results: string = Deno.core.ops.get_alt_amcache(drive);

    const data: Amcache[] = JSON.parse(results);
    return data;
  } catch (err) {
    return new WindowsError(
      "AMCACHE",
      `failed to parse amcache at ${drive}: ${err}`,
    );
  }
}
