/**
 * Parse the SAM Registry file and get user info
 */
export interface UserInfo {
  /**Last logon for account */
  last_logon: string;
  /**Time when password last set */
  password_last_set: string;
  /**Last password failure */
  last_password_failure: string;
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
