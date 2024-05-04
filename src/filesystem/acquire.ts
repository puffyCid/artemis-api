import { Output } from "../system/output.ts";
import { FileError } from "./errors.ts";

/**
 * Function to acquire a file from the system
 * @param path Path to file to acquire
 * @param output `Output` structure to pass to artemis
 * @returns True on success or `SystemError`
 */
export function acquireFile(path: string, output: Output): boolean | FileError {
  try {
    const output_string = JSON.stringify(output);
    //@ts-ignore: Custom Artemis function
    const status: boolean = Deno.core.ops.js_acquire_file(
      path,
      output_string,
    );
    return status;
  } catch (err) {
    return new FileError(`ACQUIRE`, `failed to acquire file: ${err}`);
  }
}
