import { FileError } from "../../../filesystem/errors";
import { readTextFile } from "../../../filesystem/mod";
import { IosError } from "../../error";

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
