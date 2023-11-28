import { History } from "../../types/windows/powershell.ts";
import { getEnvValue } from "../environment/env.ts";
import { FileError } from "../filesystem/errors.ts";
import { readTextFile } from "../filesystem/files.ts";
import { glob } from "../filesystem/mod.ts";
import { WindowsError } from "./errors.ts";

/**
 * Attempts to parse PowerShell history for all users using the default system drive
 * @param alt_path Alternative  Path to PowerShell history file
 * @returns Array of PowerShell `History` entries or single `History` or `WindowsError`
 */
export function powershellHistory(
  alt_path?: string,
): History[] | History | WindowsError {
  if (alt_path != undefined) {
    return parsePowershellHistory(alt_path);
  }
  const drive = getEnvValue("SystemDrive");
  if (drive === "") {
    return new WindowsError("POWERSHELL", `failed get drive`);
  }

  const glob_pattern =
    `${drive}\\Users\\*\\AppData\\Roaming\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost_history.txt`;
  const paths = glob(glob_pattern);
  if (paths instanceof FileError) {
    return new WindowsError("POWERSHELL", `failed glob paths`);
  }

  const history: History[] = [];
  for (const path of paths) {
    const entries = parsePowershellHistory(path.full_path);
    if (entries instanceof WindowsError) {
      continue;
    }

    history.push(entries);
  }

  return history;
}

/**
 * Parse a single PowerShell history file
 * @param path Path to PowerShell history file
 * @returns PowerShell `History` data or `WindowsError`
 */
function parsePowershellHistory(path: string): History | WindowsError {
  const data = readTextFile(path);
  if (data instanceof FileError) {
    console.warn(`could not read file ${path}: ${data}`);
    return new WindowsError(
      "POWERSHELL",
      `failed to read PowerShell history file ${path}`,
    );
  }

  const entries = data.split("\r\n");
  const ps_history: History = {
    entries,
    path,
  };

  return ps_history;
}
