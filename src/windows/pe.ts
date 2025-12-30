import { PeInfo } from "../../types/windows/pe";
import { WindowsError } from "./errors";

/**
 * Function to parse a `PE` executable.
 * @param path Full path to a `PE` file
 * @returns `PeInfo` object or `WindowsError`
 */
export function getPe(path: string): PeInfo | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data: PeInfo = js_get_pe(path);
    return data;
  } catch (err) {
    return new WindowsError("PE", `failed to parse PE file ${path}: ${err}`);
  }
}
