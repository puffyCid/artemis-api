import { PlatformType } from "../../mod";
import { History } from "../../types/windows/powershell";
import { getEnvValue } from "../environment/env";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/files";
import { glob } from "../filesystem/mod";
import { WindowsError } from "./errors";

/**
 * Attempts to parse PowerShell history for all users using the default system drive
 * @param [platform=PlatformType.Windows] PlatformType to parse. Windows is the default
 * @param alt_path Alternative  Path to PowerShell history file
 * @returns Array of PowerShell `History` entries or single `History` or `WindowsError`
 */
export function powershellHistory(
  platform = PlatformType.Windows,
  alt_path?: string,
): History[] | History | WindowsError {
  if (alt_path !== undefined) {
    return parsePowershellHistory(alt_path, platform);
  }

  let glob_pattern = "";
  if (platform === PlatformType.Windows) {
    const drive = getEnvValue("SystemDrive");
    if (drive === "") {
      return new WindowsError("POWERSHELL", `failed get drive`);
    }
    glob_pattern =
      `${drive}\\Users\\*\\AppData\\Roaming\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost_history.txt`;
  }

  if (platform === PlatformType.Darwin) {
    glob_pattern = "/Users/*/.local/share/PowerShell/PSReadLine/ConsoleHost_history.txt";
  } else if (platform === PlatformType.Linux) {
    glob_pattern = "/home/*/.local/share/PowerShell/PSReadLine/ConsoleHost_history.txt";
  }
  const paths = glob(glob_pattern);
  if (paths instanceof FileError) {
    return new WindowsError("POWERSHELL", `failed glob paths`);
  }

  const history: History[] = [];
  for (const path of paths) {
    const entries = parsePowershellHistory(path.full_path, platform);
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
function parsePowershellHistory(path: string, platform: PlatformType): History | WindowsError {
  const data = readTextFile(path);
  if (data instanceof FileError) {
    console.warn(`could not read file ${path}: ${data}`);
    return new WindowsError(
      "POWERSHELL",
      `failed to read PowerShell history file ${path}`,
    );
  }

  let entries: string[] = [];

  if (platform === PlatformType.Windows) {
    entries = data.split("\r\n");
  } else {
    entries = data.split("\n");
  }
  const ps_history: History = {
    entries,
    path,
  };

  return ps_history;
}
