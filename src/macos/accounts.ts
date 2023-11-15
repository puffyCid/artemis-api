import { Groups, Users } from "../../types/macos/accounts.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the local `Users` on a macOS system
 * @returns Array of `Users` or `MacosError`
 */
export function getUsers(): Users[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_users();

    const users: Users[] = JSON.parse(data);
    return users;
  } catch (err) {
    return new MacosError("ACCOUNTS", `failed to parse local users: ${err}`);
  }
}

/**
 * Function to parse the local `Groups` on a macOS system
 * @returns Array of `Groups` or `MacosError`
 */
export function getGroups(): Groups[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_groups();

    const groups: Groups[] = JSON.parse(data);
    return groups;
  } catch (err) {
    return new MacosError("ACCOUNTS", `failed to parse local groups: ${err}`);
  }
}
