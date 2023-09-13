import { Amcache } from "../../types/windows/amcache.d.ts";

/**
 * Function to parse `Amcache` entries on the systemdrive
 * @returns Array of `Amcache` entries parsed from the sysystemdrive letter
 */
export function getAmcache(): Amcache[] {
  //@ts-ignore: Custom Artemis function
  const results: string = Deno.core.ops.get_amcache();

  const data: Amcache[] = JSON.parse(results);
  return data;
}

/**
 * Function to parse `Amcache` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `Amcache` entries parsed from a Windows drive letter
 */
export function getAltAmcache(drive: string): Amcache[] {
  //@ts-ignore: Custom Artemis function
  const results: string = Deno.core.ops.get_alt_amcache(drive);

  const data: Amcache[] = JSON.parse(results);
  return data;
}
