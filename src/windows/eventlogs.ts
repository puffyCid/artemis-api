import {
  EventLogMessage,
  EventLogRecord,
} from "../../types/windows/eventlogs.ts";
import { platform } from "../system/systeminfo.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse an `evtx` file. Returns a tuple containing extracted EventLogs
 * @param path Full path to `evtx` file
 * @param offset How many records to skip. Ex: offset = 10, skip first 10 records
 * @param limit How many EventLog records to return
 * @param include_templates Whether to include template strings in the output. Defaults to `false`
 * @param template_file Optional path to a template JSON file
 * @returns A tuple containing an Array of `EventLogMessage` if `include_templates` is `true` or `EventLogRecord` if `include_temp` is `false` or `WindowsError`
 */
export function getEventlogs(
  path: string,
  offset: number,
  limit: number,
  include_templates = false,
  template_file = "",
):
  | readonly [messages: EventLogMessage[], raw_messages: EventLogRecord[]]
  | WindowsError {
  if (
    include_templates && platform() != "Windows" && template_file == ""
  ) {
    return new WindowsError(
      "EVENTLOG",
      `cannot include template strings on non-Windows platform without a template file`,
    );
  }
  try {
    //@ts-ignore: Custom Artemis function
    const results = js_eventlogs(
      path,
      offset,
      limit,
      include_templates,
      template_file,
    );

    const data: [
      messages: EventLogMessage[],
      raw_messages: EventLogRecord[],
    ] = results;
    return data;
  } catch (err) {
    return new WindowsError(
      "EVENTLOG",
      `failed to parse eventlog ${path}: ${err}`,
    );
  }
}
