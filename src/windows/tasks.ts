import { TaskData, TaskJob, TaskXml } from "../../types/windows/tasks.d.ts";

/**
 * Parse the Schedule Task files using the default systemdrive (typically C).
 * Will parse both XML and Job Task files
 * @returns Parsed XML and Job Task files or `WindowsError`
 */
export function getTasks(): TaskData | Error {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_tasks();
  const tasks: TaskData | Error = JSON.parse(data);

  return tasks;
}

/**
 * Parse the Schedule Task files using an alternative dive letter
 * @param drive Alternative drive letter to use
 * @returns Parsed XML and Job Task files or `WindowsError`
 */
export function getAltTasks(drive: string): TaskData | Error {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_tasks(drive);
  const tasks: TaskData | Error = JSON.parse(data);

  return tasks;
}

/**
 * Parse a single Task file at provided path. Supports Job and XML files.
 * @param path Path to Task file
 * @returns Return either a parsed XML or Job file or `WindowsError`
 */
export function getTaskFile(path: string): TaskXml | TaskJob | Error {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_task_file(path);
  const tasks: TaskXml | TaskJob | Error = JSON.parse(data);

  return tasks;
}
