import { LoginItems } from "../../types/macos/loginitems.d.ts";

/**
 * Function to parse the `LoginItems` on a macOS system
 * @returns Array of `LoginItems`
 */
export function getLoginitems(): LoginItems[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_loginitems();

  const items: LoginItems[] = JSON.parse(data);
  return items;
}
