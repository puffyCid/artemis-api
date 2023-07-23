/**
 * Windows `EventLogs` are the primary files associated with logging with system activity.
 * They are stored in a binary format, typically at C:\Windows\System32\winevt\Logs
 */
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

/**
 * Function to parse an `evtx` file
 * @param path Full path to `evtx` file
 * @returns Array of `event log` records
 */
export function get_eventlogs(path: string): EventLogRecord[] {
  // Array of JSON objects
  const data = Deno.core.ops.get_eventlogs(path);
  const log_array: EventLogRecord[] = JSON.parse(data);

  return log_array;
}
