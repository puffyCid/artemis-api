import {
  LogonsWindows,
  LogonType,
  Raw4624Logons,
  Raw4634Logoffs,
} from "../../../types/windows/eventlogs/logons";
import { WindowsError } from "../errors";
import { getEventlogs } from "../eventlogs";

/**
 * Function to parse Logon and Logoff events from Security.evtx file
 * @param path Path to Security.evtx file
 * @returns Array of `LogonsWindows` entries
 */
export function logonsWindows(path: string): LogonsWindows[] | WindowsError {
  let offset = 0;
  const limit = 10000;
  const logon_entries: LogonsWindows[] = [];

  const logon_eid = 4624;
  const logoff_eid = 4634;

  while (true) {
    // Get records 10000 at a time
    const logs = getEventlogs(path, offset, limit);
    if (logs instanceof WindowsError) {
      return new WindowsError(
        "LOGONS",
        `failed to parse eventlog ${path}: ${logs}`,
      );
    }
    const recordsData = logs[ 1 ];
    if (recordsData.length === 0) {
      break;
    }

    offset += limit;

    const records = recordsData as Raw4624Logons[] | Raw4634Logoffs[];
    // Loop through Event Log entries
    for (const record of records) {
      // Parse Logon entries
      if (record.data.Event.System.EventID === logon_eid && isLogon(record)) {
        const logon_event = record.data.Event.EventData;
        const entry: LogonsWindows = {
          logon_type: checkLogonType(logon_event.LogonType),
          sid: logon_event.TargetUserSid,
          account_name: logon_event.TargetUserName,
          account_domain: logon_event.TargetDomainName,
          logon_id: logon_event.TargetLogonId,
          logon_process: logon_event.LogonProcessName,
          authentication_package: logon_event.AuthenticationPackageName,
          source_ip: logon_event.IpAddress,
          source_workstation: logon_event.WorkstationName,
          eventlog_generated: record.data.Event.System.TimeCreated[ "#attributes" ].SystemTime,
          message: `Logon by ${logon_event.TargetUserName} from ${logon_event.IpAddress}`,
          datetime: record.data.Event.System.TimeCreated[ "#attributes" ].SystemTime,
          timestamp_desc: "Account Logon",
          artifact: "Logon EventLog",
          data_type: "windows:eventlogs:logon:entry"
        };
        logon_entries.push(entry);
      } else if (
        record.data.Event.System.EventID === logoff_eid && isLogoff(record)
      ) {
        const logon_event = record.data.Event.EventData;
        const entry: LogonsWindows = {
          logon_type: checkLogonType(logon_event.LogonType),
          sid: logon_event.TargetUserSid,
          account_name: logon_event.TargetUserName,
          account_domain: logon_event.TargetDomainName,
          logon_id: logon_event.TargetLogonId,
          logon_process: "",
          authentication_package: "",
          source_ip: "",
          source_workstation: "",
          eventlog_generated: record.data.Event.System.TimeCreated[ "#attributes" ].SystemTime,
          message: `Logoff by ${logon_event.TargetUserName}`,
          datetime: record.data.Event.System.TimeCreated[ "#attributes" ].SystemTime,
          timestamp_desc: "Account Logoff",
          artifact: "Logoff EventLog",
          data_type: "windows:eventlogs:logoff:entry"
        };
        logon_entries.push(entry);
      }
    }
  }

  return logon_entries;
}

/**
 * Function to determine if a EventLog entry is a logon event
 * @param record `Raw4624Logons` or `Raw4634Logoffs`
 * @returns boolean if record is `Raw4624Logons`
 */
function isLogon(
  record: Raw4624Logons | Raw4634Logoffs,
): record is Raw4624Logons {
  if (record.data.Event.System.EventID === 4624) {
    return true;
  }
  return false;
}

/**
 * Function to determine if a EventLog entry is a logoff event
 * @param record `Raw4624Logons` or `Raw4634Logoffs`
 * @returns boolean if record is `Raw4634Logoffs`
 */
function isLogoff(
  record: Raw4624Logons | Raw4634Logoffs,
): record is Raw4634Logoffs {
  if (record.data.Event.System.EventID === 4634) {
    return true;
  }
  return false;
}

/**
 * Function to lookup logon types
 * @param logon_type EventLog Logon Type number
 * @returns LogonType enum
 */
function checkLogonType(logon_type: number): LogonType {
  switch (logon_type) {
    case 2: {
      return LogonType.Interactive;
    }
    case 3: {
      return LogonType.Network;
    }
    case 4: {
      return LogonType.Batch;
    }
    case 5: {
      return LogonType.Service;
    }
    case 7: {
      return LogonType.Unlock;
    }
    case 8: {
      return LogonType.NetworkCleartext;
    }
    case 9: {
      return LogonType.NewCredentials;
    }
    case 10: {
      return LogonType.RemoteInteractive;
    }
    case 11: {
      return LogonType.CacheInteractive;
    }
    default: {
      return LogonType.Unknown;
    }
  }
}

/**
 * Function to test Windows Logons parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Windows Logons parsing
 */
export function testLogonsWindows(): void {
  const test = "../../tests/test_data/windows/eventlogs/Security.evtx";
  const results = logonsWindows(test);
  if (results instanceof WindowsError) {
    throw results;
  }

  if (results.length !== 198) {
    throw `Got ${results.length} logon events, expected 198.......logonsWindows ❌`;
  }
  if (results[ 1 ] === undefined) {
    throw `Got undefined logon event.......logonsWindows ❌`;
  }

  if (results[ 1 ].eventlog_generated != "2022-10-31T03:30:46.218854Z") {
    throw `Got ${results[ 1 ].eventlog_generated} for logon time, expected "2022-10-31T03:30:46.218854Z".......logonsWindows ❌`;
  }

  console.info(`  Function logonsWindows ✅`);


  const logon_types = [ 2, 3, 4, 5, 7, 8, 9, 10, 11 ];
  for (const entry of logon_types) {
    const type_result = checkLogonType(entry);
    if (type_result === LogonType.Unknown) {
      throw `Got Unknown logon type ${type_result}.......checkLogonType ❌`;
    }
  }
  console.info(`  Function checkLogonType ✅`);

  const logon = `{"event_record_id":84182,"timestamp":"2025-08-31T03:06:46.605720000Z","data":{"Event":{"#attributes":{"xmlns":"http://schemas.microsoft.com/win/2004/08/events/event"},"System":{"Provider":{"#attributes":{"Name":"Microsoft-Windows-Security-Auditing","Guid":"54849625-5478-4994-A5BA-3E3B0328C30D"}},"EventID":4624,"Version":3,"Level":0,"Task":12544,"Opcode":0,"Keywords":"0x8020000000000000","TimeCreated":{"#attributes":{"SystemTime":"2025-08-31T03:06:46.605720Z"}},"EventRecordID":84182,"Correlation":null,"Execution":{"#attributes":{"ProcessID":876,"ThreadID":1340}},"Channel":"Security","Computer":"win","Security":null},"EventData":{"SubjectUserSid":"S-1-0-0","SubjectUserName":"-","SubjectDomainName":"-","SubjectLogonId":"0x0","TargetUserSid":"S-1-5-18","TargetUserName":"SYSTEM","TargetDomainName":"NT AUTHORITY","TargetLogonId":"0x3e7","LogonType":0,"LogonProcessName":"-","AuthenticationPackageName":"-","WorkstationName":"-","LogonGuid":"00000000-0000-0000-0000-000000000000","TransmittedServices":"-","LmPackageName":"-","KeyLength":0,"ProcessId":"0x4","ProcessName":"","IpAddress":"-","IpPort":"-","ImpersonationLevel":"-","RestrictedAdminMode":"-","RemoteCredentialGuard":"-","TargetOutboundUserName":"-","TargetOutboundDomainName":"-","VirtualAccount":"%%1843","TargetLinkedLogonId":"0x0","ElevatedToken":"%%1842"}}}}`;
  if (!isLogon(JSON.parse(logon))) {
    throw `Did not get logon event.......isLogon ❌`;
  }
  console.info(`  Function isLogon ✅`);

  const logoff = `{"event_record_id":84336,"timestamp":"2025-08-31T03:07:39.322481000Z","data":{"Event":{"#attributes":{"xmlns":"http://schemas.microsoft.com/win/2004/08/events/event"},"System":{"Provider":{"#attributes":{"Name":"Microsoft-Windows-Security-Auditing","Guid":"54849625-5478-4994-A5BA-3E3B0328C30D"}},"EventID":4634,"Version":0,"Level":0,"Task":12545,"Opcode":0,"Keywords":"0x8020000000000000","TimeCreated":{"#attributes":{"SystemTime":"2025-08-31T03:07:39.322481Z"}},"EventRecordID":84336,"Correlation":null,"Execution":{"#attributes":{"ProcessID":876,"ThreadID":2132}},"Channel":"Security","Computer":"win","Security":null},"EventData":{"TargetUserSid":"S-1-5-96-0-1","TargetUserName":"UMFD-1","TargetDomainName":"Font Driver Host","TargetLogonId":"0x1381d","LogonType":2}}}}`;
  if (!isLogoff(JSON.parse(logoff))) {
    throw `Did not get logoff event.......isLogoff ❌`;
  }
  console.info(`  Function isLogoff ✅`);
}