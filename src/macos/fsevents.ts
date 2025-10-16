import { Fsevents } from "../../types/macos/fsevents";
import { MacosError } from "./errors";

/**
 * Function to parse the `FsEvents` on a macOS system
 * @param path Full path to a `fsevents` file
 * @returns Array of `FsEvent` records or `MacosError`
 */
export function getFsevents(path: string): Fsevents[] | MacosError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_fsevents(path);
    return data;
  } catch (err) {
    return new MacosError(
      "FSEVENTS",
      `failed to parse fsevents ${path}: ${err}`,
    );
  }
}
