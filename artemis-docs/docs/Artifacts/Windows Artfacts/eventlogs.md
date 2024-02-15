---
description: Primary source of logs on Windows
keywords:
  - windows
  - logs
  - binary
---

# Event Logs

Windows `Event Logs` are the primary files associated with logging system
activity. They are stored in a binary format, typically at
`C:\Windows\System32\winevt\Logs`

Other Parsers:

- [Velociraptor](https://docs.velociraptor.app/artifact_references/pages/windows.eventlogs.evtx/)

References:

- [Libyal](https://github.com/libyal/libevtx/blob/main/documentation/Windows%20XML%20Event%20Log%20(EVTX).asciidoc)

# TOML Collection

```toml
system = "windows"

[output]
name = "eventlog_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "eventlogs"
[artifacts.eventlogs]
# Optional
# alt_file = "C:\\Artifacts\\Security.evtx"
```

# Collection Options

- `alt_file` Full path to an Event Log file. This configuration is **optional**.
  By default artemis will parse all Event Logs on the system under the default
  path

# Output Structure

An array of `EventLogRecord` entries

````typescript
export interface EventLogRecord {
  /**Event record number */
  record_id: number;
  /**Timestamp of eventlog message in UNIXEPOCH nanoseconds */
  timestamp: number;
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
