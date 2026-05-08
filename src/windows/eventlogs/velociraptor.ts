import { getEventlogs } from "../eventlogs";
import { VeloExecution, VeloRaw } from "../../../types/windows/eventlogs/velociraptor";
import { getSystemDrive } from "../../environment/env";
import { WindowsError } from "../errors";

/**
 * Function to extract executed Velociraptor commands from the EventLog
 * @param alt_path Optional alternative path to Application.evtx file
 * @param limit Optional limit to use when iterating through the EventLog
 * @returns Array of `VeloExecution` or `WindowsError`
 */
export function veloCommands(alt_path?: string, limit = 10000): VeloExecution[] | WindowsError {
    const drive = getSystemDrive();
    let path = `${drive}\\Windows\\System32\\winevt\\Logs\\Application.evtx`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    let offset = 0;
    const values: VeloExecution[] = [];
    while (true) {
        const logs = getEventlogs(path, offset, limit);
        if (logs instanceof WindowsError) {
            return new WindowsError(
                "EVENTLOG_VELOCIRAPTOR",
                `failed to parse eventlog ${path}: ${logs}`,
            );
        }

        const recordsData = logs[1];
        if (recordsData.length === 0) {
            break;
        }

        const records = recordsData as unknown as VeloRaw[];
        for (const record of records) {
            if (!isVelo(record)) {
                continue;
            }
            const event_data = record.data.Event.EventData.Data["#text"];
            const command: string[] = JSON.parse(event_data.replace("Velociraptor startup ARGV: ", ""));
            const entry: VeloExecution = {
                evidence: path,
                pid: record.data.Event.System.Execution["#attributes"].ProcessID,
                message: `Velociraptor executed '${command.join(" ")}'`,
                datetime: record.data.Event.System.TimeCreated["#attributes"].SystemTime,
                provider: record.data.Event.System.Provider["#attributes"].Name,
                event_id: record.data.Event.System.EventID["#text"],
                thread_id: record.data.Event.System.Execution["#attributes"].ThreadID,
                event: event_data,
                path: command.at(0) ?? "Unknown path",
                arguments: [],
                timestamp_desc: "Velociraptor Executed",
                artifact: "Velociraptor EventLog",
                data_type: "windows:eventlogs:velociraptor:entry"
            };

            if (command.length > 1) {
                entry.arguments = command.slice(1);
            }

            values.push(entry);
        }
        offset += limit;

    }

    return values;
}

/**
 * Function to verify the EventLog entry is a Velociraptor event
 * @param record `VeloRaw` object
 * @returns Verification that the EventLog entry is a valid entry associated with Velociraptor
 */
function isVelo(record: VeloRaw): record is VeloRaw {
    if (record.data.Event.System.EventID["#text"] === 1000 && JSON.stringify(record.data.Event.EventData).includes("Velociraptor startup ")) {
        return true;
    }
    return false;
}