import { WindowsError } from "../errors.ts";
import { EseDatabase } from "../ese.ts";
import { UserAccessLog } from "../../../types/windows/ese/ual.ts";
import { EseTable, TableInfo } from "../../../types/windows/ese.ts";
import { decode } from "../../encoding/base64.ts";
import { EncodingError } from "../../encoding/errors.ts";

interface RoleIds {
  guid: string;
  name: string;
}

/**
 * Class to parse Windows User Access Log
 */
export class UserAccessLogging extends EseDatabase {
  private info: TableInfo;
  /**Pages associated with the table */
  pages: number[];

  /**
   * Construct a `UserAccessLogging` object based on the provided UAL file. Client.mdb and <GUID>.mdb files contain the logon information. SystemIdentity.mdb contains role information
   * @param path Path to UAL related file. Such as SystemIdentity.mdb or Current.mdb or <GUID>.mdb.
   */
  constructor(path: string) {
    super(path);
    this.info = {
      obj_id_table: 0,
      table_page: 0,
      table_name: "",
      column_info: [],
      long_value_page: 0,
    };
    this.pages = [];

    if (path.endsWith("SystemIdentity.mdb")) {
      this.setupRoleIds();
    } else {
      this.setupClients();
    }
  }

  /**
   * Function to get UAL RoleID info from `SystemIdentity.mdb`
   * @param pages Array of pages to parse for the RoleIds table
   * @returns Array of `RoleIds` or `WindowsError`
   */
  public getRoleIds(pages: number[]): RoleIds[] | WindowsError {
    if (this.info.table_name === "") {
      return new WindowsError(
        `UAL`,
        `RoleIds info object not initialized property. Table name is empty`,
      );
    }
    const rows = this.getRows(pages, this.info);
    if (rows instanceof WindowsError) {
      return rows;
    }

    return this.parseIds(rows["ROLE_IDS"]);
  }

  /**
   * Function to parse the UserAccessLog and do optional Role lookups
   * @param pages Array of pages to parse for the Clients table
   * @param roles_ual Optional `UserAccessLogging` object associated with the `SystemIdentity.mdb` file. Will be used to lookup role names. If none provided then no lookups will be done
   * @param role_page_chunk Optional page limit for looking up Roles in the `SystemIdentity.mdb` file. Default is 30 page limit
   * @returns Array of `UserAccessLog` or `WindowsError`
   */
  public getUserAccessLog(
    pages: number[],
    roles_ual?: UserAccessLogging,
    role_page_chunk = 30,
  ): UserAccessLog[] | WindowsError {
    if (this.info.table_name === "") {
      return new WindowsError(
        `UAL`,
        `Clients info object not initialized property. Table name is empty`,
      );
    }
    const rows = this.getRows(pages, this.info);
    if (rows instanceof WindowsError) {
      return rows;
    }

    const clients = this.parseClients(rows["CLIENTS"]);
    let roles_limit: number[] = [];
    if (roles_ual === undefined) {
      return clients;
    }

    for (const role_page of roles_ual.pages) {
      roles_limit.push(role_page);
      if (role_page_chunk != roles_limit.length) {
        continue;
      }

      const roles = roles_ual.getRoleIds(roles_limit);
      if (roles instanceof WindowsError) {
        console.warn(`Failed to parse RoleIds: ${roles}. Returning data now`);
        return clients;
      }
      // Match Role GUIDs with names for users
      for (const id of roles) {
        for (const entry of clients) {
          if (entry.role_guid != id.guid) {
            continue;
          }

          entry.role_name = id.name;
        }
      }
      roles_limit = [];
    }

    if (roles_limit.length != 0) {
      const roles = roles_ual.getRoleIds(roles_limit);
      if (roles instanceof WindowsError) {
        console.warn(`Failed to parse RoleIds: ${roles}. Returning data now`);
        return clients;
      }
      // Match Role GUIDs with names for users
      for (const id of roles) {
        for (const entry of clients) {
          if (entry.role_guid != id.guid) {
            continue;
          }

          entry.role_name = id.name;
        }
      }
    }

    return clients;
  }

  /**
   * Sets up the parser for getting UAL Role ID info
   * @returns `WindowsError` or nothing
   */
  private setupRoleIds() {
    const catalog = this.catalogInfo();
    if (catalog instanceof WindowsError) {
      return;
    }

    this.info = this.tableInfo(catalog, "ROLE_IDS");
    const pages = this.getPages(this.info.table_page);
    if (pages instanceof WindowsError) {
      return;
    }

    this.pages = pages;
  }

  private setupClients(): void | WindowsError {
    const catalog = this.catalogInfo();
    if (catalog instanceof WindowsError) {
      return;
    }

    this.info = this.tableInfo(catalog, "CLIENTS");
    const pages = this.getPages(this.info.table_page);
    if (pages instanceof WindowsError) {
      return;
    }

    this.pages = pages;
  }

  /**
   * Extract role information from UAL database
   * @param rows Double array of `EseTable` entries. Represent ESE rows
   * @returns Array of `RoleIds`
   */
  private parseIds(rows: EseTable[][]): RoleIds[] {
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
   * Extract client info from UAL database
   * @param rows Double array of `EseTable` entries. Represent ESE rows
   * @returns Array of `UserAccessLog` entries
   */
  private parseClients(rows: EseTable[][]): UserAccessLog[] {
    const logs = [];
    for (const row of rows) {
      const ual_log: UserAccessLog = {
        total_accesses: 0,
        last_logon: "",
        first_logon: "",
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
            ual_log.first_logon = entry.column_data;
            break;
          case "LastAccess":
            ual_log.last_logon = entry.column_data;
            break;
          case "Address":
            ual_log.ip = this.extractIp(entry.column_data);
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

  /**
   * Simple function to extract IPv4 or IPv6 string from UAL
   * @param encoded_ip Base64 encoded string that contains IP information
   * @returns Human readable IP string
   */
  private extractIp(encoded_ip: string): string {
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
}
