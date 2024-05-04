import { UnifiedLog } from "../../types/macos/unifiedlogs.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse a `Unified log` on a macOS system
 * @param path Full path to a Unified log file
 * @param archive_path Optional path to a logarchive style directory
 * @returns Array of `Unified log` entries or `MacosError`
 */
export function getUnifiedLog(
  path: string,
  archive_path?: string,
): UnifiedLog[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_unified_log(path, archive_path);

    const log_data: UnifiedLog[] = JSON.parse(data);
    return log_data;
  } catch (err) {
    return new MacosError("UNIFIEDLOGS", `failed to parse ${path}: ${err}`);
  }
}
