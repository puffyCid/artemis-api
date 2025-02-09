import { MacosError } from "../../../macos/errors.ts";
import { getPlist } from "../../../macos/plist.ts";
import { IosError } from "../../error.ts";

/**
 * Function to extract meeting preferences
 * @param path Path to us.zoom.videomeetings.plist file
 * @returns JSON object or `IosError`
 */
export function parseMeetings(
  path: string,
): Record<string, unknown> | IosError {
  const data = getPlist(path);
  if (data instanceof MacosError) {
    return new IosError(
      `ZOOM`,
      `failed to parse meetings plist ${path}: ${data}`,
    );
  }

  return data as Record<string, unknown>;
}

/**
 * Function to extract chat preferences
 * @param path Path to ZoomChat.plist file
 * @returns JSON object or `IosError`
 */
export function parseChat(
  path: string,
): Record<string, unknown> | IosError {
  const data = getPlist(path);
  if (data instanceof MacosError) {
    return new IosError(
      `ZOOM`,
      `failed to parse chat plist ${path}: ${data}`,
    );
  }

  return data as Record<string, unknown>;
}
