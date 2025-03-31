import { FileError } from "../../../filesystem/errors";
import { readTextFile } from "../../../filesystem/mod";
import { IosError } from "../../error";

/**
 * Function to read the BugSnag breadcrumb json file
 * @param path Path to Breadcrumb JSON file
 * @returns JSON object or `IosError`
 */
export function readBreadcrumbs(
  path: string,
): Record<string, unknown> | IosError {
  const result = readTextFile(path);
  if (result instanceof FileError) {
    return new IosError(
      `BUGSNAG`,
      `failed to parse breadcrumb at ${path}: ${result}`,
    );
  }

  return JSON.parse(result);
}
