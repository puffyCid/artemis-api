import { EventLogRecord } from "../../../../types/windows/eventlogs.ts";
import { TimesketchTimeline } from "../../../../types/timesketch/timeline.ts";
import { unixEpochToISO } from "../../../time/conversion.ts";

/**
 * Function to timeline EventLogs
 * @param data Array of `EventLogRecord`
 * @param include_raw Include raw data in timeline entry
 * @returns Array `TimesketchTimeline` of EventLogRecord
 */
export function timelineEventLogs(
  data: EventLogRecord[],
): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: unixEpochToISO(item.timestamp),
      timestamp_desc: "EventLog Generated",
      message: "",
      hash: "",
      user: "",
      artifact: "EventLog",
      data_type: "windows:eventlogs:entry",
      _raw: JSON.stringify(item),
    };

    const value_data = item.data["Event"] as Record<
      string,
      Record<string, Record<string, string | Record<string, string>> | null>
    >;

    entry["event_id"] = JSON.stringify(value_data["System"]["EventID"]);
    if (value_data["System"]["Provider"] != null) {
      const provider =
        value_data["System"]["Provider"]["#attributes"] as Record<
          string,
          string
        >;

      entry["provider"] = provider["Name"];
    }

    entry["channel"] = value_data["System"]["Channel"];
    entry["computer"] = value_data["System"]["Computer"];
    if (value_data["System"]["Security"] != null) {
      const user = value_data["System"]["Security"]["#attributes"] as Record<
        string,
        string
      >;
      entry["user"] = user["UserID"];
    }
    let event_message = `EventID: ${entry["event_id"]} -- `;

    for (const event_data in value_data["EventData"]) {
      event_message += `${event_data}: ${
        JSON.stringify(value_data["EventData"][event_data])
      }  `;
    }

    for (const event_data in value_data["UserData"]) {
      event_message += `${event_data}: ${
        JSON.stringify(value_data["UserData"][event_data])
      }  `;
    }

    entry.message = event_message;

    //entry = { ...entry, ...item };
    entries.push(entry);
  }

  return entries;
}
