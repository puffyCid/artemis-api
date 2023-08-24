import { Cpus } from "../../types/systeminfo/systeminfo.d.ts";

/**
 * Function to get system CPU information
 * @returns Array of CPU information on system
 */
export function cpus(): Cpus[] {
  //@ts-ignore: Custom Artemis function
  const data: string = systemInfo.disks();
  const cpu: Cpus[] = JSON.parse(data);
  return cpu;
}
