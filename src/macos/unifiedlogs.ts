import { UnifiedLog } from "../../types/macos/unifiedlogs.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse a `Unified log` on a macOS system
 * @param path Full path to a Unified log file
 * @param meta `UnifiedLogMeta` data obtained from `setupSpotlightParser`
 * @returns Array of `Unified log` entries or `MacosError`
 */
export function getUnifiedLog(
  path: string,
  meta: Uint8Array,
): UnifiedLog[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_unified_log(path, meta);

    const log_data: UnifiedLog[] = JSON.parse(data);
    return log_data;
  } catch (err) {
    return new MacosError("UNIFIEDLOGS", `failed to parse ${path}: ${err}`);
  }
}

/**
 * Function to setup `UnifiedLog` parsing from the JS runtime. Must be called before you can call the function `getUnifiedLog`
 * @param path Optional path to a logarchive like directory. Otherwise will default to system paths
 * @returns `Uint8Array` of raw bytes related to UnifiedLog metadata
 */
export function setupUnifiedLogParser(path?: string): Uint8Array | MacosError {
  if (path === undefined) {
    path = "";
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data: Uint8Array = Deno.core.ops.setup_unified_log_parser(path);

    return data;
  } catch (err) {
    return new MacosError("UNIFIEDLOGS", `failed to parse ${path}: ${err}`);
  }
}
