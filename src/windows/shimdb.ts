import { Shimdb } from "../../types/windows/shimdb.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse `ShimDB` entries on the systemdrive
 * @returns Array of `ShimDB` entries parsed from the sysystemdrive letter
 */
export function getShimdb(): Shimdb[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_shimdb();

  const results: Shimdb[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse `ShimDB` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `ShimDB` entries parsed from a Windows drive letter
 */
export function getAltShimdb(drive: string): Shimdb[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_shimdb(drive);

  const results: Shimdb[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse a custom SDB file. SDB files can exist anywhere on a Windows system
 * Will only read files less than 10MB in size (SDB files are typically only 1-5KB in size)
 * @param path full path to custom sdb file
 * @returns Shimdb info
 */
export function getCustomShimdb(path: string): Shimdb | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: string = Deno.core.ops.get_custom_shimdb(path);
    const results: Shimdb = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError('SHIMDB', `failed to parse sdb ${path}: ${err}`);
  }
}
