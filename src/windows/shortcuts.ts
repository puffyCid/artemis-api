import { Shortcut } from "../../types/windows/shortcuts.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse a `Shortcut (lnk)` file
 * @param path Full path to `lnk` file
 * @returns `Shortcut` (lnk) info or `WindowsError`
 */
export function getLnkFile(path: string): Shortcut | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_lnk_file(path);

    const results: Shortcut = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "SHORTCUTS",
      `failed to parse shortcut ${path}: ${err}`,
    );
  }
}
