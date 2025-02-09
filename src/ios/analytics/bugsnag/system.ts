import { FileError } from "../../../filesystem/errors.ts";
import { readTextFile } from "../../../filesystem/mod.ts";
import { IosError } from "../../error.ts";

/**
 * Function to read the BugSnag system json file
 * @param path Path to system_state.json JSON file
 * @returns JSON object or `IosError`
 */
export function readSystemState(
  path: string,
): Record<string, unknown> | IosError {
  const result = readTextFile(path);
  if (result instanceof FileError) {
    return new IosError(
      `BUGSNAG`,
      `failed to read system state at ${path}: ${result}`,
    );
  }

  return JSON.parse(result);
}
