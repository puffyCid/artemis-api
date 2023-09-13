/**
 * macOS `Emond` (Event Monitor) can be used as persistence on a system.
 * A user can create `Emond` rules to execute commands on macOS.
 *
 * Starting on Ventura `Emond` was removed
 *
 * References:
 *  - https://www.xorrior.com/emond-persistence/
 */
export interface Emond {
  /**Name of `Emond` rule */
  name: string;
  /**Is rule enabled */
  enabled: boolean;
  /**Event types associated with the rule */
  event_types: string[];
  /**Start time of the rule */
  start_tiem: string;
  /**If partial criteria match should trigger the rule */
  allow_partial_criterion_match: boolean;
  /**Array of commad actions if rule is triggered */
  command_actions: Command[];
  /**Array of log actions if rule is triggered  */
  log_actions: Log[];
  /**Array of send email actions if rule is triggered */
  send_email_actions: SendEmailSms[];
  /**Array of send sms actions if rule is triggered. Has same structure as send email */
  send_sms_actions: SendEmailSms[];
  /**Criteria for the `Emond` rule */
  criterion: Record<string, unknown>[];
  /**Variables associated with the criterion  */
  variables: Record<string, unknown>[];
  /**If the emond client is enabled */
  emond_clients_enabled: boolean;
}

/**
 * Commands to execute if rule is triggered
 */
interface Command {
  /**Command name */
  command: string;
  /**User associated with command */
  user: string;
  /**Group associated with command */
  group: string;
  /**Arguments associated with command */
  arguments: string[];
}

/**
 * Log settings if rule is triggered
 */
interface Log {
  /**Log message content */
  message: string;
  /**Facility associated with log action */
  facility: string;
  /**Level of log */
  log_level: string;
  /**Log type */
  log_type: string;
  /**Parameters associated with log action */
  parameters: Record<string, unknown>;
}

/**
 * Email or SMS to send if rule is triggered
 */
interface SendEmailSms {
  /**Content of the email/sms */
  message: string;
  /**Subject of the email/sms */
  subject: string;
  /**Path to local binary */
  localization_bundle_path: string;
  /**Remote URL to send the message */
  relay_host: string;
  /**Email associated with email/sms action */
  admin_email: string;
  /**Targerts to receive email/sms */
  recipient_addresses: string[];
}
