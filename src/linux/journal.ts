import { Journal } from "../../types/linux/journal.d.ts";

/**
 * Function to parse a `journal` file
 * @param path Path to journal file. It should end with `.journal`.
 * @returns Array of `Journal` entries
 */
export function getJournal(path: string): Journal[] | null {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_journal(path);
  if (data === "") {
    return null;
  }

  const journal: Journal[] = JSON.parse(data);
  return journal;
}
