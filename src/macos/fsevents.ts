import { Fsevents } from "../../types/macos/fsevents.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `FsEvents` on a macOS system
 * @param path Full path to a `fsevents` file
 * @returns Array of `FsEvent` records or `MacosError`
 */
export function getFsevents(path: string): Fsevents[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_fsevents(path);
    const fsevents: Fsevents[] = JSON.parse(data);
    return fsevents;
  } catch (err) {
    return new MacosError(
      "FSEVENTS",
      `failed to parse fsevents ${path}: ${err}`,
    );
  }
}
