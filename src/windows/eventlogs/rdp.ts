import { Raw21Logons, Raw23Logoff, Raw25Reconnect, Raw24Disconnect, Raw41SessionStart, Raw42SessionEnd, RdpActivity } from "../../../types/windows/eventlogs/rdp";
import { getEnvValue } from "../../environment/mod";
import { WindowsError } from "../errors";
import { getEventlogs } from "../eventlogs";

/**
 * Function to parse RDP logons
 * @param alt_file Optional alternative path to `Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx`
 * @returns Array of `RdpActivity` or `WindowsError`
 */
export function rdpLogons(alt_file?: string): RdpActivity[] | WindowsError {
    let path = alt_file;
    // If no evtx file provided. Then try to find it on local system
    if (path === undefined) {
        let drive = getEnvValue("SystemDrive");
        if (drive === "") {
            drive = "C:";
        }
        path = `${drive}\\Windows\\System32\\winevt\\Logs\\Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx`;
    }

    const logs = rdpLogs(path);
    if (logs instanceof WindowsError) {
        return new WindowsError(`RDPLOGONS`, `failed to parse RDP eventlogs: ${logs}`);
    }

    return createSessions(logs);
}

interface RdpEvents {
    logons: Raw21Logons[];
    reconnects: Raw25Reconnect[];
    disconnect: Raw24Disconnect[];
    logoffs: Raw23Logoff[];
    session_start: Raw41SessionStart[];
    session_end: Raw42SessionEnd[];
}

/**
 * Parse the EventLog and extract specific RDP log entries
 * @param path Path to the `Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx` file
 * @returns Parsed `RdpEvents` or `WindowsError`
 */
function rdpLogs(path: string): RdpEvents | WindowsError {
    const rdp_events: RdpEvents = {
        logons: [],
        reconnects: [],
        disconnect: [],
        logoffs: [],
        session_start: [],
        session_end: [],
    };

    let offset = 0;
    const limit = 500;
    while (true) {
        // We do not need the EventLog provider strings. The raw RDP logs will be sufficient
        const events = getEventlogs(path, offset, limit);
        if (events instanceof WindowsError) {
            return events;
        }
        offset += limit;

        // `getEventlogs` returns a tuple. The second value contains our raw eventlog data
        // First value is empty because we did not enable provider strings
        const records = events[1];
        if (records.length === 0 || records.length < limit) {
            break;
        }

        // Get the specific RDP event IDs we want
        for (const entry of records) {
            // Only keep RDP logs we can use to create sessions
            if (isLogon(entry as Raw21Logons)) {
                rdp_events.logons.push(entry as Raw21Logons);
            } else if (isReconnect(entry as Raw25Reconnect)) {
                rdp_events.reconnects.push(entry as Raw25Reconnect);
            } else if (isLogoff(entry as Raw23Logoff)) {
                rdp_events.logoffs.push(entry as Raw23Logoff);
            } else if (isSessionStart(entry as Raw41SessionStart)) {
                rdp_events.session_start.push(entry as Raw41SessionStart);
            } else if (isSessionEnd(entry as Raw42SessionEnd)) {
                rdp_events.session_end.push(entry as Raw42SessionEnd);
            } else if (isDisconnect(entry as Raw24Disconnect)) {
                rdp_events.disconnect.push(entry as Raw24Disconnect);
            }
        }
    }

    return rdp_events;
}

/**
 * Check if this is a RDP logon event
 * @param record `Raw21Logons` eventlog object
 * @returns true if the eventlog record is 21 Logon event
 */
function isLogon(record: Raw21Logons): record is Raw21Logons {
    if (record.data.Event.System.EventID === 21) {
        return true;
    }

    return false;
}

/**
 * Check if this is a RDP reconnect event
 * @param record `Raw25Reconnect` eventlog object
 * @returns true if the eventlog record is 25 reconnect event
 */
function isReconnect(record: Raw25Reconnect): record is Raw25Reconnect {
    if (record.data.Event.System.EventID === 25) {
        return true;
    }

    return false;
}

/**
 * Check if this is a RDP disconnect event
 * @param record `Raw24Disconnect` eventlog object
 * @returns true if the eventlog record is 24 disconnect event
 */
function isDisconnect(record: Raw24Disconnect): record is Raw24Disconnect {
    if (record.data.Event.System.EventID === 24) {
        return true;
    }

    return false;
}

/**
 * Check if this is a RDP session start event
 * @param record `Raw41SessionStart` eventlog object
 * @returns true if the eventlog record is 41 session start event
 */
function isSessionStart(record: Raw41SessionStart): record is Raw41SessionStart {
    if (record.data.Event.System.EventID === 41) {
        return true;
    }

    return false;
}

/**
 * Check if this is a RDP session end event
 * @param record `Raw42SessionEnd` eventlog object
 * @returns true if the eventlog record is 42 session end event
 */
function isSessionEnd(record: Raw42SessionEnd): record is Raw42SessionEnd {
    if (record.data.Event.System.EventID === 42) {
        return true;
    }

    return false;
}

/**
 * Check if this is a RDP logoff event
 * @param record `Raw23Logoff` eventlog object
 * @returns true if the eventlog record is 23 logoff event
 */
function isLogoff(record: Raw23Logoff): record is Raw23Logoff {
    if (record.data.Event.System.EventID === 23) {
        return true;
    }

    return false;
}

/**
 * Function to attempt to correlate RDP activity
 * @param events `RdpEvents` object containing our RDP event records
 * @returns Array of `RdpActivity`
 */
function createSessions(events: RdpEvents): RdpActivity[] {
    let values: RdpActivity[] = [];

    // Check for successful logons first
    for (const logon of events.logons) {
        const logon_event = logon.data.Event.UserData.EventXML;
        // RDP sessions *should* have same EventLog correlation activity ID. However upon reconnection the activity ID changes
        // So it cannot be used to track reconnected sessions
        const event: RdpActivity = {
            session_id: logon_event.SessionID,
            user: logon_event.User,
            domain: logon_event.User.split("\\").at(0) ?? "Unknown",
            account: logon_event.User.split("\\").at(1) ?? "Unknown",
            source_ip: logon_event.Address,
            logon_time: logon.data.Event.System.TimeCreated["#attributes"].SystemTime,
            logoff_time: "",
            hostname: logon.data.Event.System.Computer,
            duration: 0,
            message: `RDP Logon by ${logon_event.User} from ${logon_event.Address}`,
            datetime: logon.timestamp,
            timestamp_desc: "RDP Logon",
            artifact: "RDP EventLog",
            reconnections: 0,
            disconnections: 0,
            session_arbitration_started: "",
            session_arbitration_ended: "",
            data_type: "windows:eventlogs:rdp:entry"
        };

        // RDP logons start with a session start event
        for (const session of events.session_start) {
            const session_event = session.data.Event.UserData.EventXML.SessionID;
            if (session_event !== logon_event.SessionID) {
                continue;
            }

            /**
             * The Session starts before the logon event.
             * If the session event record ID is larger than the logon event record ID
             * We are dealing with a new session that is reusing the session ID
             * Happens when systems reboot
             */
            if (session.event_record_id > logon.event_record_id) {
                break;
            }
            event.session_arbitration_started = session.data.Event.System.TimeCreated["#attributes"].SystemTime;
            break;
        }

        // Find RDP session ending 
        for (const session of events.session_end) {
            const session_event = session.data.Event.UserData.EventXML.SessionID;
            if (session_event !== logon_event.SessionID) {
                continue;
            }

            /**
             * The Logon starts before the session end event.
             * If the Logon event record ID is larger than the session end event record ID
             * We are dealing with a new logon that is reusing the session ID
             * Happens when systems reboot
             */
            if (session.event_record_id > logon.event_record_id) {
                break;
            }
            event.session_arbitration_ended = session.data.Event.System.TimeCreated["#attributes"].SystemTime;
            break;
        }

        // Now find logoff event
        for (const logoff of events.logoffs) {
            const logoff_event = logoff.data.Event.UserData.EventXML;

            if (logoff_event.SessionID !== logon_event.SessionID) {
                continue;
            }

            /**
             * The logon starts before the logoff event.
             * If the logon event record ID is larger than the logoff event record ID
             * We are dealing with a new logon that is reusing the session ID
             * Happens when systems reboot
             */
            if (logon.event_record_id > logoff.event_record_id) {
                break;
            }

            event.logoff_time = logoff.data.Event.System.TimeCreated["#attributes"].SystemTime;
            break;
        }

        // Nanosecond precision is not supported for Date extraction
        // Quick convert to second precision
        const end = new Date(`${event.logoff_time.split(".").at(0) ?? ""}Z`).getTime();
        const start = new Date(`${event.logon_time.split(".").at(0) ?? ""}Z`).getTime();
        const duration = end - start;
        const seconds = 1000;
        if (!isNaN(duration)) {
            event.duration = Number(duration / seconds);
        }

        // Now find disconnect events
        for (const disconnect of events.disconnect) {
            const disconnect_event = disconnect.data.Event.UserData.EventXML;
            if (disconnect_event.SessionID !== logon_event.SessionID) {
                continue;
            }

            /**
             * The logon starts before the disconnect event.
             * If the logon event record ID is larger than the disconnect event record ID
             * We are dealing with a new logon that is reusing the session ID
             * Happens when systems reboot
             */
            if (logon.event_record_id > disconnect.event_record_id) {
                break;
            }

            event.disconnections += 1;
        }

        const reconnects: RdpActivity[] = [];
        /**
         * Now find reconnect events
         * Reconnections may come from a different IP so we treat them as a separate entry
         */
        for (const reconnect of events.reconnects) {
            const reconnect_event = reconnect.data.Event.UserData.EventXML;
            if (reconnect_event.SessionID !== logon_event.SessionID) {
                continue;
            }

            /**
             * The logon starts before the reconnect event.
             * If the logon event record ID is larger than the reconnect event record ID
             * We are dealing with a new logon that is reusing the session ID
             * Happens when systems reboot
             */
            if (logon.event_record_id > reconnect.event_record_id) {
                break;
            }

            const reconnect_value = Object.assign({}, event);
            reconnect_value.datetime = reconnect.data.Event.System.TimeCreated["#attributes"].SystemTime;
            reconnect_value.source_ip = reconnect_event.Address;
            reconnect_value.timestamp_desc = "RDP Reconnect";
            reconnect_value.message = `RDP Reconnect by ${reconnect_value.user} from ${reconnect_value.source_ip}`;
            reconnects.push(reconnect_value);

            event.reconnections += 1;
        }

        // Now ensure our reconnects have same reconnections count
        for (let i = 0; i < reconnects.length; i++) {
            const count = reconnects[i];
            if (count === undefined) {
                continue;
            }
            count.reconnections = event.reconnections;
        }

        // Add the logon event
        values.push(event);
        // Concat all reconnect events
        values = values.concat(reconnects);

    }

    return values;
}

/**
 * Function to test Windows RDP Logons parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows RDP Logons parsing
 */
export function testRdpLogons(): void {

}