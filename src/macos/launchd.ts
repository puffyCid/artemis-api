import { Launchd } from "../../types/macos/launchd";
import { MacosError } from "./errors";

/**
 * Function to parse `Launchd daemons` on a macOS system
 * @returns Array of `Launchd daemons` or `MacosError`
 */
export function getLaunchdDaemons(): Launchd[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_launchd_daemons();

    return data;
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
    const data = js_launchd_agents();

    return data;
  } catch (err) {
    return new MacosError("LAUNCHD", `failed to parse launchd agents: ${err}`);
  }
}
