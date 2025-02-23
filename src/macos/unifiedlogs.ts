import { UnifiedLog } from "../../types/macos/unifiedlogs.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse a `Unified log` on a macOS system
 * @param path Full path to a Unified log file
 * @param archive_path Optional path to a logarchive style directory containing the Unified Log metadata
 * @returns Array of `Unified log` entries or `MacosError`
 */
export function getUnifiedLog(
  path: string,
  archive_path?: string,
): UnifiedLog[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_unified_log(path, archive_path);

    return data;
  } catch (err) {
    return new MacosError("UNIFIEDLOGS", `failed to parse ${path}: ${err}`);
  }
}
