import { UnifiedLog } from "../../types/macos/unifiedlogs.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse a `Unified log` on a macOS system
 * @param path Full path to a Unified log file
 * @returns Array of `Unified log` entries or `MacosError`
 */
export function getUnifiedLog(path: string): UnifiedLog[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_unified_log(path);

    const log_data: UnifiedLog[] = JSON.parse(data);
    return log_data;
  } catch (err) {
    return new MacosError("UNIFIEDLOGS", `failed to parse ${path}: ${err}`);
  }
}
