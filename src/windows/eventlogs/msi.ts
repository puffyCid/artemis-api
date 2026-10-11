import { Accessor, getEventlogs } from "../../../mod";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { MsiInstalled, RawMsiInstalled } from "../../../types/windows/eventlogs/msi";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { WindowsError } from "../errors";

/**
 * Function to extract installed MSI applications
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to `Application.evtx`
 * @param [limit=10000] Set optional different limit for streaming events
 * @returns 
 */
export function msiInstalled(protocol = AccessorProtocol.Host, alt_path?: string, limit = 10000): MsiInstalled[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();

    let path = `${drive}\\Windows\\System32\\winevt\\Logs\\Application.evtx`;
    if (alt_path !== undefined) {
        path = alt_path;
    }


    // Based on the `AccessorProtocol` glob for Security.evtx files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('EVENTLOG_MSI_INSTALLED', `failed to glob for ${path}: ${matches}`);
    }

    const events: MsiInstalled[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }
        let offset = 0;
        while (true) {
            // Get records 10000 at a time
            const logs = getEventlogs(entry.handle as FileHandle, offset, limit);
            if (logs instanceof WindowsError) {
                return new WindowsError(
                    "EVENTLOG_MSI_INSTALLED",
                    `failed to parse eventlog ${path}: ${logs}`,
                );
            }
            const recordsData = logs[1] as unknown as RawMsiInstalled[];

            offset += limit;

            for (const event of recordsData) {
                if (typeof event.data.Event.System.EventID !== 'object' || typeof event.data.Event.System.Provider !== 'object') {
                    continue;
                }
                if (event.data.Event.System.EventID["#text"] !== 1033 || event.data.Event.System.Provider["#attributes"].Name !== "MsiInstaller") {
                    continue;
                }

                const entry_event = event.data.Event.System;
                const entry_data = event.data.Event.EventData;
                const value: MsiInstalled = {
                    name: entry_data.Data["#text"].at(0) ?? "Unknown",
                    language: Number(entry_data.Data["#text"].at(2) ?? 0),
                    version: entry_data.Data["#text"].at(1) ?? "Unknown",
                    manufacturer: entry_data.Data["#text"].at(4) ?? "Unknown",
                    installation_status: Number(entry_data.Data["#text"].at(3) ?? 0),
                    hostname: entry_event.Computer,
                    sid: entry_event.Security["#attributes"].UserID,
                    pid: entry_event.Execution["#attributes"].ProcessID,
                    thread_id: entry_event.Execution["#attributes"].ThreadID,
                    message: `MSI '${entry_data.Data["#text"].at(0) ?? "Unknown"}' installed`,
                    datetime: event.timestamp,
                    timestamp_desc: "MSI Installed",
                    artifact: "EventLog MSI Installed 1033",
                    data_type: "windows:eventlog:application:msi",
                    evidence: entry.meta.display_path,
                };
                events.push(value);
            }
            if (recordsData.length < limit) {
                break;
            }
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
    const results = msiInstalled(AccessorProtocol.Host, test);
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