import { getPlist } from "../../../../mod.ts";
import { FileError } from "../../../filesystem/errors.ts";
import { readTextFile } from "../../../filesystem/files.ts";
import { MacosError } from "../../../macos/errors.ts";
import { IosError } from "../../error.ts";

/**
 * Function parse Hinge preference file
 * @param path Path to `co.hinge.mobile.ios.plist` file
 * @returns JSON object or `IosError`
 */
export function parsePreferences(
  path: string,
): Record<string, unknown> | IosError {
  const data = getPlist(path);
  if (data instanceof MacosError) {
    return new IosError(
      `HINGE`,
      `failed to parse preferences: ${data}`,
    );
  }
  return data as Record<string, unknown>;
}

/**
 * Function to parse Hinge support file
 * @param path Path the Hinge support log file
 * @returns Array of JSON objects or `IosError`
 */
export function parseSupportLog(
  path: string,
): Record<string, unknown>[] | IosError {
  const data = readTextFile(path);
  if (data instanceof FileError) {
    return new IosError(`HINGE`, `failed to read support file: ${data}`);
  }
  const entries = data.substring(0, data.length - 1).split("],");
  const logs = [];
  for (const entry of entries) {
    if (entry.endsWith("]")) {
      logs.push(JSON.parse(entry).at(0));
      continue;
    }
    logs.push(JSON.parse(`${entry}]`).at(0));
  }
  return logs;
}
