import { FileError } from "../../../filesystem/errors";
import { readTextFile } from "../../../filesystem/mod";
import { IosError } from "../../error";

/**
 * Function to parse the BugSnag state json file.
 * @param path Path to state json file
 * @returns JSON object or `IosError`
 */
export function readState(
  path: string,
): Record<string, unknown> | IosError {
  const result = readTextFile(path);
  if (result instanceof FileError) {
    return new IosError(
      `BUGSNAG`,
      `failed to read state at ${path}: ${result}`,
    );
  }

  return JSON.parse(result);
}
