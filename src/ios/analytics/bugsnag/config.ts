import { FileError } from "../../../filesystem/errors";
import { readTextFile } from "../../../filesystem/mod";
import { IosError } from "../../error";

/**
 * Function to parse the BugSnag config.json file.
 * @param path Path to crash config.json file
 * @returns JSON object or `IosError`
 */
export function readConfig(
  path: string,
): Record<string, unknown> | IosError {
  const result = readTextFile(path);
  if (result instanceof FileError) {
    return new IosError(
      `BUGSNAG`,
      `failed to read config at ${path}: ${result}`,
    );
  }

  return JSON.parse(result);
}
