import { Cpus } from "../../types/system/systeminfo";

/**
 * Function to get system CPU information
 * @returns Array of CPU information on system
 */
export function cpus(): Cpus[] {
  // @ts-expect-error: Custom Artemis function
  const data: Cpus[] = js_cpu();
  return data;
}
