import { Memory } from "../../types/systeminfo/systeminfo.d.ts";

/**
 * Function to get memory information
 * @returns `Memory` information on the system
 */
export function memory(): Memory {
  //@ts-ignore: Custom Artemis function
  const data: string = systemInfo.disks();
  const mem: Memory = JSON.parse(data);
  return mem;
}
