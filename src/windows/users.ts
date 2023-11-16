import { UserInfo } from "../../types/windows/users.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse Windows user entries
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter or `WindowsError`
 */
export function getUsersWin(): UserInfo[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_users();

    const results: UserInfo[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("USERS", `failed to parse users: ${err}`);
  }
}

/**
 * Function to parse Windows user entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter or `WindowsError`
 */
export function getAltUsersWin(drive: string): UserInfo[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_users(drive);

    const results: UserInfo[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "USERS",
      `failed to parse users at drive ${drive}: ${err}`,
    );
  }
}
