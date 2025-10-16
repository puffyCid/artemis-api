import { UserInfo } from "../../types/windows/users";
import { WindowsError } from "./errors";

/**
 * Function to parse Windows user entries
 * @param path Optional path to SAM file
 * @returns Array of `UserInfo` entries or `WindowsError`
 */
export function getUsersWin(path?: string): UserInfo[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_users_windows(path);
    return data;
  } catch (err) {
    return new WindowsError("USERS", `failed to parse users: ${err}`);
  }
}
