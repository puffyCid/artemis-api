import { ApplicationError } from "./errors.ts";

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
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.query_sqlite(path, query);

    const results: Record<string, unknown>[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new ApplicationError(
      "SQLITE",
      `failed to execute query ${err}`,
    );
  }
}
