import { UserInfo } from "../../types/windows/users.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse Windows user entries
 * @returns Array of `UserInfo` entries or `WindowsError`
 */
export function getUsersWin(): UserInfo[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_users_windows();

    const results: UserInfo[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("USERS", `failed to parse users: ${err}`);
  }
}

/**
 * Function to parse Windows user entries on an alternative path
 * @param path Full path to SAM file
 * @returns Array of `UserInfo` entries or `WindowsError`
 */
export function getAltUsersWin(path: string): UserInfo[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_users_windows(path);

    const results: UserInfo[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "USERS",
      `failed to parse users at path ${path}: ${err}`,
    );
  }
}
