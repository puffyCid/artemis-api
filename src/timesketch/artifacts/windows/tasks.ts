import { TimesketchTimeline } from "../../../../types/timesketch/timeline";
import { TaskXml } from "../../../../types/windows/tasks";

/**
 * Function to timeline Schedule Tasks
 * @param data Array of `TaskXml`
 * @returns Array `TimesketchTimeline` of Schedule Tasks
 */
export function timelineTasks(data: TaskXml[]): TimesketchTimeline[] {
  const entries = [];

  for (const item of data) {
    const entry: TimesketchTimeline = {
      datetime: "1970-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.evidence,
      hash: "",
      user: "",
      artifact: "Schedule Task",
      data_type: "windows:tasks:xml:entry",
    };

    entry[ "registration_info" ] = item.registrationInfo;
    entry[ "triggers" ] = item.triggers;
    entry[ "settings" ] = item.settings;
    entry[ "data" ] = item.data;
    entry[ "principals" ] = item.principals;
    entry[ "actions" ] = item.actions;

    entries.push(entry);
  }

  return entries;
}
