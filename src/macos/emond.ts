import { Emond } from "../../types/macos/emond";
import { MacosError } from "./errors";

/**
 * Function to parse the `Emond` rules on a macOS system
 * @param path Optional alternative path to emond directory. If none provided will use default path
 * @returns Array of `Emond` rules or `MacosError`
 */
export function getEmond(path?: string): Emond[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_emond(path);

    return data;
  } catch (err) {
    return new MacosError("EMOND", `failed to parse emond: ${err}`);
  }
}
