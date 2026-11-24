import { AccessorProtocol, EntryKind, FileHandle, GlobMatch } from "../../../types/filesystem/accessor";
import { Wifi, WifiPlist } from "../../../types/macos/plist/wifi";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to parse joined Wifi networks on macOS
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to `com.apple.wifi.known-networks.plist`
 * @returns Array `Wifi` networks
 */
export function wifiNetworks(protocol = AccessorProtocol.Host, alt_path?: string): Wifi[] | MacosError {
  const path = alt_path ?? "/Library/Preferences/com.apple.wifi.known-networks.plist";
  // Pre-catalina
  // "/Library/Preferences/SystemConfiguration/com.apple.airport.preferences.plist"

  const accessor = new Accessor();
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new MacosError(`WIFI`, `failed to glob for ${path}: ${matches}`);
  }

  let wifis: Wifi[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const results = parseWifi(entry, accessor);
    if (results instanceof MacosError) {
      continue;
    }
    wifis = wifis.concat(results);
  }

  return wifis;
}

/**
 * Function to parse the Wifi plist data
 * @param entry `GlobMatch` object to plist file to parse
 * @param accessor `Accessor` instance to use
 * @returns Array of `Wifi` entries
 */
function parseWifi(entry: GlobMatch, accessor: Accessor): Wifi[] | MacosError {
  const bytes = accessor.readFileHandle(entry.handle as FileHandle);
  if (bytes instanceof FileError) {
    return new MacosError(`WIFI`, `failed to read '${entry.meta.display_path}': ${bytes}`);
  }

  const data = getPlist(bytes);
  if (data instanceof FileError) {
    return new MacosError(`WIFI`, `failed to parse '${entry.meta.display_path}': ${data}`);
  }

  const wifi_data = data as Record<string, WifiPlist>;
  const wifis: Wifi[] = [];

  for (const entry in wifi_data) {
    const value = wifi_data[entry];
    if (value === undefined) {
      continue;
    }
    const wifi_value: Wifi = {
      name: entry.replace("wifi.network.ssid.", ""),
      security: value.SupportedSecurityTypes,
      hidden: value.Hidden,
      roaming_profile: value.__OSSpecific__.RoamingProfileType,
      add_reason: value.AddReason,
      added_at: value.AddedAt,
      auto_join: value.AutoJoinDisabled,
      personal_hotspot: (value.PersonalHotspot === undefined)
        ? false
        : value.PersonalHotspot as boolean,
      joined_by_user_at: value.JoinedByUserAt,
      last_discovered: value.LastDiscoveredAt,
      updated_at: value.UpdatedAt,
    };
    wifis.push(wifi_value);
  }
  return wifis;
}
