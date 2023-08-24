import { Disks } from "../../types/systeminfo/systeminfo.d.ts";

/**
 * Function to get disk information on the system
 * @returns Array of `Disk` information
 */
export function disks(): Disks[] {
  //@ts-ignore: Custom Artemis function
  const data: string = systemInfo.disks();
  const disk: Disks[] = JSON.parse(data);
  return disk;
}
