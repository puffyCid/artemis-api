/**
 * Sudo ("super user do" or "substitute user") is used to run programs with elevated privileges.
 * Linux `Sudo Logs` are stored in the Systemd Journal files.
 * The log entries show evidence of commands executed with elevated privileges
 */

import { Journal } from "../../types/linux/journal.d.ts";
import { LinuxError } from "./errors.ts";

/**
 * Function to get `sudo logs`
 * @returns Array of `sudo log` entries from Linux Journal files or `LinuxError`
 */
export function getSudoLogs(): Journal[] | LinuxError {
    try {
        //@ts-ignore: Custom Artemis function
        const data = Deno.core.ops.get_sudologs();

        const log_data: Journal[] = JSON.parse(data);
        return log_data;
    } catch (err) {
        return new LinuxError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
    }
}
