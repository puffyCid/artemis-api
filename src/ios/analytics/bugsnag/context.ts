import { encode } from "../../../encoding/mod";
import { FileError } from "../../../filesystem/errors";
import { readFile } from "../../../filesystem/files";
import { IosError } from "../../error";

/**
 * Function to read the `run_context` binary file. Seems to only contain a UUID string
 * @param path Path to `run_context` binary file
 * @returns Base64 blob or `IosError`
 */
export function readRunContext(path: string): string | IosError {
  const bytes = readFile(path);
  if (bytes instanceof FileError) {
    return new IosError(
      `BUGSNAG`,
      `failed to read run context file at ${path}: ${bytes}`,
    );
  }

  return encode(bytes);
}
