import { EseTable } from "../../types/windows/ese.ts";

/**
 * Function to parse any ESE database and tables
 * @param path Path to ESE database
 * @param tables Tables that should be parsed
 * @returns HashMap of tables and their contents
 */
export function parseTable(
  path: string,
  tables: string[],
): Record<string, EseTable[][]> | Error {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_table(path, tables);
  if (data instanceof Error) {
    return data;
  }

  const results: Record<string, EseTable[][]> = JSON.parse(data);
  return results;
}
