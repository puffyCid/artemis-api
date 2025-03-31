import { MacosError } from "../../../macos/errors";
import { getPlist } from "../../../macos/plist";
import { IosError } from "../../error";

/**
 * Function to parse locatind clients.plist file
 * @param path Path to clients.plist file
 * @returns JSON object or `IosError`
 */
export function parseClients(path: string): Record<string, unknown> | IosError {
  const data = getPlist(path);
  if (data instanceof MacosError) {
    return new IosError(
      `ROOTDOMAIN`,
      `failed to parse locationd clients ${path}: ${data}`,
    );
  }

  return data as Record<string, unknown>;
}
