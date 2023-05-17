/**
 * Parse the SAM Registry file and get user info
 */
export interface UserInfo {
  /**Last logon for account */
  last_logon: number;
  /**Time when password last set in UNIXEPOCH seconds */
  password_last_set: number;
  /**Last password failure in UNIXEPOCH seconds */
  last_password_failure: number;
  /**Relative ID for account. Typically last number of SID */
  relative_id: number;
  /**Primary group ID for account */
  primary_group_id: number;
  /**UAC flags associated with account */
  user_account_control_flags: string[];
  /**Country code for account */
  country_code: number;
  /**Code page for account */
  code_page: number;
  /**Number of password failures associated with account */
  number_password_failures: number;
  /**Number of logons for account */
  number_logons: number;
  /**Username for account */
  username: string;
  /**SID for account */
  sid: string;
}

/**
 * Function to parse Windows user entries
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter
 */
export function get_users_win(): UserInfo[] {
  // Array of JSON objects
  const data = Deno[Deno.internal].core.ops.get_users();
  const user_array: UserInfo[] = JSON.parse(data);

  return user_array;
}

/**
 * Function to parse Windows user entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter
 */
export function get_alt_users_win(drive: string): UserInfo[] {
  // Array of JSON objects
  const data = Deno[Deno.internal].core.ops.get_alt_users(drive);
  const user_array: UserInfo[] = JSON.parse(data);

  return user_array;
}
