import { TaskXml } from "../../types/windows/tasks";
import { WindowsError } from "./errors";

/**
 * Parse the Schedule Task files using the default systemdrive (typically C).
 * Will parse both XML and Job Task files
 * @param path path to a Schedule Task file
 * @returns Parsed XML and/or Job Task file(s) or `WindowsError`
 */
export function getTasks(
  path: string,
): TaskXml | WindowsError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_tasks(path);

    return data;
  } catch (err) {
    return new WindowsError("TASKS", `failed to parse tasks: ${err}`);
  }
}
