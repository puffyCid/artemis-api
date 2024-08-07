import { TaskData, TaskJob, TaskXml } from "../../types/windows/tasks.ts";
import { WindowsError } from "./errors.ts";

/**
 * Parse the Schedule Task files using the default systemdrive (typically C).
 * Will parse both XML and Job Task files
 * @returns Parsed XML and Job Task files or `WindowsError`
 */
export function getTasks(): TaskData | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_tasks();
    const tasks: TaskData = JSON.parse(data);

    return tasks;
  } catch (err) {
    return new WindowsError("TASKS", `failed to parse tasks: ${err}`);
  }
}

/**
 * Parse a single Task file at provided path. Supports Job and XML files.
 * @param path Path to Task file
 * @returns Return either a parsed XML or Job file or `WindowsError`
 */
export function getTaskFile(path: string): TaskXml | TaskJob | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_task_file(path);
    const tasks: TaskXml | TaskJob = JSON.parse(data);

    return tasks;
  } catch (err) {
    return new WindowsError("TASKS", `failed to parse tasks ${path}: ${err}`);
  }
}
