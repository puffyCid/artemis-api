import { Groups, Users } from "../../types/macos/accounts";
import { MacosError } from "./errors";

/**
 * Function to parse the local `Users` on a macOS system
 * @param path Optional alternative path to users directory. If none provided will use default path
 * @returns Array of `Users` or `MacosError`
 */
export function getUsers(path?: string): Users[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_users_macos(path);

    return data;
  } catch (err) {
    return new MacosError("ACCOUNTS", `failed to parse local users: ${err}`);
  }
}

/**
 * Function to parse the local `Groups` on a macOS system
 * @param path Optional alternative path to groups directory. If none provided will use default path
 * @returns Array of `Groups` or `MacosError`
 */
export function getGroups(path?: string): Groups[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_groups_macos(path);

    return data;
  } catch (err) {
    return new MacosError("ACCOUNTS", `failed to parse local groups: ${err}`);
  }
}
