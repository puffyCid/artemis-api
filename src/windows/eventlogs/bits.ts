import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { BitsEvent, BitsState, RawBitsComplete, RawBitsCreate } from "../../../types/windows/eventlogs/bits";
import { getSystemDrive } from "../../environment/env";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { WindowsError } from "../errors";
import { getEventlogs } from "../eventlogs";

/**
 * Function to extract Windows BITS events from EventLog
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to the BITS EventLog
 * @param limit Optional limit to iterate through the EventLog
 * @returns Array of `BitsEvent` or `WindowsError`
 */
export function bitsEvents(protocol = AccessorProtocol.Host, alt_path?: string, limit = 10000): BitsEvent[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();
    let path = `${drive}\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-Bits-Client%4Operational.evtx`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    // Based on the `AccessorProtocol` glob for Microsoft-Windows-Bits-Client%4Operational.evtx files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('EVENTLOG_BITS', `failed to glob for ${path}: ${matches}`);
    }

    const values: BitsEvent[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        let offset = 0;

        while (true) {
            const logs = getEventlogs(entry.handle as FileHandle, offset, limit);
            if (logs instanceof WindowsError) {
                return new WindowsError(
                    "EVENTLOG_BITS",
                    `failed to parse eventlog ${path}: ${logs}`,
                );
            }

            const recordsData = logs[1];
            if (recordsData.length === 0) {
                break;
            }

            const records = recordsData as unknown as RawBitsCreate[] | RawBitsComplete[];
            for (const record of records) {
                if (isCreate(record)) {
                    const event_data = record.data.Event.EventData;
                    const event: BitsEvent = {
                        status: BitsState.Created,
                        evidence: entry.meta.display_path,
                        job_id: event_data.jobId,
                        process: event_data.processPath,
                        pid: event_data.processId,
                        user: event_data.jobOwner,
                        title: event_data.jobTitle,
                        message: `BITS Job created '${event_data.jobTitle}' by '${event_data.jobOwner}'`,
                        datetime: record.data.Event.System.TimeCreated["#attributes"].SystemTime,
                        file_count: 0,
                        provider: record.data.Event.System.Provider["#attributes"].Name,
                        event_id: 3,
                        bits_event_time: record.data.Event.System.TimeCreated["#attributes"].SystemTime,
                        activity_id: record.data.Event.System.Correlation["#attributes"].ActivityID,
                        thread_id: record.data.Event.System.Execution["#attributes"].ThreadID,
                        bytes_transferred: 0,
                        timestamp_desc: "BITS Job Created",
                        artifact: "BITS EventLog",
                        data_type: "windows:eventlogs:bits:entry"
                    };
                    values.push(event);
                } else if (isComplete(record)) {
                    const event_data = record.data.Event.EventData;
                    const event: BitsEvent = {
                        status: BitsState.Completed,
                        evidence: entry.meta.display_path,
                        job_id: event_data.jobId,
                        process: "",
                        pid: record.data.Event.System.Execution["#attributes"].ProcessID,
                        user: event_data.jobOwner,
                        title: event_data.jobTitle,
                        message: `BITS Job completed '${event_data.jobTitle}' by '${event_data.jobOwner}'`,
                        datetime: record.data.Event.System.TimeCreated["#attributes"].SystemTime,
                        file_count: event_data.fileCount,
                        provider: record.data.Event.System.Provider["#attributes"].Name,
                        event_id: 4,
                        bits_event_time: record.data.Event.System.TimeCreated["#attributes"].SystemTime,
                        activity_id: record.data.Event.System.Correlation["#attributes"].ActivityID,
                        thread_id: record.data.Event.System.Execution["#attributes"].ThreadID,
                        bytes_transferred: event_data.bytesTransferred,
                        timestamp_desc: "BITS Job Completed",
                        artifact: "BITS EventLog",
                        data_type: "windows:eventlogs:bits:entry"
                    };
                    values.push(event);
                }
            }
            offset += limit;
        }
    }



    return values;
}

/**
 * Function to determine if EventLog entry is `RawBitsCreate` or `RawBitsComplete` event
 * @param record `RawBitsCreate` or `RawBitsComplete` event
 * @returns `RawBitsCreate`
 */
function isCreate(record: RawBitsCreate | RawBitsComplete): record is RawBitsCreate {
    if (record.data.Event.System.EventID === 3) {
        return true;
    }
    return false;
}

/**
 * Function to determine if EventLog entry is `RawBitsCreate` or `RawBitsComplete` event
 * @param record `RawBitsCreate` or `RawBitsComplete` event
 * @returns `RawBitsComplete`
 */
function isComplete(record: RawBitsComplete | RawBitsCreate): record is RawBitsComplete {
    if (record.data.Event.System.EventID === 4) {
        return true;
    }
    return false;
}