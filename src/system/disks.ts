import { Disks } from "../../types/system/systeminfo";

/**
 * Function to get disk information on the system
 * @returns Array of `Disk` information
 */
export function disks(): Disks[] {
  // @ts-expect-error: Custom Artemis function
  const data: Disks[] = js_disks();
  return data;
}
