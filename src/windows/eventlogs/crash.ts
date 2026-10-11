import { Accessor, getEventlogs } from "../../../mod";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { CrashEvent, RawCrash } from "../../../types/windows/eventlogs/crash";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { filetimeToIso } from "../../time/conversion";
import { WindowsError } from "../errors";

/**
 * Function to parse Windows Crash Events in the EventLog
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to `Microsoft-Windows-WER-Diag%4Operational.evtx`
 * @param limit Optional limit to iterate through the EventLog
 * @returns Array of `CrashEvent` or `WindowsError`
 */
export function crashEvents(protocol = AccessorProtocol.Host, alt_path?: string, limit = 1000): CrashEvent[] | WindowsError {
    const drive = getSystemDrive();
    let path = `${drive}\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-WER-Diag%4Operational.evtx`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    const accessor = new Accessor();
    // Based on the `AccessorProtocol` glob for Microsoft-Windows-WER-Diag%4Operational.evtx files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('EVENTLOG_CRASH', `failed to glob for ${path}: ${matches}`);
    }
    const values: CrashEvent[] = [];

    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }
        let offset = 0;

        while (true) {
            const logs = getEventlogs(entry.handle as FileHandle, offset, limit);
            if (logs instanceof WindowsError) {
                return new WindowsError(
                    "EVENTLOG_CRASH",
                    `failed to parse eventlog ${path}: ${logs}`,
                );
            }

            const recordsData = logs[1];
            if (recordsData.length === 0) {
                break;
            }
            const records = recordsData as unknown as RawCrash[];
            for (const record of records) {
                if (record.data.Event.System.EventID !== 4) {
                    continue;
                }
                const data = record.data.Event.EventData;
                const timestamp = filetimeToIso(data.StartTime);
                const crash: CrashEvent = {
                    evidence: entry.meta.display_path,
                    pid: Number(data.ProcessId),
                    path: data.ModuleName,
                    application_start: timestamp,
                    crash_time: record.data.Event.System.TimeCreated["#attributes"].SystemTime,
                    crash_time_from_start: Number(data.CrashTimeFromStart),
                    hostname: record.data.Event.System.Computer,
                    provider: record.data.Event.System.Provider["#attributes"].Name,
                    guid: record.data.Event.System.Provider["#attributes"].Guid,
                    channel: record.data.Event.System.Channel,
                    sid: record.data.Event.System.Security["#attributes"].UserID,
                    trigger: data["#attributes"].Name,
                    timestamp_desc: "Application Crash",
                    artifact: "Crash EventLog",
                    data_type: "windows:eventlogs:crash:entry",
                    message: `Application '${data.ModuleName}' crashed`,
                    datetime: record.data.Event.System.TimeCreated["#attributes"].SystemTime
                };
                values.push(crash);
            }

            offset += limit;

        }

    }




    return values;
} 
