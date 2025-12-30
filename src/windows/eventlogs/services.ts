import {
  RawService7045,
  ServiceInstalls,
} from "../../../types/windows/eventlogs/services";
import { WindowsError } from "../errors";
import { getEventlogs } from "../eventlogs";

/**
 * Function to extract Service install events from EventLog
 * @param alt_path Optional alternative path to System.evtx. Default is path `C:\Windows\System32\winevt\Logs\System.evtx`
 * @returns Array of `ServiceInstalls` or `WindowsError`
 */
export function serviceInstalls(
  alt_path?: string,
): ServiceInstalls[] | WindowsError {
  let path = "C:\\Windows\\System32\\winevt\\Logs\\System.evtx";
  if (alt_path !== undefined) {
    path = alt_path
  }
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
        message: `Service "${entry.data.Event.EventData["ServiceName"]}" installed`,
        datetime: entry.timestamp,
        timestamp_desc: "Windows Service Installed",
        artifact: "EventLog Service 7045",
        data_type: "windows:eventlog:system:service"
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

/**
 * Function to test Windows Service install parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows Service install parsing
 */
export function testServiceInstalls(): void {
  const test = "../../tests/test_data/windows/eventlogs/System.evtx";
  const results = serviceInstalls(test);
  if (results instanceof WindowsError) {
    throw results;
  }

  if (results.length !== 16) {
    throw `Got ${results.length} service install events, expected 16.......serviceInstalls ❌`;
  }
  if (results[1] === undefined) {
    throw `Got undefined service install.......serviceInstalls ❌`;
  }
  if (results[1].message != 'Service "Intel(R) PRO/1000 NDIS 6 Adapter Driver" installed') {
    throw `Got ${results[1].message}, expected 'Service "Intel(R) PRO/1000 NDIS 6 Adapter Driver" installed'.......serviceInstalls ❌`;
  }

  console.info(`  Function serviceInstalls ✅`);

  const dumb: RawService7045 = {
    event_record_id: 0,
    timestamp: "",
    data: {
      Event: {
        "#attributes": {
          xmlns: ""
        },
        System: {
          Provider: {
            "#attributes": {
              Name: "",
              Guid: "",
              EventSourceName: ""
            }
          },
          EventID: 11,
          Version: 0,
          Level: 0,
          Task: 0,
          Opcode: 0,
          Keywords: "",
          TimeCreated: {
            "#attributes": {
              SystemTime: ""
            }
          },
          EventRecordID: 0,
          Correlation: {
            "#attributes": {
              ActivityID: ""
            }
          },
          Execution: {
            "#attributes": {
              ProcessID: 0,
              ThreadID: 0
            }
          },
          Channel: "",
          Computer: "",
          Security: {
            "#attributes": {
              UserID: ""
            }
          }
        },
        EventData: {
          ServiceName: "",
          ImagePath: "",
          ServiceType: "",
          StartType: "",
          AccountName: ""
        }
      }
    }
  };
  if (isInstall(dumb)) {
    throw `Got install event with bad data.......isInstall ❌`
  }

  console.info(`  Function isInstall ✅`);

}