/**
 * Windows Management Instrumentation (WMI) is a collections of tools that allow users to manage the system.
 * This parser parses the WMI Repository database typically found at C:\\Windows\\System32\\wbem\\Repository.
 * Malware can use WMI to achieve persistence on a system
 *
 * References:
 * - https://docs.velociraptor.app/blog/2022/2022-01-12-wmi-eventing/
 * - https://redcanary.com/threat-detection-report/techniques/windows-management-instrumentation/
 * - https://github.com/libyal/dtformats/blob/main/documentation/WMI%20repository%20file%20format.asciidoc
 */
export interface WmiPersist {
  /**SID associated with the WMI entry */
  sid: string;
  /**Name of WMI class */
  class: string;
  /**Query that triggers the WMI entry */
  query: string;
  /**Filter associated with WMI entry */
  filter: string;
  /**Consumer associated with WMI entry */
  consumer: string;
  /**Name of the Consumer */
  consumer_name: string;
  /** Data associated with the WMI entry. Can use `class` to determine what the type is.
   * Most common ones are defined, however users can create their own class
   */
  values:
  | EventLogConsumer
  | ActiveScriptConsumer
  | CommandLineConsumer
  | LogFileConsumer
  | SmtpConsumer
  | Record<string, unknown>;
}

/**
 * Consumer that logs a message to the Windows EventLogs when an event is triggered
 */
export interface EventLogConsumer {
  /**Creator of Consumer in bytes */
  CreatorSID: Uint8Array;
  /**Name of system where WMI sends events */
  MachineName: string;
  /**Max queue for consumer in bytes */
  MaximumQueueSize: number;
  /**Unique ID for consumer */
  Name: string;
  /**Event category */
  Category: number;
  /**Name of the event property that contains data */
  NameOfRawDataProperty: string;
  /**Event message in the message DLL */
  EvenID: number;
  /**Type of event */
  EventType: number;
  /**Array of strings to insert for an event log entry */
  InsertionStringTemplates: string[];
  /**Number of strings in `InsertionStringTemplates` */
  NumberOfInsertionStrings: number;
  /**SID associated with event */
  NameOfUserSidProperty: string | Uint8Array;
  /**Source name where message is located */
  SourceName: string;
  /**Name of system on which to log an event */
  UNCServerName: string;
}

/**
 * Consumer to execute a script when an event is triggered
 */
export interface ActiveScriptConsumer {
  /**Creator of Consumer in bytes */
  CreatorSID: Uint8Array;
  /**Name of system where WMI sends events */
  MachineName: string;
  /**Max queue for consumer in bytes */
  MaximumQueueSize: number;
  /**Unique ID for consumer */
  Name: string;
  /**How many seconds to wait until process is killed. Zero (0) means process will not be killed */
  KillTimeOut: number;
  /**Name of scripting engine to use */
  ScriptingEngine: string;
  /**Name of file to execute script. Must be NULL if `ScriptText` is NOT NULL */
  ScriptFileName: string;
  /**Contents of script to execute. Must be NULL if `ScriptFileName` is NOT NULL */
  ScriptText: string;
}

/**
 * Consumer to start a process when an event is triggered
 */
export interface CommandLineConsumer {
  /**Creator of Consumer in bytes */
  CreatorSID: Uint8Array;
  /**Name of system where WMI sends events */
  MachineName: string;
  /**Max queue for consumer in bytes */
  MaximumQueueSize: number;
  /**Unique ID for consumer */
  Name: string;
  /**Specifies command to execute */
  CommandLineTemplate: string;
  /**Unused */
  CreateNewConsole: boolean;
  /**Will create a new process group */
  CreateNewProcessGroup: boolean;
  /**New process will run in Virtual DOS Machine (VDM) */
  CreateSeparateWowVdm: boolean;
  /**New process will run in shared Virtual DOS Machine (VDM) */
  CreateSharedWowVdm: boolean;
  /**Unused */
  DesktopName: string;
  /**Specifies the file to execute */
  ExecutablePath: string;
  /**Color to use if new console is window is created */
  FillAttributes: number;
  /**Cursor feedback is disabled */
  ForceOffFeedback: boolean;
  /**Cursor feedback is enabled */
  ForceOnFeedback: boolean;
  /**How many seconds to wait until process is killed. Zero (0) means process will not be killed */
  KillTimeout: number;
  /**Priority of process threads */
  Priority: number;
  /**Determines if process is launched with interactive WinStation or default WinStation */
  RunInteractively: boolean;
  /**Determines Window show state */
  ShowWindowCommand: number;
  /**Whether to use default error mode */
  UseDefaultErrorMode: boolean;
  /**Title to use for process */
  WindowTitle: string;
  /**Working directory for the process */
  WorkingDirectory: string;
  /**X-offset, in pixels, from the left edge of the screen to the left edge of the window, if a new window is created. */
  XCoordinate: number;
  /**Screen buffer width, in character columns, if a new console window is created. This property is ignored in a GUI process. */
  XNumCharacters: number;
  /**Width, in pixels, of a new window, if a new window is created. */
  XSize: number;
  /**Y-offset, in pixels, from the top edge of the screen to the top edge of the window, if a new window is created. */
  YCoordinate: number;
  /**Screen buffer height, in character rows, if a new console window is created. This property is ignored in a GUI process. */
  YNumCharacters: number;
  /**Height, in pixels, of the new window, if a new window is created. */
  YSize: number;
  /**Specifies the initial text and background colors if a new console window is created in a console application */
  FillAttribute: number;
}

/**
 * Consumer to write customer strings to text file (log) when an event is triggered
 */
export interface LogFileConsumer {
  /**Creator of Consumer in bytes */
  CreatorSID: Uint8Array;
  /**Name of system where WMI sends events */
  MachineName: string;
  /**Max queue for consumer in bytes */
  MaximumQueueSize: number;
  /**Unique ID for consumer */
  Name: string;
  /**Whether log file is Unicode or multibyte code file */
  IsUnicode: boolean;
  /**Max log file size */
  MaximumFileSize: bigint;
  /**String to write to log file */
  Text: string;
}

/**
 * Consumer that sends an email when an event is triggered
 */
export interface SmtpConsumer {
  /**Creator of Consumer in bytes */
  CreatorSID: Uint8Array;
  /**Name of system where WMI sends events */
  MachineName: string;
  /**Max queue for consumer in bytes */
  MaximumQueueSize: number;
  /**Unique ID for consumer */
  Name: string;
  /**Addresses to send email (BCC) */
  BccLine: string;
  /**Addresses to send email (CC) */
  CcLine: string;
  /**From address to use to send email. Default is: `WinMgmt@MachineName` */
  FromLine: string;
  /**Headers to insert into email */
  HeaderFields: string[];
  /**Body of email */
  Message: string;
  /**Reply-to line of an email message */
  ReplyToLine: string;
  /**SMTP server to use to send emails */
  SMTPServer: string;
  /**Subject line for email */
  Subject: string;
  /**Addresses to send email to */
  ToLine: string;
}

export interface Namespace {
  class: string;
  /**SHA256 hash of the namespace name */
  clas_hash: string;
  name: string;
  path: string;
  super_class: string;
}

export interface ClassInfo {
  super_class_name: string;
  class_name: string;
  qualifiers: Qualifier[];
  properties: Property[];
  class_hash: string;
  includes_parent_props: boolean;
}

interface Qualifier {
  name: string;
  value_data_type: CimType;
  data: unknown;
}

interface Property {
  name: string;
  property_data_type: CimType;
  property_index: number;
  data_offset: number;
  class_level: number;
  qualifiers: Qualifier[];
}

enum CimType {
  Sint16 = "Sint16",
  Sint32 = "Sint32",
  Real32 = "Real32",
  Real64 = "Real64",
  String = "String",
  Bool = "Bool",
  Object = "Object",
  Sint8 = "Sint8",
  Uint8 = "Uint8",
  Uint16 = "Uint16",
  Uint32 = "Uint32",
  Sint64 = "Sint64",
  Uint64 = "Uint64",
  Datetime = "Datetime",
  Reference = "Reference",
  Char = "Char",
  ArrayString = "ArrayString",
  ArraySint16 = "ArraySint16",
  ArraySint8 = "ArraySint8",
  ArraySint32 = "ArraySint32",
  ArraySint64 = "ArraySint64",
  ArrayReal32 = "ArrayReal32",
  ArrayReal64 = "ArrayReal64",
  ArrayBool = "ArrayBool",
  ArrayUint8 = "ArrayUint8",
  ArrayUint16 = "ArrayUint16",
  ArrayUint32 = "ArrayUint32",
  ArrayUint64 = "ArrayUint64",
  ArrayChar = "ArrayChar",
  ArrayObject = "ArrayObject",
  ByteRefString = "ByteRefString",
  ByteRefUint32 = "ByteRefUint32",
  ByteRefUint16 = "ByteRefUint64",
  ByteRefSint64 = "ByteRefSint64",
  ByteRefSint32 = "ByteRefSint32",
  ByteRefReal32 = "ByteRefReal32",
  ByteRefBool = "ByteRefBool",
  ByteRefDatetime = "ByteRefDatetime",
  ByteRefUint8 = "ByteRefUint8",
  ByteRefReference = "ByteRefReference",
  ByteRefObject = "ByteRefObject",
  Unknown = "Unknown",
  None = "None",
}

export interface IndexBody {
  array_sub_pages: number[];
  array_key_offset: number[];
  key_data: number[];
  array_value_offsets: number[];
  value_data: string[];
}