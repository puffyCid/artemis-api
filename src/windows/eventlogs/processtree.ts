import { getEventlogs } from "../../../mod";
import { EventLogProcessTree, ProcTracker, RawProcess } from "../../../types/windows/eventlogs/processtree";
import { getEnvValue } from "../../environment/mod";
import { WindowsError } from "../errors";

/**
 * Attempt to create a process tree from Security.evtx file
 * @param path Optional path to Security.evtx file
 * @returns Array of `EventLogProcessTree` or `WindowsError`
 */
export function processTreeEventLogs(path?: string): EventLogProcessTree[] | WindowsError {
    let log_path = path;
    if (log_path === undefined) {
        let drive = getEnvValue("SystemDrive");
        if (drive === "") {
            drive = "C:";
        }
        log_path = `${drive}\\Windows\\System32\\winevt\\Logs\\Security.evtx`;
    }
    let offset = 0;
    const limit = 5000;
    const eid = 4688;

    const procs_map: Record<string, ProcTracker | ProcTracker[]> = {};
    const raw_procs: RawProcess[] = [];
    while (true) {
        const logs = getEventlogs(log_path, offset, limit);
        if (logs instanceof WindowsError) {
            return new WindowsError(
                "EVENTLOG_PROCESSTREE",
                `failed to parse eventlog ${path}: ${logs}`,
            );
        }

        // If empty we are done. No more entries are in the log
        if (logs[ 1 ].length === 0) {
            break;
        }

        // Increase to next chunk of entries
        offset += limit;
        const data = logs[ 1 ] as RawProcess[];
        for (const entry of data) {
            // Skip non process 4688 events
            if (entry.data.Event.System.EventID !== eid) {
                continue;
            }
            const logon_id = Number(entry.data.Event.EventData.SubjectLogonId);
            const parent = Number(entry.data.Event.EventData.ProcessId);
            const pid = Number(entry.data.Event.EventData.NewProcessId);
            const name = entry.data.Event.EventData.NewProcessName;
            const parent_name = entry.data.Event.EventData.ParentProcessName ?? "";
            const track: ProcTracker = {
                login_id: logon_id,
                pid: pid,
                parent: parent,
                name,
                parent_name,
                record: entry.event_record_id,
            };
            // Track new process
            if (procs_map[ `${logon_id}_${pid}` ] !== undefined) {
                const old = procs_map[ `${logon_id}_${pid}` ] as ProcTracker | ProcTracker[];

                if (Array.isArray(old)) {
                    old.push(track);
                    procs_map[ `${logon_id}_${pid}` ] = old;
                    continue;
                }
                procs_map[ `${logon_id}_${pid}` ] = [ old, track ];
                continue;
            }
            procs_map[ `${logon_id}_${pid}` ] = track;
            raw_procs.push(entry);
        }
    }
    return createProcessTree(raw_procs, procs_map, log_path);
}

/**
 * Generated Process Trees from EventLog data
 * @param data Array of `RawProcess` EventLogs
 * @param proc_maps `ProcTracker` object
 * @param evtx_path Path to the parsed evtx file
 * @returns Array of `EventLogProcessTree`
 */
function createProcessTree(data: RawProcess[], proc_maps: Record<string, ProcTracker | ProcTracker[]>, evtx_path: string): EventLogProcessTree[] {
    const entries: EventLogProcessTree[] = [];
    for (const value of data) {
        const raw_event = value.data.Event.EventData;

        const logon_id = Number(raw_event.SubjectLogonId);
        const parent_pid = Number(raw_event.ProcessId);
        const pid = Number(raw_event.NewProcessId);
        const message = `${raw_event.NewProcessName}`;
        const tracker: string[] = [];
        const tree_message = getParent(logon_id, parent_pid, proc_maps, message, tracker, value.event_record_id);
        const entry: EventLogProcessTree = {
            pid,
            parent_pid,
            process_name: raw_event.NewProcessName.split("\\").pop() ?? "",
            process_path: raw_event.NewProcessName,
            parent_name: (raw_event.ParentProcessName ?? "").split("\\").pop() ?? "",
            parent_path: raw_event.ParentProcessName ?? "",
            user: raw_event.SubjectUserName,
            sid: raw_event.SubjectUserSid,
            domain: raw_event.SubjectDomainName,
            commandline: raw_event.CommandLine ?? "",
            message: tree_message,
            datetime: value.timestamp,
            timestamp_desc: "EventLog Generated",
            artifact: "EventLogs Process Tree",
            evtx_path,
            data_type: "windows:eventlog:proctree",
            record: value.event_record_id,
            logon_id,
        };
        entries.push(entry);
    }

    return entries;
}

/**
 * Lookup parent process info
 * @param logon_id Current login ID
 * @param parent Parent PID
 * @param data Our `ProcTracker` object
 * @param message Current process tree message
 * @param tracker Array to prevent recursive lookups
 * @param record EventLog record number associated with child process
 * @returns Process tree
 */
function getParent(logon_id: number, parent: number, data: Record<string, ProcTracker | ProcTracker[]>, message: string, tracker: string[], record: number): string {
    const system = 4;
    if (parent === system) {
        return `SYSTEM->${message}`;
    }
    const key = `${logon_id}_${parent}`;
    if (tracker.includes(key)) {
        return message;
    }
    tracker.push(key);
    let value = data[ key ];
    if (value === undefined) {
        return message;
    }
    if (Array.isArray(value)) {
        const real_value = duplicateIds(value, record);
        if (real_value === undefined) {
            return message;
        }
        value = real_value;
    }
    // The parent record cannot be newer/larget than the child process
    if (value.record >= record) {
        return message;
    }

    let updated_message = message;
    if (value.name !== "") {
        updated_message = `${value.name}->${message}`;
    }

    const next_parent = value.parent;
    const next_logon_id = value.login_id;
    return getParent(next_logon_id, next_parent, data, updated_message, tracker, value.record);
}

/**
 * When process IDs are reused we need to determine the closest one to our current child process based on the EventLog record number
 * @param values Array of `ProcTracker`
 * @param record Record number of child process
 * @returns `ProcTracker` object or undefined
 */
function duplicateIds(values: ProcTracker[], record: number): ProcTracker | undefined {
    const filter: ProcTracker[] = [];
    for (const value of values) {
        if (value.record >= record) {
            continue;
        }
        filter.push(value);
    }
    if (filter.length === 0) {
        return undefined;
    }
    if (filter.length === 1) {
        return filter[ 0 ];
    }

    // The parent record number closest to us we treat as our parent
    // Get the largest record in our filtered list
    let key = filter[ 0 ].record;
    for (const entry of filter) {
        if (entry.record > key) {
            key = entry.record;
        }
    }

    for (const entry of filter) {
        if (key !== entry.record) {
            continue;
        }
        return entry;
    }
    return undefined;
}