import { FileError } from "../../../filesystem/errors.ts";
import { readTextFile } from "../../../filesystem/mod.ts";
import { IosError } from "../../error.ts";

/**
 * Function to read the heartbeat metric file
 * @param path Path to Firebase heartbeat JSON file
 * @returns JSON object or `IosError`
 */
export function parseHeartbeat(
  path: string,
): Record<string, unknown> | IosError {
  const text = readTextFile(path);
  if (text instanceof FileError) {
    return new IosError(`FIREBASE`, `failed to read google heartbeat: ${text}`);
  }

  return JSON.parse(text);
}
