import { UnifiedLog } from "../../types/macos/unifiedlogs.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to get `sudo logs`. Can provide an alternative directory containing logs. Otherwise will parse default log locations on macOS
 * @param logarchive_path Optional path to a directory containing unified log data. It should be formatted the same way as a logarchive
 * @returns Array of `sudo` entries from macOS Unified Logs or `MacosError`
 */
export function getSudoLogs(
  logarchive_path?: string,
): UnifiedLog[] | MacosError {
  let path = "";
  if (logarchive_path !== undefined) {
    path = logarchive_path;
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_sudologs(path);

    const log_data: UnifiedLog[] = JSON.parse(data);
    return log_data;
  } catch (err) {
    return new MacosError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
  }
}
