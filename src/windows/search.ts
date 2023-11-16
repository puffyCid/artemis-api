import { SearchEntry } from "../../types/windows/search.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse Windows Search data. Supports both ESE and SQLITE databases
 * The Search database can get extremely large, consider using a filter script that accepts `SearchEntry[]` as an argument.
 * @param path Path to a Windows Search file. Supports `Windows.edb` or `Windows.db`
 * @returns Array of `SearchEntry` entries or `WindowsError`
 */
export function getSearch(path: string): SearchEntry[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: string = Deno.core.ops.get_search(path);

    const result: SearchEntry[] = JSON.parse(data);
    return result;
  } catch (err) {
    return new WindowsError("SEARCH", `failed to parse search ${path}: ${err}`);
  }
}
