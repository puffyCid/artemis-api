import {
  Catalog,
  CatalogType,
  ColumnFlags,
  ColumnInfo,
  ColumnType,
  EseTable,
  TableInfo,
} from "../../types/windows/ese";
import { WindowsError } from "./errors";

export class EseDatabase {
  private path: string;

  /**
   * Construct a EseDatabase class to interact with a Windows ESE database
   * @param path Path to the ESE database
   */
  constructor(path: string) {
    this.path = path;
  }

  /**
   * Function to extract the Catalog from an ESE database
   * @returns Array of `Catalog` entries or `WindowsError`
   */
  public catalogInfo(): Catalog[] | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data: Catalog[] = js_get_catalog(this.path);
      return data;
    } catch (err) {
      return new WindowsError(
        "ESE",
        `failed to parse ese catalog ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to extract table metadata from the ESE Catalog
   * @param catalog Array of `Catalog` entries
   * @param table_name Table name to get info
   * @returns `TableInfo` object
   */
  public tableInfo(catalog: Catalog[], table_name: string): TableInfo {
    const info: TableInfo = {
      obj_id_table: 0,
      table_page: 0,
      table_name: "",
      column_info: [],
      long_value_page: 0,
    };

    for (const entry of catalog) {
      if (entry.name === table_name) {
        info.table_name = entry.name;
        info.obj_id_table = entry.obj_id_table;
        info.table_page = entry.column_or_father_data_page;
        continue;
      }

      if (
        entry.obj_id_table === info.obj_id_table &&
        info.table_name.length != 0 &&
        entry.catalog_type === CatalogType.Column
      ) {
        const column_info: ColumnInfo = {
          column_type: this.getColumnType(entry.column_or_father_data_page),
          column_name: entry.name,
          column_data: [],
          column_id: entry.id,
          column_flags: this.getColumnFlags(entry.flags),
          column_space_usage: entry.space_usage,
          column_tagged_flags: [],
        };

        info.column_info.push(column_info);
      } else if (
        entry.obj_id_table === info.obj_id_table &&
        info.table_name.length != 0 &&
        entry.catalog_type === CatalogType.LongValue
      ) {
        info.long_value_page = entry.column_or_father_data_page;
      }
    }

    return info;
  }

  /**
   * Function to get all pages associated with a table
   * @param first_page The first page of a table. Can be found using `tableInfo` function
   * @returns Array of page numbers or `WindowsError`
   */
  public getPages(first_page: number): number[] | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data = js_get_pages(this.path, first_page);

      const results: number[] = data;
      return results;
    } catch (err) {
      return new WindowsError(
        "ESE",
        `failed to parse ese pages ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to extract rows from ESE database table
   * @param pages Array of pages to use to get ESE rows
   * @param info `TableInfo` object
   * @returns HashMap of table data `Record<string, EseTable[][]>`
   */
  public getRows(
    pages: number[],
    info: TableInfo,
  ): Record<string, EseTable[][]> | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data: Record<string, EseTable[][]> = js_page_data(
        this.path,
        pages,
        info,
        info.table_name,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "ESE",
        `failed to parse ese rows ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to extract and filter rows from ESE database table. Useful if you want to combine tables based on shared key or you want to search for something
   * @param pages Array of pages to use to get ESE rows
   * @param info `TableInfo` object
   * @param column_name Name of column to filter on
   * @param column_data HashMap of column values to filter on `Record<string, boolean>`. Only the key matters for filtering
   * @returns
   */
  public getFilteredRows(
    pages: number[],
    info: TableInfo,
    column_name: string,
    column_data: Record<string, boolean>,
  ): Record<string, EseTable[][]> | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data: Record<string, EseTable[][]> = js_filter_page_data(
        this.path,
        pages,
        info,
        info.table_name,
        column_name,
        column_data,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "ESE",
        `failed to parse ese rows ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Function to dump specific columns from an ESE database table. Useful if you do **not** want all table columns provided from `getRows()` function.
   * @param pages Array of pages to use to get ESE rows
   * @param info `TableInfo` object
   * @param column_names Array of columns to parse
   * @returns
   */
  public dumpTableColumns(
    pages: number[],
    info: TableInfo,
    column_names: string[],
  ): Record<string, EseTable[][]> | WindowsError {
    try {
      //@ts-ignore: Custom Artemis function
      const data: Record<string, EseTable[][]> = js_get_table_columns(
        this.path,
        pages,
        info,
        info.table_name,
        column_names,
      );

      return data;
    } catch (err) {
      return new WindowsError(
        "ESE",
        `failed to parse ese rows ${this.path}: ${err}`,
      );
    }
  }

  /**
   * Determine table column type
   * @param column_type Column type value
   * @returns `ColumnType` enum
   */
  private getColumnType(column_type: number): ColumnType {
    switch (column_type) {
      case 0:
        return ColumnType.Nil;
      case 1:
        return ColumnType.Bit;
      case 2:
        return ColumnType.UnsignedByte;
      case 3:
        return ColumnType.Short;
      case 4:
        return ColumnType.Long;
      case 5:
        return ColumnType.Currency;
      case 6:
        return ColumnType.Float32;
      case 7:
        return ColumnType.Float64;
      case 8:
        return ColumnType.DateTime;
      case 9:
        return ColumnType.Binary;
      case 10:
        return ColumnType.Text;
      case 11:
        return ColumnType.LongBinary;
      case 12:
        return ColumnType.LongText;
      case 13:
        return ColumnType.SuperLong;
      case 14:
        return ColumnType.UnsignedLong;
      case 15:
        return ColumnType.LongLong;
      case 16:
        return ColumnType.Guid;
      case 17:
        return ColumnType.UnsignedShort;
      default:
        return ColumnType.Unknown;
    }
  }

  /**
   * Determine flags associated with table column
   * @param flags Column flag value
   * @returns Array of `ColumnFlags`
   */
  private getColumnFlags(flags: number): ColumnFlags[] {
    const not_null = 0x1;
    const version = 0x2;
    const increment = 0x4;
    const multi = 0x8;
    const flag_default = 0x10;
    const escrow = 0x20;
    const finalize = 0x40;
    const user_define = 0x80;
    const template = 0x100;
    const delete_zero = 0x200;
    const primary = 0x800;
    const compressed = 0x1000;
    const encrypted = 0x2000;
    const versioned = 0x10000;
    const deleted = 0x20000;
    const version_add = 0x40000;

    const flags_data: ColumnFlags[] = [];
    if ((flags & not_null) === not_null) {
      flags_data.push(ColumnFlags.NotNull);
    }
    if ((flags & version) === version) {
      flags_data.push(ColumnFlags.Version);
    }
    if ((flags & increment) === increment) {
      flags_data.push(ColumnFlags.AutoIncrement);
    }
    if ((flags & multi) === multi) {
      flags_data.push(ColumnFlags.MultiValued);
    }
    if ((flags & flag_default) === flag_default) {
      flags_data.push(ColumnFlags.Default);
    }
    if ((flags & escrow) === escrow) {
      flags_data.push(ColumnFlags.EscrowUpdate);
    }
    if ((flags & finalize) === finalize) {
      flags_data.push(ColumnFlags.Finalize);
    }
    if ((flags & user_define) === user_define) {
      flags_data.push(ColumnFlags.UserDefinedDefault);
    }
    if ((flags & template) === template) {
      flags_data.push(ColumnFlags.TemplateColumnESE98);
    }
    if ((flags & delete_zero) === delete_zero) {
      flags_data.push(ColumnFlags.DeleteOnZero);
    }
    if ((flags & primary) === primary) {
      flags_data.push(ColumnFlags.PrimaryIndexPlaceholder);
    }
    if ((flags & compressed) === compressed) {
      flags_data.push(ColumnFlags.Compressed);
    }
    if ((flags & encrypted) === encrypted) {
      flags_data.push(ColumnFlags.Encrypted);
    }
    if ((flags & versioned) === versioned) {
      flags_data.push(ColumnFlags.Versioned);
    }
    if ((flags & deleted) === deleted) {
      flags_data.push(ColumnFlags.Deleted);
    }
    if ((flags & version_add) === version_add) {
      flags_data.push(ColumnFlags.VersionedAdd);
    }
    return flags_data;
  }
}
