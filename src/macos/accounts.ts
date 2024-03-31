import { Groups, Users } from "../../types/macos/accounts.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the local `Users` on a macOS system
 * @param path Optional alternative path to users directory. If none provided will use default path
 * @returns Array of `Users` or `MacosError`
 */
export function getUsers(path?: string): Users[] | MacosError {
  let user_path = "/var/db/dslocal/nodes/Default/users";
  if (path != undefined) {
    user_path = path;
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_users_macs(user_path);

    const users: Users[] = JSON.parse(data);
    return users;
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
  let group_path = "/var/db/dslocal/nodes/Default/groups";
  if (path != undefined) {
    group_path = path;
  }
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_groups_macos(group_path);

    const groups: Groups[] = JSON.parse(data);
    return groups;
  } catch (err) {
    return new MacosError("ACCOUNTS", `failed to parse local groups: ${err}`);
  }
}
