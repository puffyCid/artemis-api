import { UnifiedLog } from "../../types/macos/unifiedlogs";
import { MacosError } from "./errors";

/**
 * Function to get `sudo logs`. Can provide an alternative directory containing logs. Otherwise will parse default log locations on macOS
 * @param path Optional path to a directory containing unified log data. It should be formatted the same way as a logarchive
 * @returns Array of `sudo` entries from macOS Unified Logs or `MacosError`
 */
export function getSudoLogsMacos(
  path?: string,
): UnifiedLog[] | MacosError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_sudologs_macos(path);

    return data;
  } catch (err) {
    return new MacosError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
  }
}
