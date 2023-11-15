import { Journal } from "../../types/linux/journal.d.ts";
import { LinuxError } from "./errors.ts";

/**
 * Function to parse a `journal` file
 * @param path Path to journal file. It should end with `.journal`.
 * @returns Array of `Journal` entries
 */
export function getJournal(path: string): Journal[] | LinuxError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_journal(path);
    const journal: Journal[] = JSON.parse(data);
    return journal;
  } catch (err) {
    return new LinuxError(
      "JOURNAL",
      `failed to parse journal file ${path}: ${err}`,
    );
  }
}
