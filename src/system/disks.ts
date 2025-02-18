import { Disks } from "../../types/system/systeminfo.ts";

/**
 * Function to get disk information on the system
 * @returns Array of `Disk` information
 */
export function disks(): Disks[] {
  //@ts-ignore: Custom Artemis function
  const data: Disks[] = js_disks();
  return data;
}
