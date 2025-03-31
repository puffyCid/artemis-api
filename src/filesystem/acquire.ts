import { Output } from "../system/output";
import { FileError } from "./errors";

/**
 * Function to acquire a file from the system
 * @param path Path to file to acquire
 * @param output `Output` structure to pass to artemis
 * @returns True on success or `SystemError`
 */
export function acquireFile(path: string, output: Output): boolean | FileError {
  try {
    //@ts-ignore: Custom Artemis function
    const status: boolean = js_acquire_file(path, output);
    return status;
  } catch (err) {
    return new FileError(`ACQUIRE`, `failed to acquire file: ${err}`);
  }
}
