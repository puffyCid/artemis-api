import { LoginItems } from "../../types/macos/loginitems.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `LoginItems` on a macOS system
 * @returns Array of `LoginItems` or `MacosError`
 */
export function getLoginitems(): LoginItems[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_loginitems();

    const items: LoginItems[] = JSON.parse(data);
    return items;
  } catch (err) {
    return new MacosError("LOGINITEMS", `failed to parse loginitems: ${err}`);
  }
}
