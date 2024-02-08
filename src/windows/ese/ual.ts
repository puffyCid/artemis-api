import { getEnvValue } from "../../environment/env.ts";
import { FileError } from "../../filesystem/errors.ts";
import { glob } from "../../filesystem/files.ts";
import { WindowsError } from "../errors.ts";
import { parseTable } from "../ese.ts";
import { UserAccessLog } from "../../../types/windows/ese/ual.ts";
import { EseTable } from "../../../types/windows/ese.ts";
import { decode } from "../../encoding/base64.ts";
import { EncodingError } from "../../encoding/errors.ts";

/**
 * Parse the UserAccessLog (UAL) database for logon activity. This database only exists on Windows Servers. Its an ESE database.
 * It is **not** related to M365 UAL (Unified Audit Logging)!
 * @param alt_dir Optional alternative directory to the UAL database. Will use default path at `%SYSTEMROOT%\System32\LogFiles\Sum` if not provided
 * @returns Array of `UserAccessLog` entries or `WindowsError`
 */
export function userAccessLog(
  alt_dir?: string,
): UserAccessLog[] | WindowsError {
  const default_path = getEnvValue("SystemRoot");

  if (default_path === "") {
    return new WindowsError("UAL", `failed to determine SystemRoot`);
  }
  let path = `${default_path}\\System32\\LogFiles\\Sum`;
  if (alt_dir != undefined) {
    if (alt_dir.endsWith("\\")) {
      path = alt_dir.substring(0, alt_dir.length - 1);
    } else {
      path = alt_dir;
    }
  }

  const path_glob = `${path}\\*.mdb`;

  // Glob for all MDB files. There may be up to four (4)
  const paths = glob(path_glob);
  if (paths instanceof FileError) {
    return new WindowsError("UAL", `failed to glob paths ${paths}`);
  }

  const current_tables = ["CLIENTS"];
  const id_tables = ["ROLE_IDS"];

  let entries: UserAccessLog[] = [];
  let ids: RoleIds[] = [];
  for (const path of paths) {
    if (path.filename === "SystemIdentity.mdb") {
      const rows = parseTable(path.full_path, id_tables);
      if (rows instanceof WindowsError) {
        console.warn(`Failed to parse SystemIdentity.mdb file: ${rows}`);
        continue;
      }
      ids = parseIds(rows["ROLE_IDS"]);
      continue;
    }

    const rows = parseTable(path.full_path, current_tables);
    if (rows instanceof WindowsError) {
      console.warn(`Failed to parse ${path.full_path} file: ${rows}`);
      continue;
    }
    entries = entries.concat(parseClients(rows["CLIENTS"]));
  }

  // Match Role GUIDs with names for users
  for (const id of ids) {
    for (const entry of entries) {
      if (entry.role_guid != id.guid) {
        continue;
      }

      entry.role_name = id.name;
    }
  }

  return entries;
}

/**
 * Extract client info from UAL database
 * @param rows Double array of `EseTable` entries. Represent ESE rows
 * @returns Array of `UserAccessLog` entries
 */
function parseClients(rows: EseTable[][]): UserAccessLog[] {
  const logs = [];
  for (const row of rows) {
    const ual_log: UserAccessLog = {
      total_accesses: 0,
      last_logon: 0,
      first_logon: 0,
      ip: "",
      username: "",
      domain: "",
      domain_username: "",
      role_guid: "",
      role_name: "",
    };
    for (const entry of row) {
      switch (entry.column_name) {
        case "RoleGuid":
          ual_log.role_guid = entry.column_data;
          break;
        case "TotalAccesses":
          ual_log.total_accesses = Number(entry.column_data);
          break;
        case "InsertDate":
          ual_log.first_logon = Number(entry.column_data);
          break;
        case "LastAccess":
          ual_log.last_logon = Number(entry.column_data);
          break;
        case "Address":
          ual_log.ip = extractIp(entry.column_data);
          break;
        case "AuthenticatedUserName": {
          ual_log.domain_username = entry.column_data;
          const split = entry.column_data.split("\\");
          ual_log.domain = split.at(0) ?? "";
          ual_log.username = split.at(1) ?? "";
          break;
        }

        default:
          break;
      }
    }
    logs.push(ual_log);
  }
  return logs;
}

interface RoleIds {
  guid: string;
  name: string;
}

/**
 * Extract role information from UAL database
 * @param rows Double array of `EseTable` entries. Represent ESE rows
 * @returns Array of `RoleIds`
 */
function parseIds(rows: EseTable[][]): RoleIds[] {
  const roles = [];

  for (const row of rows) {
    const role: RoleIds = {
      guid: "",
      name: "",
    };
    for (const entry of row) {
      if (entry.column_name === "RoleGuid") {
        role.guid = entry.column_data;
      } else if (entry.column_name == "RoleName") {
        role.name = entry.column_data;
      }
    }
    roles.push(role);
  }

  return roles;
}

/**
 * Simple function to extract IPv4 or IPv6 string from UAL
 * @param encoded_ip Base64 encoded string that contains IP information
 * @returns Human readable IP string
 */
function extractIp(encoded_ip: string): string {
  const raw_ip = decode(encoded_ip);
  if (raw_ip instanceof EncodingError) {
    console.warn(`Could not base64 decode IP data: ${raw_ip}`);
    return encoded_ip;
  }

  const is_ipv6 = 16;
  if (raw_ip.length === is_ipv6) {
    const ip = [];
    for (const data of raw_ip) {
      ip.push(data.toString(16));
    }
    return ip.join(":");
  }

  return raw_ip.join(".");
}
