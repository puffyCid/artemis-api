import { MacosError } from "../../../macos/errors";
import { getPlist } from "../../../macos/plist";
import { IosError } from "../../error";

/**
 * Function to parse sites granted location permissions. Survives browser wipes
 * @param path Path to GeolocationSites.plist file
 * @returns JSON object or `IosError`
 */
export function parseGeoSites(
  path: string,
): Record<string, unknown> | IosError {
  const data = getPlist(path);
  if (data instanceof MacosError) {
    return new IosError(
      `DUCKDUCKGO`,
      `failed to parse geosites location ${path}: ${data}`,
    );
  }

  return data as Record<string, unknown>;
}
