import { Shimcache } from "../../types/windows/shimcache.d.ts";

/**
 * Function to parse `Shimcache` entries on the systemdrive
 * @returns Array of `Shimcache` entries parsed from the sysystemdrive letter
 */
export function getShimcache(): Shimcache[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_shimcache();

  const results: Shimcache[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse `Shimcache` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `Shimcache` entries parsed from a Windows drive letter
 */
export function getAltShimcache(drive: string): Shimcache[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_shimcache(drive);

  const results: Shimcache[] = JSON.parse(data);
  return results;
}
