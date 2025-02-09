"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[6507],{543:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>d,contentTitle:()=>o,default:()=>g,frontMatter:()=>a,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"Artifacts/Windows Artfacts/tasks","title":"Scheduled Tasks","description":"Scheduled Tasks setup on Windows","source":"@site/docs/Artifacts/Windows Artfacts/tasks.md","sourceDirName":"Artifacts/Windows Artfacts","slug":"/Artifacts/Windows Artfacts/tasks","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/tasks","draft":false,"unlisted":false,"editUrl":"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Artifacts/Windows Artfacts/tasks.md","tags":[],"version":"current","lastUpdatedBy":"puffyCid","lastUpdatedAt":1739135633000,"frontMatter":{"description":"Scheduled Tasks setup on Windows","keywords":["windows","binary","plaintext","persistence"]},"sidebar":"artemisArtifacts","previous":{"title":"SystemInfo","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/systeminfo"},"next":{"title":"User Access Log","permalink":"/artemis-api/docs/Artifacts/Windows Artfacts/ual"}}');var i=t(4848),r=t(8453);const a={description:"Scheduled Tasks setup on Windows",keywords:["windows","binary","plaintext","persistence"]},o="Scheduled Tasks",d={},c=[];function l(n){const e={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"scheduled-tasks",children:"Scheduled Tasks"})}),"\n",(0,i.jsxs)(e.p,{children:["Windows ",(0,i.jsx)(e.code,{children:"Scheduled Tasks"})," are a common form of persistence on Windows systems.\nThere are two (2) types of ",(0,i.jsx)(e.code,{children:"Scheduled Task"})," files:"]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"XML based files"}),"\n",(0,i.jsx)(e.li,{children:"Job based files"}),"\n"]}),"\n",(0,i.jsxs)(e.p,{children:["artemis supports both formats. Starting on Windows Vista and higher XML files\nare used for ",(0,i.jsx)(e.code,{children:"Scheduled Tasks"}),"."]}),"\n",(0,i.jsx)(e.p,{children:"Other Parsers:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Any XML reader"}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://docs.velociraptor.app/artifact_references/pages/windows.system.taskscheduler/",children:"Velociraptor"}),"\n(Only supports XML ",(0,i.jsx)(e.code,{children:"Scheduled Tasks"}),")"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"References:"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/libyal/dtformats/blob/main/documentation/Job%20file%20format.asciidoc",children:"Libyal"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-tsch/0d6383e4-de92-43e7-b0bb-a60cfa36379f",children:"Microsoft"})}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"toml-collection",children:"TOML Collection"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "tasks_collection"\ndirectory = "./tmp"\nformat = "jsonl"\ncompress = false\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "local"\n\n[[artifacts]]\nartifact_name = "tasks"\n[artifacts.tasks]\n# Optional\n# alt_file = "C:\\\\Artifacts\\\\At1.job"\n'})}),"\n",(0,i.jsx)(e.h1,{id:"collection-options",children:"Collection Options"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"alt_file"})," Full path to alternative Schedule Task file. This configuration is\n",(0,i.jsx)(e.strong,{children:"optional"}),". By default artemis will parse all Schedule Task files at their\ndefault location."]}),"\n"]}),"\n",(0,i.jsx)(e.h1,{id:"output-structure",children:"Output Structure"}),"\n",(0,i.jsxs)(e.p,{children:["Collection of ",(0,i.jsx)(e.code,{children:"TaskData"})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-typescript",children:"export interface TaskData {\n  /**Array of `TaskXml` parsed XML files */\n  tasks: TaskXml[];\n  /**Array of `TaskJob` parsed Job files */\n  jobs: TaskJob[];\n}\n\n/**\n * JSON representation of the Task XML schema.\n * Most of the schema is Optional. Only `Actions` is required\n */\nexport interface TaskData {\n  /**Array of `TaskXml` parsed XML files */\n  tasks: TaskXml[];\n  /**Array of `TaskJob` parsed Job files */\n  jobs: TaskJob[];\n}\n\n/**\n * JSON representation of the Task XML schema.\n * Most of the schema is Optional. Only `Actions` is required\n */\nexport interface TaskXml {\n  /**Registration Info about the Task */\n  registrationInfo?: RegistrationInfo;\n  /**Triggers that start the Task */\n  triggers?: Triggers;\n  /**Settings for the Task */\n  settings?: Settings;\n  /**Base64 encoded raw binary data associated with the Task */\n  data?: string;\n  /**Principal user information related to the Task */\n  principals?: Principals;\n  /**Actions executed by the Task */\n  actions: Actions;\n  /**Path to the XML file */\n  path: string;\n}\n\n/**\n * Parsed information about the Job file\n */\nexport interface TaskJob {\n  /**ID associated with the Task */\n  job_id: string;\n  /**Error retry count for the Task */\n  error_retry_count: number;\n  /**Error retry interval for the Task */\n  error_retry_interval: number;\n  /**Idle deadline for Task */\n  idle_deadline: number;\n  /**Idle wait for Task */\n  idle_wait: number;\n  /**Task Priority */\n  priority: string;\n  /**Max run time for Task */\n  max_run_time: number;\n  /**Task Exit code */\n  exit_code: number;\n  /**Task Status */\n  status: string;\n  /**Flags associated with Task */\n  flags: string[];\n  /**Last run time for Task in LOCALTIME */\n  system_time: string;\n  /**Running count for Task */\n  running_instance_count: number;\n  /**Application name associated with Task */\n  application_name: string;\n  /**Parameters for application */\n  parameters: string;\n  /**Working directory associated with Task */\n  working_directory: string;\n  /**Creator of Task */\n  author: string;\n  /**Comments associated with Task */\n  comments: string;\n  /**Base64 encoded User data associated with Task */\n  user_data: string;\n  /**Start Error associated with Task */\n  start_error: number;\n  /**Triggers that start the Task */\n  triggers: JobTriggers[];\n  /**Path to Job file */\n  path: string;\n}\n\n/**\n * Triggers associated with Job file\n */\ninterface JobTriggers {\n  /**Task start date */\n  start_date: string;\n  /**Task end date */\n  end_date: string;\n  /**Task start time */\n  start_time: string;\n  /**Task duration */\n  duration: number;\n  /**Task interval */\n  interval_mins: number;\n  /**Array of trigger flags */\n  flags: string[];\n  /**Array of trigger types */\n  types: string[];\n}\n\n/**\n * Registration Info related to Task XML\n */\ninterface RegistrationInfo {\n  /**URI associated with  */\n  uri?: string;\n  /**SID associated with Task */\n  sid?: string;\n  /**Source of Task */\n  source?: string;\n  /**Creation OR Modification of Task */\n  date?: string;\n  /**Creator of Task */\n  author?: string;\n  /**Version level of Task */\n  version?: string;\n  /**User-friendly description of Task */\n  description?: string;\n  /**URI of external documentation for Task */\n  documentation?: string;\n}\n\n/**\n * Triggers that active the Task\n */\ninterface Triggers {\n  /**Boot triggers for Task */\n  boot: BootTrigger[];\n  /**Registration triggers for Task. Format is exactly same as BootTrigger*/\n  registration: BootTrigger[];\n  /**Idle triggers for Task */\n  idle: IdleTrigger[];\n  /**Time triggers for Task */\n  time: TimeTrigger[];\n  /**Event triggers for Task */\n  event: EventTrigger[];\n  /**Logon triggers for Task */\n  logon: LogonTrigger[];\n  /**Session triggers for Task */\n  session: SessionTrigger[];\n  /**Calendar triggers for Task */\n  calendar: CalendarTrigger[];\n  /**Windows Notifications triggers for Task */\n  wnf: WnfTrigger[];\n}\n\n/**\n * Most Triggers have a collection of common options\n */\ninterface BaseTriggers {\n  /**ID for trigger */\n  id?: string;\n  /**Start date for Task */\n  start_boundary?: string;\n  /**End date for Task */\n  end_boundary?: string;\n  /**Bool value to activate Trigger */\n  enabled?: boolean;\n  /**Time limit for Task */\n  execution_time_limit?: string;\n  /**Repetition for Task */\n  repetition?: Repetition;\n}\n\n/**\n * Repetition Options for Triggers\n */\ninterface Repetition {\n  /**Trigger restart intervals */\n  interval: string;\n  /**Repetition can stop after duration has elapsed */\n  duration?: string;\n  /**Task can stop at end of duration */\n  stop_at_duration_end?: boolean;\n}\n\n/**\n * Boot options to Trigger Task\n */\ninterface BootTrigger {\n  /**Base Triggers associated with Boot */\n  common?: BaseTriggers;\n  /**Task delayed after boot */\n  delay?: string;\n}\n\n/**\n * Idle options to Trigger Task\n */\ninterface IdleTrigger {\n  /**Base Triggers associated with Idle */\n  common?: BaseTriggers;\n}\n\n/**\n * Time options to Trigger Task\n */\ninterface TimeTrigger {\n  /**Base Triggers associated with Time */\n  common?: BaseTriggers;\n  /**Delay time for `start_boundary` */\n  random_delay?: string;\n}\n\n/**\n * Event options to Trigger Task\n */\ninterface EventTrigger {\n  /**Base Triggers associated with Event */\n  common?: BaseTriggers;\n  /**Array of subscriptions that can Trigger the Task */\n  subscription: string[];\n  /**Delay to Trigger the Task */\n  delay?: string;\n  /**Trigger can start Task after `number_of_occurrences` */\n  number_of_occurrences?: number;\n  /**Trigger can start Task after `period_of_occurrence` */\n  period_of_occurrence?: string;\n  /**Specifies XML field name */\n  matching_element?: string;\n  /**Specifies set of XML elements */\n  value_queries?: string[];\n}\n\n/**\n * Logon options to Trigger Task\n */\ninterface LogonTrigger {\n  /**Base Triggers associated with Logon */\n  common?: BaseTriggers;\n  /**Account name associated with Logon Trigger */\n  user_id?: string;\n  /**Delay Logon Task Trigger */\n  delay?: string;\n}\n\n/**\n * Session options to Trigger Task\n */\ninterface SessionTrigger {\n  /**Base Triggers associated with Session */\n  common?: BaseTriggers;\n  /**Account name associated with Session Trigger */\n  user_id?: string;\n  /**Delay Session Task Trigger */\n  delay?: string;\n  /**Session change that Triggers Task */\n  state_change?: string;\n}\n\n/**\n * Windows Notification options to Trigger Task\n */\ninterface WnfTrigger {\n  /**Base Triggers associated with Windows Notification */\n  common?: BaseTriggers;\n  /**Notification State name */\n  state_name: string;\n  /**Delay Notification Trigger Task */\n  delay?: string;\n  /**Data associated with Notification Trigger */\n  data?: string;\n  /**Offset associated with Notification Trigger */\n  data_offset?: string;\n}\n\n/**\n * Calendar Options to Trigger Task\n */\ninterface CalendarTrigger {\n  /**Base Triggers associated with Calendar */\n  common?: BaseTriggers;\n  /**Delay Calendar Trigger Task */\n  random_delay?: string;\n  /**Run Task on every X number of days */\n  schedule_by_day?: ByDay;\n  /**Run Task on every X number of weeks */\n  schedule_by_week?: ByWeek;\n  /**Run Task on specific days of month */\n  schedule_by_month?: ByMonth;\n  /**Run Task on specific weeks on specific days */\n  schedule_by_month_day_of_week?: ByMonthDayWeek;\n}\n\n/**\n * How often to run Task by days\n */\ninterface ByDay {\n  /**Run Task on X number of days. Ex: Two (2) means every other day */\n  days_interval?: number;\n}\n\n/**\n * How often to run Task by Weeks\n */\ninterface ByWeek {\n  /**Run Task on X number of weeks. Ex: Two (2) means every other week */\n  weeks_interval?: number;\n  /**Runs on specified days of the week. Ex: Monday, Tuesday */\n  days_of_week?: string[];\n}\n\n/**\n * How often to run Task by Months\n */\ninterface ByMonth {\n  /**Days of month to run Task */\n  days_of_month?: string[];\n  /**Months to run Task. Ex: July, August */\n  months?: string[];\n}\n\n/**How often to run Tasks by Months and Weeks */\ninterface ByMonthDayWeek {\n  /**Weeks of month to run Task */\n  weeks?: string[];\n  /**Days of month to run Task */\n  days_of_week?: string[];\n  /**Months to run Task */\n  months?: string[];\n}\n\n/**\n * Settings determine how to run Task Actions\n */\ninterface Settings {\n  /**Start Task on demand */\n  allow_start_on_demand?: boolean;\n  /**Restart if fails */\n  restart_on_failure?: RestartType;\n  /**Determines how Windows handles multiple Task executions */\n  multiple_instances_policy?: string;\n  /**Disable Task on battery power */\n  disallow_start_if_on_batteries?: boolean;\n  /**Stop Task if going on battery power */\n  stop_if_going_on_batteries?: boolean;\n  /**Task can be terminated if time limits exceeded */\n  allow_hard_terminate?: boolean;\n  /**If scheduled time is missed, Task may be started */\n  start_when_available?: boolean;\n  /**Run based on network profile name */\n  network_profile_name?: string;\n  /**Run only if network connection available */\n  run_only_if_network_available?: boolean;\n  /**Wake system from standby or hibernate to run */\n  wake_to_run?: boolean;\n  /**Task is enabled */\n  enabled?: boolean;\n  /**Task is hidden from console or GUI */\n  hidden?: boolean;\n  /**Delete Task after specified duration and no future run times */\n  delete_expired_tasks_after?: string;\n  /**Options to run when Idle */\n  idle_settings?: IdleSettings;\n  /**Network settings to run */\n  network_settings?: NetworkSettings;\n  /**Task execution time limit */\n  execution_time_limit?: string;\n  /**Task Priority. Lowest is 1. Highest is 10 */\n  priority?: number;\n  /**Only run if system is Idle */\n  run_only_if_idle?: boolean;\n  /**Use unified scheduling engine to handle Task execution */\n  use_unified_scheduling_engine?: boolean;\n  /**Task is disabled on Remote App Sessions */\n  disallow_start_on_remote_app_session?: boolean;\n  /**Options to run Task during system maintenance periods */\n  maintenance?: MaintenanceSettings;\n  /**Task disabled on next OS startup */\n  volatile?: boolean;\n}\n\n/**\n * Restart on failure options\n */\ninterface RestartType {\n  /**Duration between restarts */\n  interval: string;\n  /**Number of restart attempts */\n  count: number;\n}\n\n/**\n * Idle options\n */\ninterface IdleSettings {\n  /**Task may be delayed up until specified duration */\n  duration?: string;\n  /**Task will wait for system to become idle */\n  wait_timeout?: string;\n  /**Task stops if system is no longer Idle */\n  stop_on_idle_end?: boolean;\n  /**Task restarts when system returns to Idle */\n  restart_on_idle?: boolean;\n}\n\n/**\n * Network options\n */\ninterface NetworkSettings {\n  /**Task runs only on specified network name */\n  name?: string;\n  /**GUID associated with `NetworkSettings` */\n  id?: string;\n}\n\n/**\n * Maintenance options\n */\ninterface MaintenanceSettings {\n  /**Duration of maintenance */\n  period: string;\n  /**Deadline for Task to run */\n  deadline?: string;\n  /**Task can run independently of other Tasks with `MaintenanceSettings` */\n  exclusive?: boolean;\n}\n\n/**\n * SID data associated with Task\n */\ninterface Principals {\n  /**Principal name for running the Task */\n  user_id?: string;\n  /**Determines if Task run on logon */\n  logon_type?: string;\n  /**Group ID associated with Task. Task can be triggered by anyone in Group ID */\n  group_id?: string;\n  /**Friendly name of the principal */\n  display_name?: string;\n  /**Privilege level of Task */\n  run_level?: string;\n  /**Process Token SID associated with Task */\n  process_token_sid_type?: string;\n  /**Array of privileges value */\n  required_privileges?: string[];\n  /**Unique user selected ID */\n  id_attribute?: string;\n}\n\n/**\n * Actions run by the Task\n */\ninterface Actions {\n  /**Executes one or more commands */\n  exec: ExecType[];\n  /**COM handler to execute */\n  com_handler: ComHandlerType[];\n  /**Send an email */\n  send_email: SendEmail[];\n  /**Display a message */\n  show_message: Message[];\n}\n\n/**\n * Command options\n */\ninterface ExecType {\n  /**Command to execute */\n  command: string;\n  /**Arguments for command */\n  arguments?: string;\n  /**Path to a directory */\n  working_directory?: string;\n}\n\n/**\n * COM options\n */\ninterface ComHandlerType {\n  /**COM GUID */\n  class_id: string;\n  /**XML data for COM */\n  data?: string;\n}\n\n/**\n * SendEmail options\n */\ninterface SendEmail {\n  /**Email server domain */\n  server?: string;\n  /**Subject of email */\n  subject?: string;\n  /**Who should received email */\n  to?: string;\n  /**Who should be CC'd */\n  cc?: string;\n  /**Who should be BCC'd */\n  bcc?: string;\n  /**Reply to email address */\n  reply_to?: string;\n  /**The sender email address */\n  from: string;\n  /**Custom header fields to include in email */\n  header_fields?: Record<string, string>;\n  /**Email message body */\n  body?: string;\n  /**List of files to be attached */\n  attachment?: string[];\n}\n\n/**\n * Message options\n */\ninterface Message {\n  /**Title of message */\n  title?: string;\n  /**Message body */\n  body: string;\n}\n"})})]})}function g(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(l,{...n})}):l(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>a,x:()=>o});var s=t(6540);const i={},r=s.createContext(i);function a(n){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);