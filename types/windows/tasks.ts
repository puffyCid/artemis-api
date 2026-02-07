/**
 * `Schedule Tasks` are a common form of Persistence on Windows systems. There are two (2) types of `Task` files:
 *   - XML based `Task` files
 *   - Job based `Task` files
 *
 * Starting on Windows Vista and higher XML files are used for `Schedule Tasks`.
 *
 * References:
 *  - https://github.com/libyal/dtformats/blob/main/documentation/Job%20file%20format.asciidoc
 *  - https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-tsch/0d6383e4-de92-43e7-b0bb-a60cfa36379f
 */

/**
 * JSON representation of the Task XML schema.
 * Most of the schema is Optional. Only `Actions` is required
 */
export interface TaskXml {
  /**Registration Info about the Task */
  registrationInfo?: RegistrationInfo;
  /**Triggers that start the Task */
  triggers?: Triggers;
  /**Settings for the Task */
  settings?: Settings;
  /**Base64 encoded raw binary data associated with the Task */
  data?: string;
  /**Principal user information related to the Task */
  principals?: Principals;
  /**Actions executed by the Task */
  actions: Actions;
  /**Path to the XML file */
  path: string;
}

/**
 * Parsed information about the Job file
 */
export interface TaskJob {
  /**ID associated with the Task */
  job_id: string;
  /**Error retry count for the Task */
  error_retry_count: number;
  /**Error retry interval for the Task */
  error_retry_interval: number;
  /**Idle deadline for Task */
  idle_deadline: number;
  /**Idle wait for Task */
  idle_wait: number;
  /**Task Priority */
  priority: string;
  /**Max run time for Task */
  max_run_time: number;
  /**Task Exit code */
  exit_code: number;
  /**Task Status */
  status: string;
  /**Flags associated with Task */
  flags: string[];
  /**Last run time for Task in LOCALTIME */
  system_time: string;
  /**Running count for Task */
  running_instance_count: number;
  /**Application name associated with Task */
  application_name: string;
  /**Parameters for application */
  parameters: string;
  /**Working directory associated with Task */
  working_directory: string;
  /**Creator of Task */
  author: string;
  /**Comments associated with Task */
  comments: string;
  /**Base64 encoded User data associated with Task */
  user_data: string;
  /**Start Error associated with Task */
  start_error: number;
  /**Triggers that start the Task */
  triggers: JobTriggers[];
  /**Path to Job file */
  path: string;
}

/**
 * Triggers associated with Job file
 */
interface JobTriggers {
  /**Task start date */
  start_date: string;
  /**Task end date */
  end_date: string;
  /**Task start time */
  start_time: string;
  /**Task duration */
  duration: number;
  /**Task interval */
  interval_mins: number;
  /**Array of trigger flags */
  flags: string[];
  /**Array of trigger types */
  types: string[];
}

/**
 * Registration Info related to Task XML
 */
interface RegistrationInfo {
  /**URI associated with  */
  uri?: string;
  /**SID associated with Task */
  sid?: string;
  /**Source of Task */
  source?: string;
  /**Creation OR Modification of Task */
  date?: string;
  /**Creator of Task */
  author?: string;
  /**Version level of Task */
  version?: string;
  /**User-friendly description of Task */
  description?: string;
  /**URI of external documentation for Task */
  documentation?: string;
}

/**
 * Triggers that active the Task
 */
interface Triggers {
  /**Boot triggers for Task */
  boot: BootTrigger[];
  /**Registration triggers for Task. Format is exactly same as BootTrigger*/
  registration: BootTrigger[];
  /**Idle triggers for Task */
  idle: IdleTrigger[];
  /**Time triggers for Task */
  time: TimeTrigger[];
  /**Event triggers for Task */
  event: EventTrigger[];
  /**Logon triggers for Task */
  logon: LogonTrigger[];
  /**Session triggers for Task */
  session: SessionTrigger[];
  /**Calendar triggers for Task */
  calendar: CalendarTrigger[];
  /**Windows Notifications triggers for Task */
  wnf: WnfTrigger[];
}

/**
 * Most Triggers have a collection of common options
 */
interface BaseTriggers {
  /**ID for trigger */
  id?: string;
  /**Start date for Task */
  start_boundary?: string;
  /**End date for Task */
  end_boundary?: string;
  /**Bool value to activate Trigger */
  enabled?: boolean;
  /**Time limit for Task */
  execution_time_limit?: string;
  /**Repetition for Task */
  repetition?: Repetition;
}

/**
 * Repetition Options for Triggers
 */
interface Repetition {
  /**Trigger restart intervals */
  interval: string;
  /**Repetition can stop after duration has elapsed */
  duration?: string;
  /**Task can stop at end of duration */
  stop_at_duration_end?: boolean;
}

/**
 * Boot options to Trigger Task
 */
interface BootTrigger {
  /**Base Triggers associated with Boot */
  common?: BaseTriggers;
  /**Task delayed after boot */
  delay?: string;
}

/**
 * Idle options to Trigger Task
 */
interface IdleTrigger {
  /**Base Triggers associated with Idle */
  common?: BaseTriggers;
}

/**
 * Time options to Trigger Task
 */
interface TimeTrigger {
  /**Base Triggers associated with Time */
  common?: BaseTriggers;
  /**Delay time for `start_boundary` */
  random_delay?: string;
}

/**
 * Event options to Trigger Task
 */
interface EventTrigger {
  /**Base Triggers associated with Event */
  common?: BaseTriggers;
  /**Array of subscriptions that can Trigger the Task */
  subscription: string[];
  /**Delay to Trigger the Task */
  delay?: string;
  /**Trigger can start Task after `number_of_occurrences` */
  number_of_occurrences?: number;
  /**Trigger can start Task after `period_of_occurrence` */
  period_of_occurrence?: string;
  /**Specifies XML field name */
  matching_element?: string;
  /**Specifies set of XML elements */
  value_queries?: string[];
}

/**
 * Logon options to Trigger Task
 */
interface LogonTrigger {
  /**Base Triggers associated with Logon */
  common?: BaseTriggers;
  /**Account name associated with Logon Trigger */
  user_id?: string;
  /**Delay Logon Task Trigger */
  delay?: string;
}

/**
 * Session options to Trigger Task
 */
interface SessionTrigger {
  /**Base Triggers associated with Session */
  common?: BaseTriggers;
  /**Account name associated with Session Trigger */
  user_id?: string;
  /**Delay Session Task Trigger */
  delay?: string;
  /**Session change that Triggers Task */
  state_change?: string;
}

/**
 * Windows Notification options to Trigger Task
 */
interface WnfTrigger {
  /**Base Triggers associated with Windows Notification */
  common?: BaseTriggers;
  /**Notification State name */
  state_name: string;
  /**Delay Notification Trigger Task */
  delay?: string;
  /**Data associated with Notification Trigger */
  data?: string;
  /**Offset associated with Notification Trigger */
  data_offset?: string;
}

/**
 * Calendar Options to Trigger Task
 */
interface CalendarTrigger {
  /**Base Triggers associated with Calendar */
  common?: BaseTriggers;
  /**Delay Calendar Trigger Task */
  random_delay?: string;
  /**Run Task on every X number of days */
  schedule_by_day?: ByDay;
  /**Run Task on every X number of weeks */
  schedule_by_week?: ByWeek;
  /**Run Task on specific days of month */
  schedule_by_month?: ByMonth;
  /**Run Task on specific weeks on specific days */
  schedule_by_month_day_of_week?: ByMonthDayWeek;
}

/**
 * How often to run Task by days
 */
interface ByDay {
  /**Run Task on X number of days. Ex: Two (2) means every other day */
  days_interval?: number;
}

/**
 * How often to run Task by Weeks
 */
interface ByWeek {
  /**Run Task on X number of weeks. Ex: Two (2) means every other week */
  weeks_interval?: number;
  /**Runs on specified days of the week. Ex: Monday, Tuesday */
  days_of_week?: string[];
}

/**
 * How often to run Task by Months
 */
interface ByMonth {
  /**Days of month to run Task */
  days_of_month?: string[];
  /**Months to run Task. Ex: July, August */
  months?: string[];
}

/**How often to run Tasks by Months and Weeks */
interface ByMonthDayWeek {
  /**Weeks of month to run Task */
  weeks?: string[];
  /**Days of month to run Task */
  days_of_week?: string[];
  /**Months to run Task */
  months?: string[];
}

/**
 * Settings determine how to run Task Actions
 */
interface Settings {
  /**Start Task on demand */
  allow_start_on_demand?: boolean;
  /**Restart if fails */
  restart_on_failure?: RestartType;
  /**Determines how Windows handles multiple Task executions */
  multiple_instances_policy?: string;
  /**Disable Task on battery power */
  disallow_start_if_on_batteries?: boolean;
  /**Stop Task if going on battery power */
  stop_if_going_on_batteries?: boolean;
  /**Task can be terminated if time limits exceeded */
  allow_hard_terminate?: boolean;
  /**If scheduled time is missed, Task may be started */
  start_when_available?: boolean;
  /**Run based on network profile name */
  network_profile_name?: string;
  /**Run only if network connection available */
  run_only_if_network_available?: boolean;
  /**Wake system from standby or hibernate to run */
  wake_to_run?: boolean;
  /**Task is enabled */
  enabled?: boolean;
  /**Task is hidden from console or GUI */
  hidden?: boolean;
  /**Delete Task after specified duration and no future run times */
  delete_expired_tasks_after?: string;
  /**Options to run when Idle */
  idle_settings?: IdleSettings;
  /**Network settings to run */
  network_settings?: NetworkSettings;
  /**Task execution time limit */
  execution_time_limit?: string;
  /**Task Priority. Lowest is 1. Highest is 10 */
  priority?: number;
  /**Only run if system is Idle */
  run_only_if_idle?: boolean;
  /**Use unified scheduling engine to handle Task execution */
  use_unified_scheduling_engine?: boolean;
  /**Task is disabled on Remote App Sessions */
  disallow_start_on_remote_app_session?: boolean;
  /**Options to run Task during system maintenance periods */
  maintenance?: MaintenanceSettings;
  /**Task disabled on next OS startup */
  volatile?: boolean;
}

/**
 * Restart on failure options
 */
interface RestartType {
  /**Duration between restarts */
  interval: string;
  /**Number of restart attempts */
  count: number;
}

/**
 * Idle options
 */
interface IdleSettings {
  /**Task may be delayed up until specified duration */
  duration?: string;
  /**Task will wait for system to become idle */
  wait_timeout?: string;
  /**Task stops if system is no longer Idle */
  stop_on_idle_end?: boolean;
  /**Task restarts when system returns to Idle */
  restart_on_idle?: boolean;
}

/**
 * Network options
 */
interface NetworkSettings {
  /**Task runs only on specified network name */
  name?: string;
  /**GUID associated with `NetworkSettings` */
  id?: string;
}

/**
 * Maintenance options
 */
interface MaintenanceSettings {
  /**Duration of maintenance */
  period: string;
  /**Deadline for Task to run */
  deadline?: string;
  /**Task can run independently of other Tasks with `MaintenanceSettings` */
  exclusive?: boolean;
}

/**
 * SID data associated with Task
 */
interface Principals {
  /**Principal name for running the Task */
  user_id?: string;
  /**Determines if Task run on logon */
  logon_type?: string;
  /**Group ID associated with Task. Task can be triggered by anyone in Group ID */
  group_id?: string;
  /**Friendly name of the principal */
  display_name?: string;
  /**Privilege level of Task */
  run_level?: string;
  /**Process Token SID associated with Task */
  process_token_sid_type?: string;
  /**Array of privileges value */
  required_privileges?: string[];
  /**Unique user selected ID */
  id_attribute?: string;
}

/**
 * Actions run by the Task
 */
interface Actions {
  /**Executes one or more commands */
  exec: ExecType[];
  /**COM handler to execute */
  com_handler: ComHandlerType[];
  /**Send an email */
  send_email: SendEmail[];
  /**Display a message */
  show_message: Message[];
}

/**
 * Command options
 */
interface ExecType {
  /**Command to execute */
  command: string;
  /**Arguments for command */
  arguments?: string;
  /**Path to a directory */
  working_directory?: string;
}

/**
 * COM options
 */
interface ComHandlerType {
  /**COM GUID */
  class_id: string;
  /**XML data for COM */
  data?: string;
}

/**
 * SendEmail options
 */
interface SendEmail {
  /**Email server domain */
  server?: string;
  /**Subject of email */
  subject?: string;
  /**Who should received email */
  to?: string;
  /**Who should be CC'd */
  cc?: string;
  /**Who should be BCC'd */
  bcc?: string;
  /**Reply to email address */
  reply_to?: string;
  /**The sender email address */
  from: string;
  /**Custom header fields to include in email */
  header_fields?: Record<string, string>;
  /**Email message body */
  body?: string;
  /**List of files to be attached */
  attachment?: string[];
}

/**
 * Message options
 */
interface Message {
  /**Title of message */
  title?: string;
  /**Message body */
  body: string;
}
