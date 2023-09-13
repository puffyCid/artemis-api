import { UnifiedLog } from "../../types/macos/unifiedlogs.d.ts";

/**
 * Function to parse a `Unified log` on a macOS system
 * @param path Full path to a Unified log file
 * @returns Array of `Unified log` entries
 */
export function getUnifiedLog(path: string): UnifiedLog[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_unified_log(path);

  const log_data: UnifiedLog[] = JSON.parse(data);
  return log_data;
}
