import { Journal } from "../../types/linux/journal.ts";
import { LinuxError } from "./errors.ts";

/**
 * Function to get `sudo logs`
 * @param path Optional path to a Journal file. If none is provided all Journal files will be parsed
 * @returns Array of `sudo log` entries from Linux Journal files or `LinuxError`
 */
export function getSudoLogsLinux(path = ""): Journal[] | LinuxError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_sudologs_linux(path);

    const log_data: Journal[] = JSON.parse(data);
    return log_data;
  } catch (err) {
    return new LinuxError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
  }
}
