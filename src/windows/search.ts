import { SearchEntry } from "../../types/windows/search";
import { WindowsError } from "./errors";

/**
 * Function to parse Windows Search data. Supports both ESE and SQLITE databases
 * The Search database can get extremely large, consider using a filter script that accepts `SearchEntry[]` as an argument.
 * @param path Path to a Windows Search file. Supports `Windows.edb` or `Windows.db`
 * @param page_limit Optional Number of pages to use when parsing. Will influence memory usage. Default is 50
 * @returns Array of `SearchEntry` entries or `WindowsError`
 */
export function getSearch(
  path: string,
  page_limit = 50,
): SearchEntry[] | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_search(path, page_limit);

    return data;
  } catch (err) {
    return new WindowsError("SEARCH", `failed to parse search ${path}: ${err}`);
  }
}
