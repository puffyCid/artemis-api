import { Cpus } from "../../types/system/systeminfo.ts";

/**
 * Function to get system CPU information
 * @returns Array of CPU information on system
 */
export function cpus(): Cpus[] {
  //@ts-ignore: Custom Artemis function
  const data: Cpus[] = js_cpu();
  return data;
}
