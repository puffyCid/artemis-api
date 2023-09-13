import { Launchd } from "../../types/macos/launchd.d.ts";

/**
 * Function to parse `Launchd daemons` on a macOS system
 * @returns Array of `Launchd daemons` parsed from a plist file
 */
export function getLaunchdDaemons(): Launchd[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_launchd_daemons();
  const launchd_array: Launchd[] = JSON.parse(data);

  return launchd_array;
}

/**
 * Function to parse `Launchd agents` on a macOS system
 * @returns Array of `Launchd agents` parsed from a plist file
 */
export function getLaunchdAgents(): Launchd[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_launchd_agents();
  const launchd_array: Launchd[] = JSON.parse(data);

  return launchd_array;
}
