import { encode } from "../../../encoding/mod.ts";
import { FileError } from "../../../filesystem/errors.ts";
import { readFile } from "../../../filesystem/files.ts";
import { IosError } from "../../error.ts";

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
