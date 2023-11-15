import { EseTable } from "../../types/windows/ese.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse any ESE database and tables
 * @param path Path to ESE database
 * @param tables Tables that should be parsed
 * @returns HashMap of tables and their contents or `WindowsError`
 */
export function parseTable(
  path: string,
  tables: string[],
): Record<string, EseTable[][]> | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_table(path, tables);

    const results: Record<string, EseTable[][]> = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("ESE", `failed to parse ese ${path}: ${err}`);
  }
}
