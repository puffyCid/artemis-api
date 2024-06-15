import { EseTable, TableInfo } from "../../../types/windows/ese.ts";
import {
  Operation,
  ServerSelection,
  UpdateHistory,
} from "../../../types/windows/ese/updates.ts";
import { EncodingError } from "../../encoding/errors.ts";
import { decode } from "../../encoding/mod.ts";
import { formatGuid } from "../../encoding/uuid.ts";
import { getEnvValue } from "../../environment/env.ts";
import { Endian } from "../../nom/helpers.ts";
import { nomUnsignedFourBytes, take } from "../../nom/mod.ts";
import { WindowsError } from "../errors.ts";
import { EseDatabase } from "../ese.ts";

/**
 * Class to parse history of Windows Updates
 */
export class Updates extends EseDatabase {
  private info: TableInfo;
  pages: number[];

  private table = "tbHistory";

  /**
   * Contruct `Updates` to parse Windows Updates history. By default will parse updates at `\Windows\SoftwareDistribution\DataStore\DataStore.edb`. Unless you specify alternative file.
   * @param alt_path Optional alternative path to `DataStore.edb`
   */
  constructor(alt_path?: string) {
    const default_path = getEnvValue("SystemDrive");
    let path =
      `${default_path}\\Windows\\SoftwareDistribution\\DataStore\\DataStore.edb`;
    if (alt_path != undefined && alt_path.endsWith("DataStore.edb")) {
      path = alt_path;
    }

    super(path);
    this.info = {
      obj_id_table: 0,
      table_page: 0,
      table_name: "",
      column_info: [],
      long_value_page: 0,
    };
    this.pages = [];
    this.setupHistory();
  }

  /**
   * Function to parse Windows Updates History
   * @param pages Array of pages to parse for the update history table
   * @returns Array of `UpdateHistory` or `WindowsError`
   */
  public updateHistory(pages: number[]): UpdateHistory[] | WindowsError {
    if (this.info.table_name === "") {
      return new WindowsError(
        `UPDATESHISTORY`,
        `tbHistory info object not initialized property. Table name is empty`,
      );
    }
    const rows = this.getRows(pages, this.info);
    if (rows instanceof WindowsError) {
      return rows;
    }

    return this.parseHistory(rows[this.table]);
  }

  private setupHistory() {
    const catalog = this.catalogInfo();
    if (catalog instanceof WindowsError) {
      return;
    }

    this.info = this.tableInfo(catalog, this.table);
    const pages = this.getPages(this.info.table_page);
    if (pages instanceof WindowsError) {
      return;
    }

    this.pages = pages;
  }

  /**
   * Parse the rows and columns of the `tbHistory` table
   * @param rows Nested Array of `EseTable` rows
   * @returns Array of `UpdateHistory` entries
   */
  private parseHistory(rows: EseTable[][]): UpdateHistory[] {
    const udpates = [];

    for (const row of rows) {
      const update: UpdateHistory = {
        client_id: "",
        support_url: "",
        date: "",
        description: "",
        operation: Operation.Unknown,
        server_selection: ServerSelection.Unknown,
        service_id: "",
        title: "",
        update_id: "",
        update_revision: 0,
        categories: "",
        more_info: "",
      };
      for (const column of row) {
        if (column.column_name === "ClientId") {
          update.client_id = column.column_data;
        } else if (column.column_name === "SupportUrl") {
          update.support_url = column.column_data;
        } else if (column.column_name === "Title") {
          update.title = column.column_data;
        } else if (column.column_name === "Description") {
          update.description = column.column_data;
        } else if (column.column_name === "Categories") {
          update.categories = column.column_data;
        } else if (column.column_name === "MoreInfoUrl") {
          update.more_info = column.column_data;
        } else if (column.column_name === "Date") {
          update.date = column.column_data;
        } else if (column.column_name === "Status") {
          switch (column.column_data) {
            case "1": {
              update.operation = Operation.Installation;
              break;
            }
            case "2": {
              update.operation = Operation.Uninstallation;
              break;
            }
          }
        } else if (column.column_name === "UpdateId") {
          const update_info = this.getUpdateId(column.column_data);
          if (update_info instanceof Error) {
            console.warn(`could not parse update id info ${update_info}`);
          } else {
            update.update_id = update_info["guid"] as string;
            update.update_revision = update_info["revision"] as number;
          }
        } else if (column.column_name === "ServerId") {
          const update_info = this.getUpdateId(column.column_data);
          if (update_info instanceof Error) {
            console.warn(`could not parse service id info ${update_info}`);
          } else {
            update.service_id = update_info["guid"] as string;
          }
        } else if (column.column_name === "ServerSelection") {
          update.server_selection = this.getServerSelection(column.column_data);
        }
      }
      udpates.push(update);
    }
    return udpates;
  }

  /**
   * Get update id information
   * @param data column data to parse
   * @returns Object containing a GUID and revision number
   */
  private getUpdateId(data: string): Record<string, string | number> | Error {
    const input = decode(data);
    if (input instanceof EncodingError) {
      return input;
    }
    const guid_size = 16;
    const guid = take(input, guid_size);
    if (guid instanceof Error) {
      return guid;
    }

    const update_id: Record<string, string | number> = {};
    update_id["guid"] = formatGuid(Endian.Le, guid.nommed as Uint8Array);

    if (guid.remaining.length === 0) {
      return update_id;
    }

    const revision_data = nomUnsignedFourBytes(
      guid.remaining as Uint8Array,
      Endian.Le,
    );
    if (revision_data instanceof Error) {
      return revision_data;
    }

    update_id["revision"] = revision_data.value;
    return update_id;
  }

  /**
   * Determine the server selection status
   * @param selection column data to parse
   * @returns `ServerSelection` status
   */
  private getServerSelection(selection: string): ServerSelection {
    const value = Number(selection);
    // https://learn.microsoft.com/en-us/previous-versions/windows/desktop/aa387280(v=vs.85)
    switch (value - 1) {
      case 0: {
        return ServerSelection.Default;
      }
      case 1: {
        return ServerSelection.ManagedServer;
      }
      case 2: {
        return ServerSelection.WindowsUpdate;
      }
      case 3: {
        return ServerSelection.Others;
      }
      default: {
        return ServerSelection.Unknown;
      }
    }
  }
}
