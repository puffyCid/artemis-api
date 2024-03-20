import { LoginItems } from "../../types/macos/loginitems.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `LoginItems` on a macOS system
 * @param path Optional alternative path to logintiem file. If none provided will parse default files
 * @returns Array of `LoginItems` or `MacosError`
 */
export function getLoginitems(path?: string): LoginItems[] | MacosError {
  let item_path = "";
  if (path != undefined) {
    item_path = path;
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_loginitems(item_path);

    const items: LoginItems[] = JSON.parse(data);
    return items;
  } catch (err) {
    return new MacosError("LOGINITEMS", `failed to parse loginitems: ${err}`);
  }
}
