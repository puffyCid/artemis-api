/**
 * Sudo ("super user do" or "substitute user") is used to run programs with elevated privileges.
 * macOS `Sudo Logs` are stored in the Unified Log files.
 * Linux `Sudo Logs` are stored in the Systemd Journal files.
 * The log entries show evidence of commands executed with elevated privileges
 *
 * References:
 *  - https://www.mac4n6.com/blog/2020/4/22/analysis-of-apple-unified-logs-quarantine-edition-entry-2-sudo-make-me-a-sandwich
 */

import { Journal } from "../linux/journal.ts";
import { UnifiedLog } from "../macos/unifiedlogs.ts";

/**
 * Function to parse a `sudo logs` on a macOS system
 * @returns Array of `sudo log` entries from the Unified Logs
 */
export function getMacosSudoLogs(): UnifiedLog[] {
  const data = Deno.core.ops.get_sudologs();

  const log_data: UnifiedLog[] = JSON.parse(data);
  return log_data;
}

/**
 * Function to parse a `sudo logs` on a Linux system
 * @returns Array of `sudo log` entries from the Journal files
 */
export function getLinuxSudoLogs(): Journal[] {
  const data = Deno.core.ops.get_sudologs();

  const log_data: Journal[] = JSON.parse(data);
  return log_data;
}
