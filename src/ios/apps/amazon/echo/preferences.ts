import { FileError } from "../../../../filesystem/errors.ts";
import { readTextFile } from "../../../../filesystem/mod.ts";
import { MacosError } from "../../../../macos/errors.ts";
import { getPlist } from "../../../../macos/plist.ts";
import { IosError } from "../../../error.ts";

/**
 * Function parse Amazon Echo preference file. Contains additional binary plists at keys:
 *  - `com.amazon.alexa.mobilytcs.mobilytics.session`
 *  - `com.amazon.alexa.mobilytcs.mo_allowlist_config`
 *  - `com.amazon.alexa.mobilytcs.mo_dcm_deprecation_config`
 *  - `com.amazon.alexa.mobilytcs.mo_minerva_config`
 * @param path Path to `com.amazon.echo.plist` file
 * @returns JSON object or `IosError`
 */
export function parsePreferences(
  path: string,
): Record<string, unknown> | IosError {
  const data = getPlist(path);
  if (data instanceof MacosError) {
    return new IosError(
      `AMAZON_ECHO`,
      `failed to parse preferences: ${data}`,
    );
  }

  return data as Record<string, unknown>;
}

/**
 * Function to read the capabilities JSON file
 * @param path Path to com.amazon.alexa.Capabilities.data file
 * @returns JSON object or `IosError`
 */
export function readCapabilities(
  path: string,
): Record<string, unknown> | IosError {
  const text = readTextFile(path);
  if (text instanceof FileError) {
    return new IosError(
      `AMAZON_ECHO`,
      `failed to read capabilities file ${path}: ${text}`,
    );
  }

  return JSON.parse(text);
}
