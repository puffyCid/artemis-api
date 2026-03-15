import { getEventlogs } from "../../../mod";
import { CrashEvent, RawCrash } from "../../../types/windows/eventlogs/crash";
import { getSystemDrive } from "../../environment/env";
import { filetimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../errors";

/**
 * 
 * @param alt_path Optional alternative path to `Microsoft-Windows-WER-Diag%4Operational.evtx`
 * @param limit Optional limit to iterate through the EventLog
 * @returns Array of `CrashEvent` or `WindowsError`
 */
export function crashEvents(alt_path?: string, limit = 1000): CrashEvent[] | WindowsError {
    const drive = getSystemDrive();
    let path = `${drive}\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-WER-Diag%4Operational.evtx`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    let offset = 0;
    const values: CrashEvent[] = [];

    while (true) {
        const logs = getEventlogs(path, offset, limit);
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
        for(const entry of records) {
            if(entry.data.Event.System.EventID !== 4) {
                continue;
            }
            const data = entry.data.Event.EventData;
            const timestamp = filetimeToUnixEpoch(data.StartTime);
            const crash: CrashEvent = {
                evidence: entry.evidence,
                pid: Number(data.ProcessId),
                path: data.ModuleName,
                application_start: unixEpochToISO(timestamp),
                crash_time: entry.data.Event.System.TimeCreated["#attributes"].SystemTime,
                crash_time_from_start: Number(data.CrashTimeFromStart),
                hostname: entry.data.Event.System.Computer,
                provider: entry.data.Event.System.Provider["#attributes"].Name,
                guid: entry.data.Event.System.Provider["#attributes"].Guid,
                channel: entry.data.Event.System.Channel,
                sid: entry.data.Event.System.Security["#attributes"].UserID,
                trigger: data["#attributes"].Name,
                timestamp_desc: "Application Crash",
                artifact: "Crash EventLog",
                data_type: "windows:eventlogs:crash:entry"
            };
            values.push(crash);
        }

        console.log(JSON.stringify(recordsData));
        offset += limit;

    }

    return values;
} 
