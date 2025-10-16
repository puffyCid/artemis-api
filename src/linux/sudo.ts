import { Journal } from "../../types/linux/journal";
import { LinuxError } from "./errors";

/**
 * Function to get `sudo logs`
 * @param path Optional path to a Journal file. If none is provided all Journal files will be parsed
 * @returns Array of `sudo log` entries from Linux Journal files or `LinuxError`
 */
export function getSudoLogsLinux(path = ""): Journal[] | LinuxError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_get_sudologs_linux(path);
    return data;
  } catch (err) {
    return new LinuxError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
  }
}
