import { TimesketchTimeline } from "../../../../types/timesketch/timeline";
import { TaskData } from "../../../../types/windows/tasks";

/**
 * Function to timeline Amcache
 * @param data Array of `Amcache`
 * @returns Array `TimesketchTimeline` of Amcache
 */
export function timelineTasks(data: TaskData): TimesketchTimeline[] {
  const entries = [];

  for (const item of data.tasks) {
    const entry: TimesketchTimeline = {
      datetime: "1970-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.path,
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

  for (const item of data.jobs) {
    let entry: TimesketchTimeline = {
      datetime: "1970-01-01T00:00:00.000Z",
      timestamp_desc: "N/A",
      message: item.path,
      artifact: "Schedule Task",
      data_type: "windows:tasks:jobs:entry",
    };

    entry = { ...entry, ...item };

    entries.push(entry);
  }

  return entries;
}
