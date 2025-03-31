import { Journal } from "../../types/linux/journal";
import { LinuxError } from "./errors";

/**
 * Function to parse a `journal` file
 * @param path Path to journal file. It should end with `.journal`.
 * @returns Array of `Journal` entries
 */
export function getJournal(path: string): Journal[] | LinuxError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_get_journal(path);
    return data;
  } catch (err) {
    return new LinuxError(
      "JOURNAL",
      `failed to parse journal file ${path}: ${err}`,
    );
  }
}
