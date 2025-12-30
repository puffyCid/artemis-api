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
