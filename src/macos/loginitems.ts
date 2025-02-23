import { LoginItems } from "../../types/macos/loginitems.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `LoginItems` on a macOS system
 * @param path Optional alternative path to logintiem file. If none provided will parse default files
 * @returns Array of `LoginItems` or `MacosError`
 */
export function getLoginitems(path?: string): LoginItems[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_loginitems(path);

    return data;
  } catch (err) {
    return new MacosError("LOGINITEMS", `failed to parse loginitems: ${err}`);
  }
}
