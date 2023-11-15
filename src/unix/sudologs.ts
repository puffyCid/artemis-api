/**
 * Sudo ("super user do" or "substitute user") is used to run programs with elevated privileges.
 * macOS `Sudo Logs` are stored in the Unified Log files.
 * Linux `Sudo Logs` are stored in the Systemd Journal files.
 * The log entries show evidence of commands executed with elevated privileges
 *
 * References:
 *  - https://www.mac4n6.com/blog/2020/4/22/analysis-of-apple-unified-logs-quarantine-edition-entry-2-sudo-make-me-a-sandwich
 */

import { Journal } from "../../types/linux/journal.d.ts";
import { UnifiedLog } from "../../types/macos/unifiedlogs.d.ts";
import { UnixError } from "./errors.ts";

/**
 * Function to get `sudo logs`
 * @returns Array of `sudo log` entries from Linux Journal files or macOS Unified Logs or `UnixError`
 */
export function getSudoLogs(): Journal[] | UnifiedLog[] | UnixError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_sudologs();

    const log_data: Journal[] | UnifiedLog[] = JSON.parse(data);
    return log_data;
  } catch (err) {
    return new UnixError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
  }
}
