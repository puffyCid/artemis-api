import { PeInfo } from "../../types/windows/pe.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse a `pe` executable.
 * @param path Full path to a `pe` file
 * @returns Basic `PeInfo` interface or `WindowsError`
 */
export function getPe(path: string): PeInfo | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: string = Deno.core.ops.get_pe(path);
    const result: PeInfo = JSON.parse(data);
    return result;
  } catch (err) {
    return new WindowsError("PE", `failed to parse pe file ${path}: ${err}`);
  }
}
