import { EventLogRecord } from "../../types/windows/eventlogs.d.ts";

/**
 * Function to parse an `evtx` file
 * @param path Full path to `evtx` file
 * @returns Array of `event log` records
 */
export function getEventlogs(path: string): EventLogRecord[] {
  //@ts-ignore: Custom Artemis function
  const results: string = Deno.core.ops.get_eventlogs(path);

  const data: EventLogRecord[] = JSON.parse(results);
  return data;
}
