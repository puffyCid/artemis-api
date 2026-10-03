import { Launchd } from "../../types/macos/launchd";
import { MacosError } from "./errors";

/**
 * Function to parse `Launchd daemons` on a macOS system
 * @returns Array of `Launchd daemons` or `MacosError`
 */
export function getLaunchd(): Launchd[] | MacosError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_launchd();

    return data;
  } catch (err) {
    return new MacosError("LAUNCHD", `failed to parse launchd daemons: ${err}`);
  }
}
