/**
 * Windows `EventLogs` are the primary files associated with logging with system activity.
 * They are stored in a binary format, typically at C:\Windows\System32\winevt\Logs
 */
export interface EventLogRecord {
  /**Event record number */
  event_record_id: number;
  /**Timestamp of eventlog message */
  timestamp: string;
  /**
   * JSON object representation of the Eventlog message
   * Depending on the log the JSON object may have different types of keys
   * Example entry:
   * ```
   * "data": {
   *     "Event": {
   *         "#attributes": {
   *             "xmlns": "http://schemas.microsoft.com/win/2004/08/events/event"
   *         },
   *         "System": {
   *            "Provider": {
   *               "#attributes": {
   *                   "Name": "Microsoft-Windows-Bits-Client",
   *                   "Guid": "EF1CC15B-46C1-414E-BB95-E76B077BD51E"
   *                 }
   *             },
   *             "EventID": 3,
   *             "Version": 3,
   *             "Level": 4,
   *             "Task": 0,
   *             "Opcode": 0,
   *             "Keywords": "0x4000000000000000",
   *             "TimeCreated": {
   *                 "#attributes": {
   *                   "SystemTime": "2022-10-31T04:24:19.946430Z"
   *                  }
   *              },
   *             "EventRecordID": 2,
   *             "Correlation": null,
   *             "Execution": {
   *                 "#attributes": {
   *                     "ProcessID": 1332,
   *                     "ThreadID": 780
   *                 }
   *             },
   *             "Channel": "Microsoft-Windows-Bits-Client/Operational",
   *             "Computer": "DESKTOP-EIS938N",
   *             "Security": {
   *                 "#attributes": {
   *                     "UserID": "S-1-5-18"
   *                 }
   *             }
   *         },
   *         "EventData": {
   *             "jobTitle": "Font Download",
   *             "jobId": "174718A5-F630-43D9-B378-728240ECE152",
   *             "jobOwner": "NT AUTHORITY\\LOCAL SERVICE",
   *             "processPath": "C:\\Windows\\System32\\svchost.exe",
   *             "processId": 1456,
   *             "ClientProcessStartKey": 844424930132016
   *         }
   *     }
   * }
   * ```
   */
  data: Record<string, unknown>;
}

/**
 * Parsed EventLog files with template strings included. A flatten version of `EventLogRecord`
 */
export interface EventLogMessage {
  /**Full EventLog message rendered using both the template string and evtx data */
  message: string;
  /**The raw template string */
  template_message: string;
  /**The raw evtx event data. Ex: `EventData` or `UserData` */
  raw_event_data: Record<string, unknown>;
  /**EventID for the entry */
  event_id: bigint;
  /**Qualifier ID for the entry */
  qualifier: bigint;
  /**Version number for the entry */
  version: bigint;
  /**GUID associated with the provider */
  guid: string;
  /**EventLog provider name */
  provider: string;
  /**Alternative provider name */
  source_name: string;
  /**EventLog record number */
  record_id: bigint;
  /**Task number for entry */
  task: bigint;
  /**EventLog level value */
  level: string;
  /**Opcode number for entry */
  opcode: bigint;
  /**Keywords value for entry. Is a hex number */
  keywords: string;
  /**Generated timestamp for entry */
  generated: string;
  /**System timestamp for entry */
  system_time: string;
  /**Activity ID for entry if available */
  activity_id: string;
  /**Process ID for entry if available */
  process_id: bigint;
  /**Thread ID for entry if available */
  thread_id: bigint;
  /**SID value for entry if available */
  sid: string;
  /**Channel name for entry */
  channel: string;
  /**Hostname of system */
  computer: string;
  /**Full path the evtx file that was parsed */
  source_file: string;
  /**Full path to the PE file that was used to obtain the template string */
  message_file: string;
  /**Full path to the PE file containing parameters for the entry */
  parameter_file: string;
  /**Source Registry file used to get provider info */
  registry_file: string;
  /**Registry key path to the provider info */
  registry_path: string;
}

/**A complex structure that represents the parsed EventLog template strings. Can be used to create a full EventLog message */
export interface TemplateStrings {
  /**Object containing Template provider info. Key is the provider name or a GUID */
  providers: Record<string, Provider>;
  /**Object containing Template string info. Key is the path to the PE file */
  templates: Record<string, TemplateInfo>;
}

/**Information about the EventLog provider */
export interface Provider {
  /**Source Registry file used to get provider info */
  registry_file_path: string;
  /**Registry key path to the provider info */
  registry_path: string;
  /**Name of provider. Might be a GUID */
  name: string;
  /**Array of PE files that point to the template strings*/
  message_file: string[];
  /**Array of PE files that point to the parameter values for the provider. So far this seems to always be one file */
  parameter_file: string[];
}

/**The parsed WEVT_TEMPLATE info */
export interface TemplateInfo {
  /** Path to PE file */
  path: string;
  /**Internal data used by artemis when parsing the PE data. These arrays will always be empty */
  resource_data: {
    mui_data: number[];
    wevt_data: number[];
    message_data: number[];
    /** Path to PE file */
    path: string;
  };
  /**Info related to the template message string. Key is the `MessageTable` ID */
  message_table: Record<string, MessageTable>;
  /**Extreme details on the EventLog provider template. Key is a GUID */
  wevt_template: Record<string, WevtTemplate>;
}

export interface MessageTable {
  id: bigint;
  size: number;
  flags: string;
  message: string;
}

export interface WevtTemplate {
  offset: number;
  element_offsets: number[];
  channels: TemplateData[];
  keywords: TemplateData[];
  opcodes: TemplateData[];
  levels: TemplateData[];
  maps: Maps[];
  tasks: TemplateData[];
  /**Information related to a EventID associated with a provider. Key is combination of the `Definition` ID and version. Ex: The key: `100_0` would be EventID 100 version 0 */
  definitions: Record<string, Definition>;
}

export interface Definition {
  /**EventID. Makes up the `definitions` key along with the `version` */
  id: number;
  /**Version number of the definition object. Makes up the `definitions` key along with the `id`  */
  version: number;
  level: number;
  opcode: number;
  task: number;
  keywords: number;
  message_id: bigint;
  temp_offset: number;
  template: Template | null;
  opcode_offset: number;
  level_offset: number;
  task_offset: number;
}

export interface Template {
  template_id: string;
  event_data_type: string;
  elements: {
    token: string;
    token_number: number;
    dependency_id: number;
    size: number;
    attribute_list: {
      attribute_token: string;
      attribute_token_number: number;
      value: string;
      value_token: string;
      value_token_number: number;
      name: string;
      input_type: string;
      substitution: string;
      substitution_id: number;
    }[] | null;
    element_name: string;
    input_type: string;
    substitution: string;
    substitution_id: 0;
  }[];
  guid: string;
}

export interface TemplateData {
  message_id: bigint;
  id: number;
  value: string;
  /**Only `Tasks` have this value */
  guid: string | undefined;
}

export interface Maps {
  name: string;
  data: Record<string, TemplateData>;
}
