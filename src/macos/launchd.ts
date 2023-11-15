import { Launchd } from "../../types/macos/launchd.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse `Launchd daemons` on a macOS system
 * @returns Array of `Launchd daemons` or `MacosError`
 */
export function getLaunchdDaemons(): Launchd[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_launchd_daemons();
    const launchd_array: Launchd[] = JSON.parse(data);

    return launchd_array;
  } catch (err) {
    return new MacosError("LAUNCHD", `failed to parse launchd daemons: ${err}`);
  }
}

/**
 * Function to parse `Launchd agents` on a macOS system
 * @returns Array of `Launchd agents` or `MacosError`
 */
export function getLaunchdAgents(): Launchd[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_launchd_agents();
    const launchd_array: Launchd[] = JSON.parse(data);

    return launchd_array;
  } catch (err) {
    return new MacosError("LAUNCHD", `failed to parse launchd agents: ${err}`);
  }
}
