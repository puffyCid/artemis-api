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
 * @returns Array of `Logon` entries
 */
export function logonsWindows(path: string): LogonsWindows[] | WindowsError {
  let offset = 0;
  const limit = 10000;
  const logon_entries:LogonsWindows[] = [];
  const logoff_entries:Raw4634Logoffs[] = [];

  const logon_eid = 4624;
  const logoff_eid = 4634;

  while (true) {
    // Get records 10000 at a time
    const logs = getEventlogs(path, offset, limit);
    if (logs instanceof WindowsError) {
      return new WindowsError(
        "LOGONCORRELATION",
        `failed to parse eventlog ${path}: ${logs}`,
      );
    }
    const recordsData = logs[1];
    if (recordsData.length === 0) {
      break;
    }

    offset += limit;

    const records = recordsData as Raw4624Logons[] | Raw4634Logoffs[];
    // Loop through Event Log entries
    for (const record of records) {
      // Parse Logon entries
      if (record.data.Event.System.EventID === logon_eid && isLogon(record)) {
        const entry: LogonsWindows = {
          logon_type: checkLogonType(record.data.Event.EventData.LogonType),
          sid: record.data.Event.EventData.TargetUserSid,
          account_name: record.data.Event.EventData.TargetUserName,
          account_domain: record.data.Event.EventData.TargetDomainName,
          logon_id: record.data.Event.EventData.TargetLogonId,
          logon_process: record.data.Event.EventData.LogonProcessName,
          authentication_package:
            record.data.Event.EventData.AuthenticationPackageName,
          source_ip: record.data.Event.EventData.IpAddress,
          source_workstation: record.data.Event.EventData.WorkstationName,
          logon_time: record.timestamp,
          logoff_time: "",
          duration: 0,
        };
        logon_entries.push(entry);
      } else if (
        record.data.Event.System.EventID === logoff_eid && isLogoff(record)
      ) {
        logoff_entries.push(record);
      }
    }
  }

  // Try to correlate logon/logoff events
  for (let i = 0; i < logon_entries.length; i++) {
    for (const logoff of logoff_entries) {
      if (
        logon_entries[i].logon_id === logoff.data.Event.EventData.TargetLogonId
      ) {
        logon_entries[i].logoff_time = logoff.timestamp;
        const duration = new Date(logon_entries[i].logoff_time).getTime() -
          new Date(logon_entries[i].logon_time).getTime();
        logon_entries[i].duration = Number(duration);
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
