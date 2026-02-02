---
description: Primary source of logs on Windows
keywords:
  - windows
  - logs
  - binary
---

# Event Logs

Windows EventLogs are the primary files associated with logging system
activity. They are stored in a binary format, typically at
C:\Windows\System32\winevt\Logs

Artemis also has the capability to extract EventLog template data from PE files.
This is a powerful (but complex) feature that allows an analyst to potentially
obtain the full EventLog message instead of just the data found in evtx files.

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.eventlogs.evtx/)

References:

- [Libyal](https://github.com/libyal/libevtx/blob/main/documentation/Windows%20XML%20Event%20Log%20(EVTX).asciidoc)

## TOML Collection

```toml
[output]
name = "eventlog_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"
timeline = false

[[artifacts]]
artifact_name = "eventlogs"
[artifacts.eventlogs]
# Optional
# alt_file = "C:\\Artifacts\\Security.evtx"
# alt_dir = "C:\\LogFiles" # Optional
# alt_template_file = "C:\\Resources\\templates.json" # Optional 
include_templates = false
dump_templates = false # Works only on Windows
only_templates = false # Works only on Windows
```

## Collection Options

- `alt_file` Full path to an EventLog file. This configuration is **optional**.
  By default artemis will parse all Event Logs on the system under the default
  path
- `alt_dir` Full path to a directory containing EventLogs. This configuration is
  **optional**.
- `include_templates` Whether artemis should parse PE files and extract EventLog
  template strings. This configuration is **required**.
- `dump_templates` Whether artemis should output the parsed EventLog template
  files. This output file can then be used to the evtx files on a different
  system. This configuration is **required**.
- `only_templates` Whether artemis should only output the parsed EventLog
  template files and skip evtx files. This configuration is **required**.

## EventLog Providers ands Template Parsing

Artemis uses the popular [evtx](https://github.com/omerbenamram/evtx) crate to
parse EventLog files. However, this library does not completely return the log
message. It only returns the data found in the EventLog file. For example, the
evtx crate will output the following message data from an EventLog file

```json
"EventData": {
    "SubjectUserSid": "S-1-5-21-549467458-3727351111-1684278619-1001",
    "SubjectUserName": "bob",
    "SubjectDomainName": "DESKTOP-9FSUKAJ",
    "SubjectLogonId": "0x3311b1",
    "TargetName": "MicrosoftAccount:user=testemail@outlook.com",
    "Type": 0,
    "CountOfCredentialsReturned": 1,
    "ReadOperation": "%%8100",
    "ReturnCode": 0,
    "ProcessCreationTime": "2024-10-01T02:49:28.150359Z",
    "ClientProcessId": 1848
}
```

Now compared to the Event Viewer on Windows

```
Credential Manager credentials were read.

Subject:
	Security ID:		DESKTOP-9FSUKAJ\bob
	Account Name:		bob
	Account Domain:		DESKTOP-9FSUKAJ
	Logon ID:		0x3311b1
	Read Operation:		Enumerate Credentials

This event occurs when a user performs a read operation on stored credentials in Credential Manager.
```

In order to get the entire EventLog message, we need to parse EventLog provider
files (PE files) and extract resource data. The Windows Registry contains
information about EventLog providers. If you choose to enable EventLog Provider parsing, artemis will perform the following high
level actions to attempt to extract EventLog template strings:

1. Read and parse the SOFTWARE and SYSTEM Registry files to identify EventLog
   providers. The Registry files point to PE files that contain EventLog Provider template strings.
2. Next read and parse all PE files associated with EventLog providers
3. Extract and parse the MUI, MESSAGETABLE, and WEVT_TEMPLATE resources from the PE
   files
4. Attempt to use: MESSAGETABLE, WEVT_TEMPLATE, and the evtx EventLog data to
   assemble the full EventLog message

If parsing is successful artemis should return a more detailed EventLog message
if you use the `include_templates` option 🥳 :

```
Credential Manager credentials were read.

Subject:
	Security ID:		S-1-5-21-549467458-3727351111-1684278619-1001
	Account Name:		bob
	Account Domain:		DESKTOP-9FSUKAJ
	Logon ID:		0x3311b1
	Read Operation:		Enumerate Credentials


This event occurs when a user performs a read operation on stored credentials in Credential Manager.
```

### Template Parsing Caveats

Trying to include template strings in the EventLog messages is very complex.
There are a number of caveats and limitations you should be aware of. More can
also be found in several
[velociratpor](https://docs.velociraptor.app/blog/2019/2019-11-12_windows-event-logs-d8d8e615c9ca/)
[blogs](https://docs.velociraptor.app/docs/forensic/event_logs/)

1. No support for enum lookups. Artemis cannot lookup enum EventLog data values.
   Ex: `IntendedPackageState - 5112`. The enum number 5512
   is converted to the value "Installed" in Event Viewer
2. You should not try parsing EventLog files on different Windows platforms. For
   example, if you acquire a `Security.evtx` on a Windows 11 system, you should
   not try to parse the evtx file on a Windows 10 system. Microsoft updates the
   template strings on different versions of Windows. If you try to parse evtx
   files on a different version of Windows you may get odd results!
   - If you do try to parse an evtx file on a different artemis will still try
     to complete the EventLog message, but if it fails it will return the raw
     EventData
   - It may ok to parse older evtx on newer Windows versions. For example,
     acquiring `System.evtx` on Windows 10 and then parsing on Windows 11 may be
     ok. Typically Windows will also contain older versions of template strings.
3. If you acquire only an evtx file such as `System.evtx` you must use a Windows
   system (or VM) in order to include template strings. You cannot use Linux or
   macOS. If you want to include template strings on Linux or macOS you must
   also provide a template file

### Template Files (aka EventLog Provider strings)

The `dump_templates` option will make artemis dump the parsed template strings from EventLog Providers on a Windows system
to a JSON file. This option also requires `include_templates`. You must be on a
Windows system in order for this to work.

:::info

To include the combine EventLog message you would run the following on
Windows.\
`artemis.exe acquire eventlogs --include-templates`

If you only want a template JSON file (and not evtx data) you can run the following
on Windows.\
`artemis.exe acquire eventlogs --include-templates --dump-templates --only-templates`
:::

Dumping the template data will return a single JSON file that can then be used
to parse evtx files on different platforms. An example scenario where this could be useful:

1. You dump template strings on a Windows server via
   `artemis.exe acquire eventlogs --include-templates --dump-templates --only-templates`.
   The JSON file size will vary but ~90MB seems typical
2. You acquire the template JSON file and move it to your Linux workstation
3. You acquire a 2GB Application.evtx file from the **same** Windows server
   and copy it to your Linux workstation
4. Run
   `artemis acquire eventlogs --include-templates --alt-template-file <PATH to TEMPLATE JSON FILE> --alt-file <PATH to Application.evtx>`
   on Linux and you should hopefully get the full EventLog message!

If artemis fails to assemble the full EventLog message for any reason, it will
fallback to the raw EventLog data obtained from the evtx file.

## Output Structure

Depending on options provided there are several different structures that
artemis can produce.

By default artemis will return an array of `EventLogRecord` entries. This is the
raw data obtained from the evtx file. Artemis will also fallback to
EventLogRecord entries if it fails to create an `EventLogMessage` structure

````typescript
export interface EventLogRecord {
  /**Event record number */
  record_id: number;
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
````

If you choose to include template strings, artemis will output `EventLogMessage`
structure.

```typescript
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
```

If you choose to dump template strings to a JSON file, artemis will output a
`TemplateStrings` structure:

```typescript
/**
 * A complex structure that represents the parsed EventLog template strings.
 * Can be used to create a full EventLog message
 */
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
```
