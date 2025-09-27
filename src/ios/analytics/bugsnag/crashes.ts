import { FileError } from "../../../filesystem/errors";
import { readTextFile } from "../../../filesystem/files";
import { IosError } from "../../error";

/**
 * Function to parse the BugSnag crash state json file.
 * @param path Path to crash state json file
 * @returns JSON object or `IosError`
 */
export function readCrashState(
  path: string,
): Record<string, unknown> | IosError {
  const result = readTextFile(path);
  if (result instanceof FileError) {
    return new IosError(
      `BUGSNAG`,
      `failed to read crash state at ${path}: ${result}`,
    );
  }

  return JSON.parse(result);
}
