import { Shortcut } from "../../types/windows/shortcuts";
import { WindowsError } from "./errors";

/**
 * Function to parse a `Shortcut (lnk)` file
 * @param path Full path to `lnk` file
 * @returns `Shortcut` (lnk) info or `WindowsError`
 */
export function getLnkFile(path: string): Shortcut | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_lnk(path);

    return data;
  } catch (err) {
    return new WindowsError(
      "SHORTCUTS",
      `failed to parse shortcut ${path}: ${err}`,
    );
  }
}
