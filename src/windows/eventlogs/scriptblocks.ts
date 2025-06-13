import { RawBlock, Scriptblock } from "../../../types/windows/eventlogs/scriptblocks";
import { getEnvValue } from "../../environment/mod";
import { WindowsError } from "../errors";
import { getEventlogs } from "../eventlogs";

export function assembleScriptblocks(path?: string): Scriptblock[] | WindowsError {
    let log_path = path;
    if (log_path === undefined) {
        let drive = getEnvValue("SystemDrive");
        if (drive === "") {
            drive = "C:";
        }
        log_path = `${drive}\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-PowerShell%4Operational.evtx`;
    }

    let offset = 0;
    const limit = 500;
    const eid = 4104;

    let entries: Scriptblock[] = [];
    // Track scriptblocks
    const blocks: Record<string, RawBlock[]> = {};
    while (true) {
        const logs = getEventlogs(log_path, offset, limit);
        if (logs instanceof WindowsError) {
            return new WindowsError(
                "SCRIPTBLOCK",
                `failed to parse eventlog ${path}: ${logs}`,
            );
        }

        // If empty we are done. No more entries are in the log
        if (logs[ 1 ].length === 0) {
            break;
        }

        // Increase to next chunk of entries
        offset += limit;
        const data = logs[ 1 ] as RawBlock[];
        for (const entry of data) {
            if (entry.data.Event.System.EventID !== eid) {
                continue;
            }

            if (entry.data.Event.EventData.MessageTotal === 1) {
                const record: Scriptblock = {
                    total_parts: entry.data.Event.EventData.MessageTotal,
                    message: entry.data.Event.EventData.ScriptBlockText,
                    timestamp: entry.timestamp,
                    datetime_desc: "EventLog Entry Created",
                    entry_type: "windows:eventlog:scriptblock",
                    id: entry.data.Event.EventData.ScriptBlockId,
                    source_file: log_path,
                    path: entry.data.Event.EventData.Path,
                    script_length: entry.data.Event.EventData.ScriptBlockText.length,
                    has_signature_block: entry.data.Event.EventData.ScriptBlockText.includes("# SIG # End signature block"),
                    has_copyright_string: entry.data.Event.EventData.ScriptBlockText.includes("# Copyright "),
                    hostname: entry.data.Event.System.Computer,
                    version: entry.data.Event.System.Version,
                    activity_id: entry.data.Event.System.Correlation[ "#attributes" ].ActivityID,
                    channel: entry.data.Event.System.Channel,
                    user_id: entry.data.Event.System.Security[ "#attributes" ].UserID,
                    process_id: entry.data.Event.System.Execution[ "#attributes" ].ProcessID,
                    threat_id: entry.data.Event.System.Execution[ "#attributes" ].ThreadID,
                    system_time: entry.data.Event.System.TimeCreated[ "#attributes" ].SystemTime,
                    created_time: entry.timestamp,
                };
                entries.push(record);
                continue;
            }

            if (blocks[ entry.data.Event.EventData.ScriptBlockId ] !== undefined) {
                blocks[ entry.data.Event.EventData.ScriptBlockId ].push(entry);
                continue;
            }
            blocks[ entry.data.Event.EventData.ScriptBlockId ] = [ entry ];
        }
    }

    entries = entries.concat(constructBlocks(blocks, log_path));

    return entries;
}

/**
 * Function to combine multiple Scriptblock entries
 * @param data Array of `Record<string, RawBlock[]>` that contains our blocks we want to reassemble
 * @param source_file Path the evtx file
 * @returns Array of `Scriptblock`
 */
function constructBlocks(data: Record<string, RawBlock[]>, source_file: string): Scriptblock[] {
    const results: Scriptblock[] = [];

    for (const entry in data) {
        // Sort our blocks by block number. We do this to make sure we reassemble in correct order
        data[ entry ].sort((x, y) => x.data.Event.EventData.MessageNumber - y.data.Event.EventData.MessageNumber);
        const value: Scriptblock = {
            total_parts: 0,
            message: "",
            timestamp: "",
            datetime_desc: "EventLog Entry Created",
            entry_type: "windows:eventlog:scriptblock",
            id: "",
            source_file,
            path: "",
            script_length: 0,
            has_signature_block: false,
            has_copyright_string: false,
            hostname: "",
            version: 0,
            activity_id: "",
            channel: "",
            user_id: "",
            process_id: 0,
            threat_id: 0,
            system_time: "",
            created_time: ""
        };
        let message = "";
        for (const script of data[ entry ]) {
            // Only need this info once
            if (message.length === 0) {
                value.total_parts = script.data.Event.EventData.MessageTotal;
                value.timestamp = script.timestamp;
                value.id = script.data.Event.EventData.ScriptBlockId;
                value.path = script.data.Event.EventData.Path;
                value.hostname = script.data.Event.System.Computer;
                value.version = script.data.Event.System.Version;
                value.activity_id = script.data.Event.System.Correlation[ "#attributes" ].ActivityID;
                value.channel = script.data.Event.System.Channel;
                value.user_id = script.data.Event.System.Security[ "#attributes" ].UserID;
                value.process_id = script.data.Event.System.Execution[ "#attributes" ].ProcessID;
                value.threat_id = script.data.Event.System.Execution[ "#attributes" ].ThreadID;
                value.system_time = script.data.Event.System.TimeCreated[ "#attributes" ].SystemTime;
                value.created_time = script.timestamp;
            }
            message = message.concat(script.data.Event.EventData.ScriptBlockText);
        }

        value.message = message;
        value.script_length = message.length;
        value.has_signature_block = message.includes("# SIG # End signature block");
        value.has_copyright_string = message.includes("# Copyright ");
        results.push(value);
    }

    return results;
}