import { UserInfo } from "../../types/windows/users.d.ts";

/**
 * Function to parse Windows user entries
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter
 */
export function getUsersWin(): UserInfo[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_users();

  const results: UserInfo[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse Windows user entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter
 */
export function getAltUsersWin(drive: string): UserInfo[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_users(drive);

  const results: UserInfo[] = JSON.parse(data);
  return results;
}
