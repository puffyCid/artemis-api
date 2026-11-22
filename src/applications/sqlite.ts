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
   * Initialize `Sqlite` class
   * @param handle `FileHandle` object
   */
  constructor (handle: FileHandle) {
    // @ts-expect-error: Custom Artemis class
    this.connection = new JsSqlite(handle.File);
  }

  /**
   * 
   * @param handle `FileHandle` to the sqlite database
   * @returns `Sqlite` class or `ApplicationError`
   */
  public static fromHandle(handle: FileHandle): Sqlite | ApplicationError {
    try {
      return new Sqlite(handle);
    } catch (err) {
      return new ApplicationError(`SQLITE`, `failed to open ${JSON.stringify(handle.File)}: ${err}`);
    }
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