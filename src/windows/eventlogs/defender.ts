import { getEventlogs } from "../../../mod";
import { EventLogDefenderQuarantine, RawDefenderQuarantine } from "../../../types/windows/eventlogs/defender";
import { getEnvValue } from "../../environment/mod";
import { WindowsError } from "../errors";

/**
 * Function to extract Windows Defender quarantine events
 * @param alt_path Optional alternative path to `Microsoft-Windows-Windows Defender%4Operational.evtx`
 * @param [limit=10000] Set optional different limit for streaming events
 * @returns 
 */
export function defenderQuarantineEventLog(alt_path?: string, limit = 10000): EventLogDefenderQuarantine[] | WindowsError {
    let path = alt_path;

    if (path === undefined) {
        let drive = getEnvValue("SystemDrive");
        if (drive === "") {
            drive = "C:";
        }
        path = `${drive}\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-Windows Defender%4Operational.evtx`
    }

    const events: EventLogDefenderQuarantine[] = []
    let offset = 0;
    while (true) {
        // Get records 10000 at a time
        const logs = getEventlogs(path, offset, limit);
        if (logs instanceof WindowsError) {
            return new WindowsError(
                "LOGONS",
                `failed to parse eventlog ${path}: ${logs}`,
            );
        }
        const recordsData = logs[1];
        if (recordsData.length === 0) {
            break;
        }

        offset += limit;
        const records = recordsData as RawDefenderQuarantine[];

        // Loop through Event Log entries
        for (const record of records) {
            if (record.data.Event.System.EventID !== 1116 && record.data.Event.System.EventID !== 1117) {
                continue;
            }
            const event_data = record.data.Event.EventData;
            const action = record.data.Event.System.EventID === 1116 ? "Quarantined" : "Remediated"
            const value: EventLogDefenderQuarantine = {
                threat_name: event_data["Threat Name"],
                threat_id: Number(event_data["Threat ID"]),
                path: event_data.Path.split("_").slice(1).join("_"),
                thread_id: record.data.Event.System.Execution["#attributes"].ThreadID,
                process_id: record.data.Event.System.Execution["#attributes"].ProcessID,
                product_name: event_data["Product Name"],
                product_version: event_data["Product Version"],
                detection_id: event_data["Detection ID"],
                detection_time: event_data["Detection Time"],
                severity_id: Number(event_data["Severity ID"]),
                severity_name: event_data["Severity Name"],
                category_id: Number(event_data["Category ID"]),
                category_name: event_data["Category Name"],
                fwlink: event_data.FWLink,
                status_code: Number(event_data["Status Code"]),
                status_description: event_data["Status Description"],
                state: Number(event_data.State),
                source_id: Number(event_data["Source ID"]),
                source_name: event_data["Source Name"],
                process_name: event_data["Process Name"],
                detection_user: event_data["Detection User"],
                origin_id: Number(event_data["Origin ID"]),
                origin_name: event_data["Origin Name"],
                execution_id: Number(event_data["Execution ID"]),
                execution_name: event_data["Execution Name"],
                type_id: Number(event_data["Type ID"]),
                type_name: event_data["Type Name"],
                pre_execution_status: Number(event_data["Pre Execution Status"]),
                action_id: Number(event_data["Action ID"]),
                action_name: event_data["Action Name"],
                error_code: event_data["Error Code"],
                error_description: event_data["Error Description"].trim(),
                post_clean_status: Number(event_data["Post Clean Status"]),
                additional_actions_id: Number(event_data["Additional Actions ID"]),
                additional_actions_string: event_data["Additional Actions String"],
                remediation_user: event_data["Remediation User"],
                message: `Defender ${action} '${event_data.Path.split("_").slice(1).join("_")}'`,
                datetime: record.data.Event.System.TimeCreated["#attributes"].SystemTime,
                security_intelligence_version: event_data["Security intelligence Version"],
                av_version: "",
                anti_spyware_version: "",
                network_inspection_version: "",
                engine_version: event_data["Engine Version"],
                anti_malware_version: "",
                network_inspection_engine_version: "",
                event_id: record.data.Event.System.EventID,
                artifact: "Malware Detection",
                timestamp_desc: record.data.Event.System.EventID === 1116 ? "Malware Detected" : "Malware Remediated",
                data_type: "windows:eventlogs:defender:entry",
                evidence: path,
            };

            let versions = event_data["Security intelligence Version"].split(",");
            const av = versions.at(0);
            if (av !== undefined) {
                value.av_version = av.replace("AV: ", "").trim();
            }
            const spyware = versions.at(1);
            if (spyware !== undefined) {
                value.anti_spyware_version = spyware.replace("AS: ", "").trim();
            }
            const nis = versions.at(2);
            if (nis !== undefined) {
                value.network_inspection_version = nis.replace("NIS: ", "").trim();
            }

            versions = event_data["Engine Version"].split(",")
            const am = versions.at(0);
            if (am !== undefined) {
                value.anti_malware_version = am.replace("AM: ", "").trim();
            }
            const nis_engine = versions.at(1);
            if (nis_engine !== undefined) {
                value.network_inspection_engine_version = nis_engine.replace("NIS: ", "").trim();
            }

            events.push(value);
        }
    }

    return events;
}

/**
 * Function to test Windows Defender EventLogs parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows Defender EventLogs parsing
 */
export function testDefenderQuarantineEventLog(): void {
    const test = "../../tests/test_data/DFIRArtifactMuseum/eventlogs/Microsoft-Windows-Windows Defender%4Operational.evtx";
    const results = defenderQuarantineEventLog(test);
    if (results instanceof WindowsError) {
        throw results;
    }

    if (results.length !== 33) {
        throw `Got '${results.length}' expected "33".......defenderQuarantineEventLog ❌`;
    }

    if (results[4]?.category_name !== "Trojan") {
        throw `Got '${results[4]?.category_name}' expected "Trojan".......defenderQuarantineEventLog ❌`;
    }

    if (results[22]?.message !== "Defender Remediated 'pid:1364:237165111778183; process:_pid:1364,ProcessStart:132914198084076670'") {
        throw `Got '${results[22]?.message}' expected "Defender Remediated 'pid:1364:237165111778183; process:_pid:1364,ProcessStart:132914198084076670'".......defenderQuarantineEventLog ❌`;
    }

    if (results[15]?.anti_malware_version !== "1.1.18900.3") {
        throw `Got '${results[15]?.anti_malware_version}' expected "1.1.18900.3".......defenderQuarantineEventLog ❌`;
    }

    console.info(`  Function defenderQuarantineEventLog ✅`);
}