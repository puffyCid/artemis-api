import { Wifi, WifiPlist } from "../../../types/macos/plist/wifi";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to parse joined Wifi networks on macOS. Supports macOS Catalina+
 * @returns Array `Wifi` networks
 */
export function wifiNetworks(alt_path?: string): Wifi[] {
  let paths = [
    "/Library/Preferences/com.apple.wifi.known-networks.plist",
    // Pre-catalina
    // "/Library/Preferences/SystemConfiguration/com.apple.airport.preferences.plist"
  ];

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }

  let wifis: Wifi[] = [];
  for (const path of paths) {
    wifis = wifis.concat(parseWifi(path));
  }
  return wifis;
}

/**
 * Function to parse the Wifi plist data
 * @param path Path to plist file to parse
 * @returns Array of `Wifi` entries
 */
function parseWifi(path: string): Wifi[] {
  const plist_data = getPlist(path);
  if (plist_data instanceof MacosError) {
    console.warn(`failed to parse plist ${path}: ${plist_data}`);
    return [];
  }
  const wifi_data = plist_data as Record<string, WifiPlist>;
  const wifis: Wifi[] = [];

  for (const entry in wifi_data) {
    const value = wifi_data[ entry ];
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
