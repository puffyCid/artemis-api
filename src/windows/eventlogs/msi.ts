import { getEventlogs } from "../../../mod";
import { MsiInstalled, RawMsiInstalled } from "../../../types/windows/eventlogs/msi";
import { getEnvValue } from "../../environment/mod";
import { WindowsError } from "../errors";

/**
 * Function to extract installed MSI applications
 * @param alt_path Optional alternative path to `Application.evtx`
 * @param [limit=10000] Set optional different limit for streaming events
 * @returns 
 */
export function msiInstalled(alt_path?: string, limit = 10000): MsiInstalled[] | WindowsError {
    let path = alt_path;

    if (path === undefined) {
        let drive = getEnvValue("SystemDrive");
        if (drive === "") {
            drive = "C:";
        }
        path = `${drive}\\Windows\\System32\\winevt\\Logs\\Application.evtx`
    }

    const events: MsiInstalled[] = []
    let offset = 0;
    while (true) {
        // Get records 10000 at a time
        const logs = getEventlogs(path, offset, limit);
        if (logs instanceof WindowsError) {
            return new WindowsError(
                "EVENTLOG_MSI_INSTALLED",
                `failed to parse eventlog ${path}: ${logs}`,
            );
        }
        const recordsData = logs[1] as RawMsiInstalled[];

        offset += limit

        for (const entry of recordsData) {
            if (typeof entry.data.Event.System.EventID !== 'object' || typeof entry.data.Event.System.Provider !== 'object') {
                continue;
            }
            if (entry.data.Event.System.EventID["#text"] !== 1033 || entry.data.Event.System.Provider["#attributes"].Name !== "MsiInstaller") {
                continue;
            }

            const entry_event = entry.data.Event.System;
            const entry_data = entry.data.Event.EventData
            const value: MsiInstalled = {
                name: entry_data.Data["#text"].at(0) ?? "Unkonwn",
                language: Number(entry_data.Data["#text"].at(2) ?? 0),
                version: entry_data.Data["#text"].at(1) ?? "Unkonwn",
                mnufacturer: entry_data.Data["#text"].at(4) ?? "Unkonwn",
                installation_status: Number(entry_data.Data["#text"].at(3) ?? 0),
                hostname: entry_event.Computer,
                sid: entry_event.Security["#attributes"].UserID,
                pid: entry_event.Execution["#attributes"].ProcessID,
                thread_id: entry_event.Execution["#attributes"].ThreadID,
                message: `MSI '${entry_data.Data["#text"].at(0) ?? "Unkonwn"}' installed`,
                datetime: entry.timestamp,
                timestamp_desc: "MSI Installed",
                artifact: "EventLog MSI Installed 1033",
                data_type: "windows:eventlog:application:msi",
                evidence: path,
            };
            events.push(value);
        }
        if (recordsData.length < limit) {
            break;
        }
    }

    return events;
}

/**
 * Function to test Windows MSI Installed EventLogs parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows MSI Installed EventLogs parsing
 */
export function testMsiInstalled(): void {
    const test = "../../tests/test_data/DFIRArtifactMuseum/eventlogs/Application.evtx";
    const results = msiInstalled(test);
    if (results instanceof WindowsError) {
        throw results;
    }

    if (results.length !== 6) {
        throw `Got '${results.length}' expected "6".......msiInstalled ❌`;
    }

    if (results[4]?.name !== "VMware Tools") {
        throw `Got '${results[4]?.name}' expected "VMware Tools".......msiInstalled ❌`;
    }

    if (results[5]?.message !== "MSI 'Microsoft Update Health Tools' installed") {
        throw `Got '${results[5]?.message}' expected "MSI 'Microsoft Update Health Tools' installed".......msiInstalled ❌`;
    }

    if (results[2]?.version !== "14.28.29913") {
        throw `Got '${results[2]?.version}' expected "14.28.29913".......msiInstalled ❌`;
    }

    console.info(`  Function msiInstalled ✅`);
}