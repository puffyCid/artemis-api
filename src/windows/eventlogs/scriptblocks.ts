import { Accessor } from "../../../mod";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { RawBlock, Scriptblock } from "../../../types/windows/eventlogs/scriptblocks";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { WindowsError } from "../errors";
import { getEventlogs } from "../eventlogs";

/**
 * Function to assemble PowerShell scriptblocks
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to PowerShell Operational evtx file
 * @returns Array of `Scriptblock` or `WindowsError`
 */
export function assembleScriptblocks(protocol = AccessorProtocol.Host, alt_path?: string): Scriptblock[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();

    let path = `${drive}\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-PowerShell%4Operational.evtx`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    // Based on the `AccessorProtocol` glob for Security.evtx files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('SCRIPTBLOCK', `failed to glob for ${path}: ${matches}`);
    }

    let entries: Scriptblock[] = [];

    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }
        let offset = 0;
        const limit = 500;
        const eid = 4104;

        // Track scriptblocks
        const blocks: Record<string, RawBlock[]> = {};
        while (true) {
            const logs = getEventlogs(entry.handle as FileHandle, offset, limit);
            if (logs instanceof WindowsError) {
                return new WindowsError(
                    "SCRIPTBLOCK",
                    `failed to parse eventlog ${path}: ${logs}`,
                );
            }

            // If empty we are done. No more entries are in the log
            if (logs[1].length === 0) {
                break;
            }

            // Increase to next chunk of entries
            offset += limit;
            const data = logs[1] as unknown as RawBlock[];
            for (const event of data) {
                if (event.data.Event.System.EventID !== eid) {
                    continue;
                }

                if (event.data.Event.EventData.MessageTotal === 1) {
                    const record: Scriptblock = {
                        total_parts: event.data.Event.EventData.MessageTotal,
                        message: event.data.Event.EventData.ScriptBlockText,
                        datetime: event.timestamp,
                        timestamp_desc: "EventLog Entry Created",
                        data_type: "windows:eventlogs:powershell:scriptblock:entry",
                        id: event.data.Event.EventData.ScriptBlockId,
                        path: event.data.Event.EventData.Path,
                        script_length: event.data.Event.EventData.ScriptBlockText.length,
                        has_signature_block: event.data.Event.EventData.ScriptBlockText.includes("# SIG # End signature block"),
                        has_copyright_string: event.data.Event.EventData.ScriptBlockText.includes("# Copyright "),
                        hostname: event.data.Event.System.Computer,
                        version: event.data.Event.System.Version,
                        activity_id: event.data.Event.System.Correlation["#attributes"].ActivityID,
                        channel: event.data.Event.System.Channel,
                        user_id: event.data.Event.System.Security["#attributes"].UserID,
                        process_id: event.data.Event.System.Execution["#attributes"].ProcessID,
                        threat_id: event.data.Event.System.Execution["#attributes"].ThreadID,
                        system_time: event.data.Event.System.TimeCreated["#attributes"].SystemTime,
                        created_time: event.timestamp,
                        artifact: "Windows PowerShell Scriptblock",
                        evidence: entry.meta.display_path,
                    };
                    entries.push(record);
                    continue;
                }

                if (blocks[event.data.Event.EventData.ScriptBlockId] !== undefined) {
                    blocks[event.data.Event.EventData.ScriptBlockId].push(event);
                    continue;
                }
                blocks[event.data.Event.EventData.ScriptBlockId] = [event];
            }
        }
        entries = entries.concat(constructBlocks(blocks, entry.meta.display_path));
    }




    return entries;
}

/**
 * Function to combine multiple Scriptblock entries
 * @param data Array of `Record<string, RawBlock[]>` that contains our blocks we want to reassemble
 * @param evidence Path the evtx file
 * @returns Array of `Scriptblock`
 */
function constructBlocks(data: Record<string, RawBlock[]>, evidence: string): Scriptblock[] {
    const results: Scriptblock[] = [];

    for (const entry in data) {
        if (data[entry] === undefined) {
            continue;
        }
        // Sort our blocks by block number. We do this to make sure we reassemble in correct order
        data[entry].sort((x, y) => x.data.Event.EventData.MessageNumber - y.data.Event.EventData.MessageNumber);
        const value: Scriptblock = {
            total_parts: 0,
            message: "",
            datetime: "",
            timestamp_desc: "EventLog Entry Created",
            id: "",
            evidence,
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
            created_time: "",
            artifact: "Windows PowerShell Scriptblock",
            data_type: "windows:eventlogs:powershell:scriptblock:entry"
        };
        let message = "";
        for (const script of data[entry]) {
            // Only need this info once
            if (message.length === 0) {
                value.total_parts = script.data.Event.EventData.MessageTotal;
                value.datetime = script.timestamp;
                value.id = script.data.Event.EventData.ScriptBlockId;
                value.path = script.data.Event.EventData.Path;
                value.hostname = script.data.Event.System.Computer;
                value.version = script.data.Event.System.Version;
                value.activity_id = script.data.Event.System.Correlation["#attributes"].ActivityID;
                value.channel = script.data.Event.System.Channel;
                value.user_id = script.data.Event.System.Security["#attributes"].UserID;
                value.process_id = script.data.Event.System.Execution["#attributes"].ProcessID;
                value.threat_id = script.data.Event.System.Execution["#attributes"].ThreadID;
                value.system_time = script.data.Event.System.TimeCreated["#attributes"].SystemTime;
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