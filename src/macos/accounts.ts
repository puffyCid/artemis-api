import { Groups, Users } from "../../types/macos/accounts.d.ts";

/**
 * Function to parse the local `Users` on a macOS system
 * @returns Array of `Users`
 */
export function getUsers(): Users[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_users();

  const users: Users[] = JSON.parse(data);
  return users;
}

/**
 * Function to parse the local `Groups` on a macOS system
 * @returns Array of `Groups`
 */
export function getGroups(): Groups[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_groups();

  const groups: Groups[] = JSON.parse(data);
  return groups;
}
