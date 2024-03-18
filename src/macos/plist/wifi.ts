import { Wifi, WifiPlist } from "../../../types/macos/plist/wifi.ts";
import { MacosError } from "../errors.ts";
import { getPlist } from "../plist.ts";

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

  if (alt_path != undefined) {
    paths = [alt_path];
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
  const wifis = [];

  for (const entry in wifi_data) {
    const wifi_value: Wifi = {
      name: entry.replace("wifi.network.ssid.", ""),
      security: wifi_data[entry].SupportedSecurityTypes,
      hidden: wifi_data[entry].Hidden,
      roaming_profile: wifi_data[entry].__OSSpecific__.RoamingProfileType,
      add_reason: wifi_data[entry].AddReason,
      added_at: wifi_data[entry].AddedAt,
      auto_join: wifi_data[entry].AutoJoinDisabled,
      personal_hotspot: (wifi_data[entry].PersonalHotspot === undefined)
        ? false
        : wifi_data[entry].PersonalHotspot as boolean,
      joined_by_user_at: wifi_data[entry].JoinedByUserAt,
      last_discovered: wifi_data[entry].LastDiscoveredAt,
      updated_at: wifi_data[entry].UpdatedAt,
    };
    wifis.push(wifi_value);
  }
  return wifis;
}
