import {
  ChromiumDownloads,
  ChromiumHistory,
  get_chromium_downloads,
  get_chromium_history,
  get_chromium_users_downloads,
  get_chromium_users_history,
  RawChromiumDownloads,
  RawChromiumHistory,
} from "./src/applications/chromium.ts";
import {
  FirefoxDownloads,
  FirefoxHistory,
  get_firefox_downloads,
  get_firefox_history,
  get_firefox_users_downloads,
  get_firefox_users_history,
  RawFirefoxDownloads,
  RawFirefoxHistory,
} from "./src/applications/firefox.ts";
import {
  get_safari_downloads,
  get_safari_history,
  get_safari_users_downloads,
  get_safari_users_history,
  RawSafariDownloads,
  RawSafariHistory,
  SafariDownloads,
  SafariHistory,
} from "./src/applications/safari.ts";
import { get_groups, get_users, Groups, Users } from "./src/macos/accounts.ts";
import { Emond, get_emond } from "./src/macos/emond.ts";
import { ExecPolicy, get_execpolicy } from "./src/macos/execpolicy.ts";
import { Fsevents, get_fsevents } from "./src/macos/fsevents.ts";
import {
  get_launchd_agents,
  get_launchd_daemons,
  Launchd,
} from "./src/macos/launchd.ts";
import { get_loginitems, LoginItems } from "./src/macos/loginitems.ts";
import { get_macho, MachoInfo } from "./src/macos/macho.ts";
import { get_plist } from "./src/macos/plist.ts";
import { get_mac_processes, MacosProcessInfo } from "./src/macos/processes.ts";
import { get_unified_log, UnifiedLog } from "./src/macos/unifiedlogs.ts";
import { Cron, get_cron } from "./src/unix/cron.ts";
import {
  BashHistory,
  get_bash_history,
  get_python_history,
  get_zsh_history,
  PythonHistory,
  ZshHistory,
} from "./src/unix/shell_history.ts";
import { Amcache, get_alt_amcache, get_amcache } from "./src/windows/amache.ts";
import { Bits, get_bits, get_bits_path } from "./src/windows/bits.ts";
import { EventLogRecord, get_eventlogs } from "./src/windows/eventlogs.ts";
import { read_ads_data, read_raw_file } from "./src/windows/ntfs.ts";
import { get_pe, PeInfo } from "./src/windows/pe.ts";
import {
  get_prefetch,
  get_prefetch_path,
  Prefetch,
} from "./src/windows/prefetch.ts";
import {
  get_win_processes,
  WindowsProcessInfo,
} from "./src/windows/processes.ts";
import { get_registry, Registry } from "./src/windows/registry.ts";
import { get_search, SearchEntry } from "./src/windows/search.ts";
import {
  get_alt_shellbags,
  get_shellbags,
  Shellbags,
} from "./src/windows/shellbags.ts";
import {
  get_alt_shimcache,
  get_shimcache,
  Shimcache,
} from "./src/windows/shimcache.ts";
import {
  get_alt_shimdb,
  get_custom_shimdb,
  get_shimdb,
  Shimdb,
} from "./src/windows/shimdb.ts";
import { get_lnk_file, Shortcut } from "./src/windows/shortcuts.ts";
import {
  ApplicationInfo,
  ApplicationTimeline,
  AppVfu,
  EnergyInfo,
  EnergyUsage,
  get_srum_application_info,
  get_srum_application_timeline,
  get_srum_application_vfu,
  get_srum_energy_info,
  get_srum_energy_usage,
  get_srum_network_connectivity,
  get_srum_network_info,
  get_srum_notifications,
  NetworkConnectivityInfo,
  NetworkInfo,
  NotificationInfo,
} from "./src/windows/srum.ts";
import { get_systeminfo, SystemInfo } from "./src/windows/systeminfo.ts";
import {
  get_alt_userassist,
  get_userassist,
  UserAssist,
} from "./src/windows/userassist.ts";
import {
  get_alt_users_win,
  get_users_win,
  UserInfo,
} from "./src/windows/users.ts";
import {
  get_alt_usnjrnl,
  get_usnjrnl,
  UsnJrnl,
} from "./src/windows/usnjrnl.ts";

/**
 * Function to parse `Launchd agents` on a macOS system
 * @returns Array of `Launchd agents` parsed from a plist file
 */
export function getLaunchdAgents(): Launchd[] {
  return get_launchd_agents();
}

/**
 * Function to parse `Launchd daemons` on a macOS system
 * @returns Array of `Launchd daemons` parsed from a plist file
 */
export function getLaunchdDaemons(): Launchd[] {
  return get_launchd_daemons();
}

/**
 * Function to parse the `Unified logs` on a macOS system
 * @param path Full path to a Unified log file
 * @returns Array of Unified log entries
 */
export function getUnifiedLog(path: string): UnifiedLog[] {
  return get_unified_log(path);
}

/**
 * Function to parse a `plist` file. This function either returns a `plist` as a JSON struct
 * or null
 * @param path Full path to a `plist` file
 * @returns `plist` data represented as a JSON object or an object representing an error
 */
export function getPlist(path: string): Record<string, unknown> | null {
  return get_plist(path);
}

/**
 * Function to parse `FsEvents` records
 * @returns Array of FsEvent records
 */
export function getFsEvents(): Fsevents[] {
  return get_fsevents();
}

/**
 * Function to parse a `macho` executable. This function either returns a parsed `macho` binary
 * or null for no data
 * @param path Full path to a `macho` file
 * @returns Basic `macho` structure or null
 */
export function getMacho(path: string): MachoInfo[] | null {
  return get_macho(path);
}

/**
 * Function to parse the `LoginItems` on a system
 * @returns Array of `LoginItems`
 */
export function getLoginItems(): LoginItems[] {
  return get_loginitems();
}

/**
 * Function to parse the local `Users` on a macOS system
 * @returns Array of `Users`
 */
export function getUsers(): Users[] {
  return get_users();
}

/**
 * Function to parse the local `Groups` on a macOS system
 * @returns Array of `Groups`
 */
export function getGroups(): Groups[] {
  return get_groups();
}

/**
 * Function to parse the `Emond` rules on a macOS system
 * @returns Array of `Emond` rules
 */
export function getEmond(): Emond[] {
  return get_emond();
}

/**
 * Get Safari history for all users on an endpoint
 * @returns Array of `SafariHistory` entries for all users
 */
export function getSafariUsersHistory(): SafariHistory[] {
  return get_safari_users_history();
}

/**
 * Get Safari history from provided `History.db` file
 * @param path Full path to `History.db` file
 * @returns `RawSafariHistory` entries for file
 */
export function getSafariHistory(path: string): RawSafariHistory[] {
  return get_safari_history(path);
}

/**
 * Get Safari downloads for all users on an endpoint
 * @returns Array of `SafariDownloads` entries for all users
 */
export function getSafariUsersDownloads(): SafariDownloads[] {
  return get_safari_users_downloads();
}

/**
 * Get Safari downloads from provided `Downloads.plist` file
 * @param path Full path to `History` file
 * @returns `RawSafariDownloads` entries for file
 */
export function getSafariDownloads(path: string): RawSafariDownloads[] {
  return get_safari_downloads(path);
}

/**
 * Function to parse the `ExecPolicy` on a macOS system
 * @returns Array of `ExecPolicy` records
 */
export function getExecPolicy(): ExecPolicy[] {
  return get_execpolicy();
}

/**
 * Function to pull a process listing from Windows
 * @param md5 MD5 hash the process binary
 * @param sha1 SHA1 hash the process binary
 * @param sha256 SHA256 hash the process binary
 * @param macho_info Parse MACHO metadata from the process binary
 * @returns Array of `MacosProcessInfo`
 */
export function getMacProcesses(
  md5: boolean,
  sha1: boolean,
  sha256: boolean,
  macho_info: boolean,
): MacosProcessInfo[] {
  return get_mac_processes(md5, sha1, sha256, macho_info);
}

/**
 * Windows functions start here
 */

/**
 * Function to parse `Shimcache` entries on the systemdrive
 * @returns Array of `Shimcache` entries parsed from the sysystemdrive letter
 */
export function getShimcache(): Shimcache[] {
  return get_shimcache();
}

/**
 * Function to parse `Shimcache` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `Shimcache` entries parsed from a Windows drive letter
 */
export function getAltShimcache(drive: string): Shimcache[] {
  return get_alt_shimcache(drive);
}

/**
 * Function to parse a `Shortcut (lnk)` file
 * @param path Full path to `lnk` file
 * @returns `Shortcut (lnk) info`
 */
export function getLnkFile(path: string): Shortcut {
  return get_lnk_file(path);
}

/**
 * Function to parse an `evtx` file
 * @param path Full path to `evtx` file
 * @returns Array of `event log` records
 */
export function getEventLogs(path: string): EventLogRecord[] {
  return get_eventlogs(path);
}

/**
 * Function to parse a `Registry` file
 * @param path Full path to a `Registry` file
 * @returns Array of `Registry` entries
 */
export function getRegistry(path: string): Registry[] {
  return get_registry(path);
}

/**
 * Function to parse the `UsnJrnl` on the systemdrive
 * @returns Array of `UsnJrnl` entries from sysystemdrive letter
 */
export function getUsnJrnl(): UsnJrnl[] {
  return get_usnjrnl();
}

/**
 * Function to parse the `UsnJrnl` on an alternative driver
 * @returns Array of `UsnJrnl` entries from a Windows driver letter
 */
export function getAltUsnJrnl(drive: string): UsnJrnl[] {
  return get_alt_usnjrnl(drive);
}

/**
 * Function to parse and reconstruct `Shellbags` on the systemdrive
 * @param resolve_guids Whether to lookup GUID values. Ex: Convert `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
 * @returns Array of `Shellbag` entries from from systemdrive
 */
export function getShellbags(resolve_guids: boolean): Shellbags[] {
  return get_shellbags(resolve_guids);
}

/**
 * Function to parse and reconstruct `Shellbags` on an alternative drive
 * @param resolve_guids Whether to lookup GUID values. Ex: Convert `20d04fe0-3aea-1069-a2d8-08002b30309d` to `This PC`
 * @param drive Drive letter to use to parse the `shellbags`
 * @returns Array of `Shellbag` entries
 */
export function getAltShellbags(
  resolve_guids: boolean,
  drive: string,
): Shellbags[] {
  return get_alt_shellbags(resolve_guids, drive);
}

/**
 * Function to read a file by accessing the raw `NTFS` filesystem.
 * This function can be used to read locked files.
 * It currently reads the whole file into memory!
 * Use with **CAUTION**
 * @param path Full path to file to read
 * @returns Bytes read
 */
export function readRawFile(path: string): Uint8Array {
  return read_raw_file(path);
}

/**
 * Function to read an `Alternative data stream (ADS)`.
 * This function has a data size limit of 2GB. It will not read ADS data greater than 2GBs.
 * It will skip sparse data when reading the ADS data
 * Supports resident and non-resident ADS data
 * @param path Full path to file
 * @param ads_name Name of `Alternative data stream (ADS)` to read
 * @returns Bytes read
 */
export function readAdsData(path: string, ads_name: string): Uint8Array {
  return read_ads_data(path, ads_name);
}

/**
 * Function to parse a `pe` executable. This function either returns a parsed `pe` binary
 * or null for no data
 * @param path Full path to a `pe` file
 * @returns Basic `pe` structure or null
 */
export function getPe(path: string): PeInfo | null {
  return get_pe(path);
}

/**
 * Function to parse default `Prefetch` directory
 * @returns `Array of Prefetch data`
 */
export function getPrefetch(): Prefetch[] {
  return get_prefetch();
}

/**
 * Function to parse a directory containing `Prefetch` files (.pf)
 * @returns `Array of Prefetch data`
 */
export function getPrefetchPath(path: string): Prefetch[] {
  return get_prefetch_path(path);
}

/**
 * Function to parse `Amcache` entries on the systemdrive
 * @returns Array of `Amcache` entries parsed from the sysystemdrive letter
 */
export function getAmcache(): Amcache[] {
  return get_amcache();
}

/**
 * Function to parse `Amcache` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `Amcache` entries parsed from a Windows drive letter
 */
export function getAltAmcache(drive: string): Amcache[] {
  return get_alt_amcache(drive);
}

/**
 * Function to parse `UserAssist` entries on the systemdrive
 * @returns Array of `UserAssist` entries parsed from the sysystemdrive letter
 */
export function getUserAssist(): UserAssist[] {
  return get_userassist();
}

/**
 * Function to parse `UserAssist` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `UserAssist` entries parsed from a Windows drive letter
 */
export function getAltUserAssist(drive: string): UserAssist[] {
  return get_alt_userassist(drive);
}

/**
 * Function to parse `ShimDB` entries on the systemdrive
 * @returns Array of `ShimDB` entries parsed from the sysystemdrive letter
 */
export function getShimdb(): Shimdb[] {
  return get_shimdb();
}

/**
 * Function to parse `ShimDB` entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `ShimDB` entries parsed from a Windows drive letter
 */
export function getAltShimdb(drive: string): Shimdb[] {
  return get_alt_shimdb(drive);
}

/**
 * Function to parse a custom SDB file. SDB files can exist anywhere on a Windows system
 * Will only read files less than 10MB in size (SDB files are typically only 1-5KB in size)
 * @param path full path to custom sdb file
 * @returns Array of `ShimDB` entries from sdb file or null
 */
export function getCustomShimdb(path: string): Shimdb | null {
  return get_custom_shimdb(path);
}

/**
 * Function to parse default `BITS` location
 * @param carve Whether to carve additional jobs and files
 * @returns `BITS` object containing bits, carved jobs, carved files arrays
 */
export function getBits(carve: boolean): Bits {
  return get_bits(carve);
}

/**
 * Function to parse `BITS` file at provided path
 * @param path path to `BITS` file
 * @param carve Whether to carve additional jobs and files
 * @returns `BITS` object containing bits, carved jobs, carved files arrays
 */
export function getBitsPath(path: string, carve: boolean): Bits {
  return get_bits_path(path, carve);
}

/**
 * Function to parse and Application info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `ApplicationInfo` entries
 */
export function getSrumApplicationInfo(path: string): ApplicationInfo[] {
  return get_srum_application_info(path);
}

/**
 * Function to parse and get Application timeline info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `ApplicationTimeline` entries
 */
export function getSrumApplicationTimeline(
  path: string,
): ApplicationTimeline[] {
  return get_srum_application_timeline(path);
}

/**
 * Function to parse and get `AppVFU` info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `AppVfu` entries
 */
export function getSrumApplicationVFU(path: string): AppVfu[] {
  return get_srum_application_vfu(path);
}

/**
 * Function to parse and get `EnergyInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `EnergyInfo`
 */
export function getSrumEnergyInfo(path: string): EnergyInfo[] {
  return get_srum_energy_info(path);
}

/**
 * Function to parse `EnergyUsage` info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `EnergyUsage`
 */
export function getSrumEnergyUsage(path: string): EnergyUsage[] {
  return get_srum_energy_usage(path);
}

/**
 * Function to parse `NetworkInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NetworkInfo`
 */
export function getSrumNetworkInfo(path: string): NetworkInfo[] {
  return get_srum_network_info(path);
}

/**
 * Function to parse `NetworkConnectivityInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NetworkConnectivityInfo`
 */
export function getSrumConnectivity(path: string): NetworkConnectivityInfo[] {
  return get_srum_network_connectivity(path);
}

/**
 * Function to parse `NotificationInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NotificationInfo`
 */
export function getSrumNotifications(path: string): NotificationInfo[] {
  return get_srum_notifications(path);
}

/**
 * Function to pull a process listing from Windows
 * @param md5 MD5 hash the process binary
 * @param sha1 SHA1 hash the process binary
 * @param sha256 SHA256 hash the process binary
 * @param pe_info Parse PE metadata from the process binary
 * @returns Array of `WindowsProcessInfo`
 */
export function getWinProcesses(
  md5: boolean,
  sha1: boolean,
  sha256: boolean,
  pe_info: boolean,
): WindowsProcessInfo[] {
  return get_win_processes(md5, sha1, sha256, pe_info);
}

/**
 * Function to parse user entries
 * @param drive drive letter
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter
 */
export function getUsersWin(): UserInfo[] {
  return get_users_win();
}

/**
 * Function to parse user entries on an alternative drive
 * @param drive drive letter
 * @returns Array of `UserInfo` entries parsed from a Windows drive letter
 */
export function getAltUsersWin(drive: string): UserInfo[] {
  return get_alt_users_win(drive);
}

/**
 * Function to pull systeminfo
 * @returns `SystemInfo` object
 */
export function getSystemInfo(): SystemInfo {
  return get_systeminfo();
}

/**
 * Function to parse Windows Search data. Supports both ESE and SQLITE databases
 * The Search database can get extremely large, consider using a filter script that accepts `SearchEntry[]` as an argument.
 * @param path Path to a Windows Search file. Supports `Windows.edb` or `Windows.db`
 * @returns Array of `SearchEntry` entries
 */
export function getSearch(path: string): SearchEntry[] {
  return get_search(path);
}

/**
 * Application functions start here
 */

/**
 * Get Firefox history for all users on an endpoint
 * @returns Array of `FirefoxHistory` entries for all users
 */
export function getFirefoxUsersHistory(): FirefoxHistory[] {
  return get_firefox_users_history();
}

/**
 * Get Firefox history from provided `places.sqlite` file
 * @param path Full path to `places.sqlite` file
 * @returns `RawFirefoxHistory` entries for file
 */
export function getFirefoxHistory(path: string): RawFirefoxHistory[] {
  return get_firefox_history(path);
}

/**
 * Get Firefox downloads for all users on an endpoint
 * @returns Array of `FirefoxDownloads` entries for all users
 */
export function getFirefoxUsersDownloads(): FirefoxDownloads[] {
  return get_firefox_users_downloads();
}

/**
 * Get Firefox downloads from provided `places.sqlite` file
 * @param path Full path to `places.sqlite` file
 * @returns `RawFirefoxDownloads` entries for file
 */
export function getFirefoxDownloads(path: string): RawFirefoxDownloads[] {
  return get_firefox_downloads(path);
}

/**
 * Get Chromium history for all users on an endpoint
 * @returns Array of `ChromiumHistory` entries for all users
 */
export function getChromiumUsersHistory(): ChromiumHistory[] {
  return get_chromium_users_history();
}

/**
 * Get Chromium history from provided `History` file
 * @param path Full path to `History` file
 * @returns `RawChromiumHistory` entries for file
 */
export function getChromiumHistory(path: string): RawChromiumHistory[] {
  return get_chromium_history(path);
}

/**
 * Get Chromium downloads for all users on an endpoint
 * @returns Array of `ChromiumDownloads` entries for all users
 */
export function getChromiumUsersDownloads(): ChromiumDownloads[] {
  return get_chromium_users_downloads();
}

/**
 * Get Chromium downloads from provided `History` file
 * @param path Full path to `History` file
 * @returns `RawChromiumDownloads` entries for file
 */
export function getChromiumDownloads(path: string): RawChromiumDownloads[] {
  return get_chromium_downloads(path);
}

/**
 * Unix functions start here
 */

/**
 * Parse and get the contents of the `.bash_history` file for all users on an endpoint
 * @returns Array of `BashHistory` for each user on the endpoint
 */
export function getBashHistory(): BashHistory[] {
  return get_bash_history();
}

/**
 * Parse and get the contents of the `.zsh_history` file for all users on an endpoint
 * @returns Array of `ZshHistory` for each user on the endpoint
 */
export function getZshHistory(): ZshHistory[] {
  return get_zsh_history();
}

/**
 * Parse and get the contents of the `.bash_history` file for all users on an endpoint
 * @returns Array of `BashHistory` for each user on the endpoint
 */
export function getPythonHistory(): PythonHistory[] {
  return get_python_history();
}

/**
 * Parse `Cron` files on an endpoint
 * @returns Array of `Cron` entries
 */
export function getCron(): Cron[] {
  return get_cron();
}
