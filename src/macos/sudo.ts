/**
 * Sudo ("super user do" or "substitute user") is used to run programs with elevated privileges.
 * macOS `Sudo Logs` are stored in the Unified Log files.
 * The log entries show evidence of commands executed with elevated privileges
 *
 * References:
 *  - https://www.mac4n6.com/blog/2020/4/22/analysis-of-apple-unified-logs-quarantine-edition-entry-2-sudo-make-me-a-sandwich
 */

import { UnifiedLog } from "../../types/macos/unifiedlogs.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to get `sudo logs`
 * @returns Array of `sudo log` entries from macOS Unified Logs or `MacosError`
 */
export function getSudoLogs(): UnifiedLog[] | MacosError {
    try {
        //@ts-ignore: Custom Artemis function
        const data = Deno.core.ops.get_sudologs();

        const log_data: UnifiedLog[] = JSON.parse(data);
        return log_data;
    } catch (err) {
        return new MacosError("SUDOLOGS", `failed to parse sudo logs: ${err}`);
    }
}
