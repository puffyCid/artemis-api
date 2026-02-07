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

    return extractRdp(logs);
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
        if (records.length === 0) {
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
 * Extract RDP events into Timesketch compatible format
 * @param events Object of `RdpEvents`
 * @returns Array of `RdpActivity`
 */
function extractRdp(events: RdpEvents): RdpActivity[] {
    const values: RdpActivity[] = [];
    for (const entry of events.logons) {
        const data = entry.data.Event.UserData.EventXML;
        const value: RdpActivity = {
            session_id: data.SessionID,
            user: data.User,
            domain: data.User.split("\\").at(0) ?? "Unknown",
            account: data.User.split("\\").at(1) ?? "Unknown",
            source_ip: data.Address,
            hostname: entry.data.Event.System.Computer,
            activity_id: entry.data.Event.System.Correlation?.["#attributes"].ActivityID ?? "None",
            message: `RDP Logon by ${data.User} from ${data.Address}`,
            datetime: entry.data.Event.System.TimeCreated["#attributes"].SystemTime,
            timestamp_desc: "RDP Logon",
            artifact: "RDP EventLog",
            data_type: "windows:eventlogs:rdp:entry"
        };
        values.push(value);
    }

    for (const entry of events.logoffs) {
        const data = entry.data.Event.UserData.EventXML;
        const value: RdpActivity = {
            session_id: data.SessionID,
            user: data.User,
            domain: data.User.split("\\").at(0) ?? "Unknown",
            account: data.User.split("\\").at(1) ?? "Unknown",
            source_ip: "None",
            hostname: entry.data.Event.System.Computer,
            activity_id: entry.data.Event.System.Correlation?.["#attributes"].ActivityID ?? "None",
            message: `RDP Logoff by ${data.User}`,
            datetime: entry.data.Event.System.TimeCreated["#attributes"].SystemTime,
            timestamp_desc: "RDP Logoff",
            artifact: "RDP EventLog",
            data_type: "windows:eventlogs:rdp:entry"
        };
        values.push(value);
    }

    for (const entry of events.disconnect) {
        const data = entry.data.Event.UserData.EventXML;
        const value: RdpActivity = {
            session_id: data.SessionID,
            user: data.User,
            domain: data.User.split("\\").at(0) ?? "Unknown",
            account: data.User.split("\\").at(1) ?? "Unknown",
            source_ip: data.Address,
            hostname: entry.data.Event.System.Computer,
            activity_id: entry.data.Event.System.Correlation?.["#attributes"].ActivityID ?? "None",
            message: `RDP Disconnect by ${data.User} from ${data.Address}`,
            datetime: entry.data.Event.System.TimeCreated["#attributes"].SystemTime,
            timestamp_desc: "RDP Disconnect",
            artifact: "RDP EventLog",
            data_type: "windows:eventlogs:rdp:entry"
        };
        values.push(value);
    }

    for (const entry of events.reconnects) {
        const data = entry.data.Event.UserData.EventXML;
        const value: RdpActivity = {
            session_id: data.SessionID,
            user: data.User,
            domain: data.User.split("\\").at(0) ?? "Unknown",
            account: data.User.split("\\").at(1) ?? "Unknown",
            source_ip: data.Address,
            hostname: entry.data.Event.System.Computer,
            activity_id: entry.data.Event.System.Correlation?.["#attributes"].ActivityID ?? "None",
            message: `RDP Reconnect by ${data.User} from ${data.Address}`,
            datetime: entry.data.Event.System.TimeCreated["#attributes"].SystemTime,
            timestamp_desc: "RDP Reconnect",
            artifact: "RDP EventLog",
            data_type: "windows:eventlogs:rdp:entry"
        };
        values.push(value);
    }

    return values;
}


/**
 * Function to test Windows RDP Logons parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows RDP Logons parsing
 */
export function testRdpLogons(): void {
    const test = "../../tests/test_data/windows/eventlogs/Microsoft-Windows-TerminalServices-LocalSessionManager%4Operational.evtx";
    const results = rdpLogons(test);
    if (results instanceof WindowsError) {
        throw results;
    }

    if (results.length != 59) {
        throw `Got ${results.length} RDP events, expected 59.......rdpLogons ❌`;
    }
    if (results[1] === undefined) {
        throw `Got undefined RDP event.......rdpLogons ❌`;
    }

    if (results[1].datetime != "2025-07-10T00:36:56.762711Z") {
        throw `Got ${results[1].datetime} for logon time, expected "2025-07-10T00:36:56.762711Z".......rdpLogons ❌`;
    }

    console.info(`  Function rdpLogons ✅`);

    const logoff = `{"event_record_id":84336,"timestamp":"2025-08-31T03:07:39.322481000Z","data":{"Event":{"#attributes":{"xmlns":"http://schemas.microsoft.com/win/2004/08/events/event"},"System":{"Provider":{"#attributes":{"Name":"Microsoft-Windows-Security-Auditing","Guid":"54849625-5478-4994-A5BA-3E3B0328C30D"}},"EventID":4634,"Version":0,"Level":0,"Task":12545,"Opcode":0,"Keywords":"0x8020000000000000","TimeCreated":{"#attributes":{"SystemTime":"2025-08-31T03:07:39.322481Z"}},"EventRecordID":84336,"Correlation":null,"Execution":{"#attributes":{"ProcessID":876,"ThreadID":2132}},"Channel":"Security","Computer":"win","Security":null},"EventData":{"TargetUserSid":"S-1-5-96-0-1","TargetUserName":"UMFD-1","TargetDomainName":"Font Driver Host","TargetLogonId":"0x1381d","LogonType":2}}}}`;
    if (isLogoff(JSON.parse(logoff))) {
        throw `Got good logoff event with bad data.......isLogoff ❌`;
    }

    console.info(`  Function isLogoff ✅`);


    if (isLogon(JSON.parse(logoff))) {
        throw `Got good logon event with bad data.......isLogon ❌`;
    }

    console.info(`  Function isLogon ✅`);


    if (isDisconnect(JSON.parse(logoff))) {
        throw `Got good disconnect event with bad data.......isDisconnect ❌`;
    }

    console.info(`  Function isDisconnect ✅`);


    if (isReconnect(JSON.parse(logoff))) {
        throw `Got good reconnect event with bad data.......isReconnect ❌`;
    }

    console.info(`  Function isReconnect ✅`);

    const mock = extractRdp({
        logons: [{
            event_record_id: 0,
            timestamp: "",
            data: {
                Event: {
                    "#attributes": {
                        xmlns: ""
                    },
                    System: {
                        Provider: {
                            "#attributes": {
                                Name: "",
                                Guid: ""
                            }
                        },
                        EventID: 21,
                        Version: 0,
                        Level: 0,
                        Task: 0,
                        Opcode: 0,
                        Keywords: "",
                        TimeCreated: {
                            "#attributes": {
                                SystemTime: ""
                            }
                        },
                        EventRecordID: 0,
                        Correlation: null,
                        Channel: "",
                        Computer: "",
                        Security: undefined
                    },
                    UserData: {
                        EventXML: {
                            User: "",
                            SessionID: 0,
                            Address: "",
                            "#attributes": {
                                xmlns: ""
                            }
                        }
                    }
                }
            }
        }],
        reconnects: [],
        disconnect: [],
        logoffs: [],
        session_start: [],
        session_end: []
    });

    if (mock.length !== 1) {
        throw `Got ${results.length} RDP events, expected 1.......extractRdp ❌`;
    }

    console.info(`  Function extractRdp ✅`);
}