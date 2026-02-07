import { PlatformType } from "../../mod";
import { History } from "../../types/windows/powershell";
import { getEnvValue } from "../environment/env";
import { FileError } from "../filesystem/errors";
import { readTextFile, stat } from "../filesystem/files";
import { glob } from "../filesystem/files";
import { WindowsError } from "./errors";

/**
 * Attempts to parse PowerShell history for all users using the default system drive
 * @param [platform=PlatformType.Windows] `PlatformType` to parse. Windows is the default
 * @param alt_path Alternative  Path to PowerShell history file
 * @returns Array of PowerShell `History` entries or single `History` or `WindowsError`
 */
export function powershellHistory(
  platform = PlatformType.Windows,
  alt_path?: string,
): History[] | WindowsError {
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

  let history: History[] = [];
  for (const path of paths) {
    const entries = parsePowershellHistory(path.full_path, platform);
    if (entries instanceof WindowsError) {
      continue;
    }

    history = history.concat(entries);
  }

  return history;
}

/**
 * Parse a single PowerShell history file
 * @param path Path to PowerShell history file
 * @returns PowerShell `History` data or `WindowsError`
 */
function parsePowershellHistory(path: string, platform: PlatformType): History[] | WindowsError {
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
    if (entries.length === 0) {
      entries = data.split("\n");
    }
  } else {
    entries = data.split("\n");
  }
  const meta = stat(path);
  const values: History[] = [];
  for (const line of entries) {
    const ps_history: History = {
      line,
      path,
      created: "1970-01-01T00:00:00.000Z",
      modified: "1970-01-01T00:00:00.000Z",
      accessed: "1970-01-01T00:00:00.000Z",
      changed: "1970-01-01T00:00:00.000Z",
      message: `PowerShell console command '${line}'`,
      datetime: "1970-01-01T00:00:00.000Z",
      timestamp_desc: "PowerShell History Modified",
      artifact: "PowerShell History",
      data_type: "application:powershell:entry"
    };

    if (!(meta instanceof FileError)) {
      ps_history.changed = meta.changed;
      ps_history.modified = meta.modified;
      ps_history.created = meta.created;
      ps_history.accessed = meta.accessed;
      ps_history.datetime = meta.modified;
    }

    values.push(ps_history);
  }

  return values;
}

/**
 * Function to test PowerShell History parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the PowerShell History parsing
 */
export function testPowerShellHistory(): void {
  const test = "../test_data/windows/powershell/history.txt";
  const hits = powershellHistory(PlatformType.Windows, test);
  if (hits instanceof WindowsError) {
    throw hits;
  }

  if (hits[0] === undefined || !Array.isArray(hits)) {
    throw `Got ${hits[0]} expected an array.......powershellHistory ❌`;
  }

  if (hits[0].line !== 'whoami') {
    throw `Got ${hits[0].line} expected 'whoami'.......powershellHistory ❌`;
  }

  console.info(`  Function powershellHistory ✅`);


  const values = parsePowershellHistory(test, PlatformType.Windows);
  if (values instanceof WindowsError) {
    throw values;
  }
  if (values[0]?.line !== 'whoami') {
    throw `Got ${values[0]?.line} expected 'whoami'.......parsePowershellHistory ❌`;
  }

  console.info(`  Function parsePowershellHistory ✅`);

}