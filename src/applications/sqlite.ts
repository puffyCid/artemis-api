import { FileHandle } from "../../types/filesystem/accessor";
import { ApplicationError } from "./errors";

/**
 * Query a SQLITE database file
 * @param path Path to SQLITE database file
 * @param query SQLITe query to execute
 * @returns Array column names and values or `ApplicationError`
 */
export function querySqlite(
  path: string,
  query: string,
): Record<string, unknown>[] | ApplicationError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_query_sqlite(path, query);

    return data;
  } catch (err) {
    return new ApplicationError(
      "SQLITE",
      `failed to execute query ${err}`,
    );
  }
}

/**
 * Class that exposes reading a sqlite file (2GBs or smaller)
 */
export class Sqlite {
  private connection: unknown;

  /**
   * Open a sqlite file using the `Accessor`. This reads the **WHOLE** file into memory!
   * @param protocol `AccessorProtocol` to use to read the sqlite file
   * @param path Path to sqlite database
   */
  constructor(handle: FileHandle) {
    // @ts-expect-error: Custom Artemis class
    this.connection = new JsSqlite(handle.File);
  }

  /**
   * Query an opened database file
   * @param query SQLITE query to execute
   * @returns Array column names and values or `ApplicationError`
   */
  public query(query: string): Record<string, unknown>[] | ApplicationError {
    try {
      // @ts-expect-error: Custom Artemis class function
      const results = this.connection.query(query);
      return results;
    } catch (err) {
      return new ApplicationError(
        "SQLITE",
        `failed to execute query ${err}`,
      );
    }
  }
}