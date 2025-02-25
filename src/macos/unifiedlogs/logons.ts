import { getUnifiedLog } from "../../../mod.ts";
import { LogonMacos } from "../../../types/macos/unifiedlogs/logons.ts";
import { MacosError } from "../errors.ts";

/**
 * Function to extract macOS logons
 * @param path Path to `tracev3` fine in Special folder
 * @param archive_path Optional path to directory containing UnifiedLog collection
 * @returns Array of `LogonMacos` or `MacosError`
 */
export function logonsMacos(
  path: string,
  archive_path?: string,
): LogonMacos[] | MacosError {
  const logs = getUnifiedLog(path, archive_path);
  if (logs instanceof MacosError) {
    return new MacosError(`LOGONS`, `failed to parse ${path}: ${logs}`);
  }

  const logons: LogonMacos[] = [];
  for (const entry of logs) {
    if (
      entry.process.endsWith("loginwindow") &&
      entry.message.includes("[Login1 doLogin] | shortUsername")
    ) {
      const user = /(?<=name = ).*?(?=,)/;
      const uid = /(?<=ID = ).*?(?=,)/;
      const gid = /(?<=groupID = ).*/;

      const logon: LogonMacos = {
        username: user.exec(entry.message)?.[0] as string,
        uid: Number(uid.exec(entry.message)?.[0]),
        gid: Number(gid.exec(entry.message)?.[0]),
        timestamp: entry.timestamp,
        message: entry.message,
        pid: entry.pid,
        thread_id: entry.thread_id,
        system_timezone: entry.timezone_name,
      };
      logons.push(logon);
    }
  }

  return logons;
}
