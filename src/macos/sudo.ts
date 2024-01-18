import { UnifiedLog } from "../../types/macos/unifiedlogs.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to get `sudo logs`
 * @returns Array of `sudo log` entries from macOS Unified Logs or `MacosError`
 */
export function getSudoLogs(): UnifiedLog[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_sudologs();

    const log_data: UnifiedLog[] = JSON.parse(data);
    return log_data;
  } catch (err) {
    return new MacosError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
  }
}
