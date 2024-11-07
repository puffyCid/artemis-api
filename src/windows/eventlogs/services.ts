import {
  RawService7045,
  ServiceInstalls,
} from "../../../types/windows/eventlogs/services.ts";
import { WindowsError } from "../errors.ts";
import { getEventlogs } from "../eventlogs.ts";

/**
 * Function to extract Service install events from EventLog
 * @param path Path to the System.evtx file
 * @returns Array of `ServiceInstalls` or `WindowsError`
 */
export function serviceInstalls(
  path: string,
): ServiceInstalls[] | WindowsError {
  let offset = 0;
  const limit = 10000;
  const events = [];

  while (true) {
    // Get records 10000 at a time
    const logs = getEventlogs(path, offset, limit);
    if (logs instanceof WindowsError) {
      return new WindowsError(
        "SERVICEINSTALL",
        `failed to parse eventlog ${path}: ${logs}`,
      );
    }
    const recordsData = logs[1];
    if (recordsData.length === 0) {
      break;
    }

    offset += limit;

    const records = recordsData as RawService7045[];
    for (const entry of records) {
      if (!isInstall(entry)) {
        continue;
      }

      const service: ServiceInstalls = {
        name: entry.data.Event.EventData["ServiceName"],
        image_path: entry.data.Event.EventData["ImagePath"],
        service_type: entry.data.Event.EventData["ServiceType"],
        account: entry.data.Event.EventData["AccountName"],
        start_type: entry.data.Event.EventData["StartType"],
        hostname: entry.data.Event.System.Computer,
        timestamp: entry.timestamp,
        process_id: entry.data.Event.System.Execution["#attributes"].ProcessID,
        thread_id: entry.data.Event.System.Execution["#attributes"].ThreadID,
        sid: entry.data.Event.System.Security["#attributes"].UserID,
      };
      events.push(service);
    }
  }

  return events;
}

/**
 * Function to confirm if eventlog record is a Service install event
 * @param record `RawService7045` object
 * @returns Boolean confirmation if the eventlog entry is a Service install event
 */
function isInstall(record: RawService7045): record is RawService7045 {
  if (
    typeof record.data.Event.System.EventID === "number" &&
    record.data.Event.System.EventID === 7045 &&
    record.data.Event.System.Provider["#attributes"].Name ===
      "Service Control Manager"
  ) {
    return true;
  } else if (
    typeof record.data.Event.System.EventID === "object" &&
    record.data.Event.System.EventID["#text"] === 7045 &&
    record.data.Event.System.Provider["#attributes"].Name ===
      "Service Control Manager"
  ) {
    return true;
  }

  return false;
}
