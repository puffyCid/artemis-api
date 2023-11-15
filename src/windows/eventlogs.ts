import { EventLogRecord } from "../../types/windows/eventlogs.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse an `evtx` file
 * @param path Full path to `evtx` file
 * @returns Array of `event log` records or `WindowsError`
 */
export function getEventlogs(path: string): EventLogRecord[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const results: string = Deno.core.ops.get_eventlogs(path);

    const data: EventLogRecord[] = JSON.parse(results);
    return data;
  } catch (err) {
    return new WindowsError(
      "EVENTLOG",
      `failed to parse eventlog ${path}: ${err}`,
    );
  }
}
