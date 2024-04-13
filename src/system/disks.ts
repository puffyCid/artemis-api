import { Disks } from "../../types/system/systeminfo.ts";

/**
 * Function to get disk information on the system
 * @returns Array of `Disk` information
 */
export function disks(): Disks[] {
  //@ts-ignore: Custom Artemis function
  const data: string = system.disks();
  const disk: Disks[] = JSON.parse(data);
  return disk;
}
