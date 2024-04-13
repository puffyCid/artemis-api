/**
 * Linux exported functions
 */
export { getElf } from "./src/linux/elf.ts";
export { getJournal } from "./src/linux/journal.ts";
export { getLogon } from "./src/linux/logon.ts";
export { getSudoLogsLinux } from "./src/linux/sudo.ts";
export { getDebInfo } from "./src/linux/deb.ts";
export { getRpmInfo } from "./src/linux/rpm.ts";

/**
 * macOS exported functions
 */
export { parseAlias } from "./src/macos/alias.ts";
export { parseBom } from "./src/macos/bom.ts";
export { getEmond } from "./src/macos/emond.ts";
export { getLoginitems } from "./src/macos/loginitems.ts";
export { getLaunchdAgents, getLaunchdDaemons } from "./src/macos/launchd.ts";
export { getGroups, getUsers } from "./src/macos/accounts.ts";
export { getExecpolicy } from "./src/macos/execpolicy.ts";
export { getFsevents } from "./src/macos/fsevents.ts";
export {
  getCasks,
  getHomebrewInfo,
  getPackages,
} from "./src/macos/homebrew.ts";
export { getMacho } from "./src/macos/macho.ts";
export { getPlist } from "./src/macos/plist.ts";
export {
  getUnifiedLog,
  setupUnifiedLogParser,
} from "./src/macos/unifiedlogs.ts";
export {
  getSafariDownloads,
  getSafariHistory,
  getSafariUsersDownloads,
  getSafariUsersHistory,
} from "./src/macos/safari.ts";
export { getSpotlight, setupSpotlightParser } from "./src/macos/spotlight.ts";
export { getSudoLogsMacos } from "./src/macos/sudo.ts";
export { queryTccDb } from "./src/macos/sqlite/tcc.ts";
export { listApps, scanApps } from "./src/macos/plist/apps.ts";
export { dockTiles } from "./src/macos/plist/docktile.ts";
export { firewallStatus } from "./src/macos/plist/firewall.ts";
export { passwordPolicy } from "./src/macos/plist/policies.ts";
export { systemExtensions } from "./src/macos/plist/system_extensions.ts";
export { wifiNetworks } from "./src/macos/plist/wifi.ts";
export { parseRequirementBlob } from "./src/macos/codesigning/blob.ts";
export { getXprotectDefinitions } from "./src/macos/plist/xprotect.ts";
export { parseBiome } from "./src/macos/biome.ts";
export { luluRules } from "./src/macos/plist/lulu.ts";
export { munkiApplicationUsage } from "./src/macos/sqlite/munki.ts";

/**
 * Unix exported functions
 */
export { getCron } from "./src/unix/cron.ts";
export {
  getBashHistory,
  getPythonHistory,
  getZshHistory,
} from "./src/unix/shell_history.ts";

/**
 * Cross platform exported functions
 */
export { outputResults } from "./src/system/output.ts";
export {
  getSysteminfo,
  hostname,
  kernelVersion,
  osVersion,
  platform,
  PlatformType,
  uptime,
} from "./src/system/systeminfo.ts";
export { disks } from "./src/system/disks.ts";
export { cpus } from "./src/system/cpu.ts";
export { memory, processListing } from "./src/system/memory.ts";
/**
 * Application exported functions
 */
export {
  getChromiumAutofill,
  getChromiumBookmarks,
  getChromiumCookies,
  getChromiumDownloads,
  getChromiumHistory,
  getChromiumUsersDownloads,
  getChromiumUsersHistory,
  getChromiumDips,
  getChromiumLogins,
  chromiumPreferences,
} from "./src/applications/chromium.ts";
export {
  getFirefoxCookies,
  getFirefoxDownloads,
  getFirefoxHistory,
  getFirefoxUsersDownloads,
  getFirefoxUsersHistory,
} from "./src/applications/firefox.ts";
export { fileHistory, getExtensions } from "./src/applications/vscode.ts";
export { recentFiles } from "./src/applications/libreoffice.ts";
export { querySqlite } from "./src/applications/sqlite.ts";

/**
 * Windows exported functions
 */
export { getAltAmcache, getAmcache } from "./src/windows/amcache.ts";
export { getBits, getBitsPath } from "./src/windows/bits.ts";
export { getEventlogs } from "./src/windows/eventlogs.ts";
export { readAdsData, readRawFile } from "./src/windows/ntfs.ts";
export { getPe } from "./src/windows/pe.ts";
export { getPrefetch, getPrefetchPath } from "./src/windows/prefetch.ts";
export { getRegistry } from "./src/windows/registry.ts";
export { getSearch } from "./src/windows/search.ts";
export { getAltShellbags, getShellbags } from "./src/windows/shellbags.ts";
export { getAltShimcache, getShimcache } from "./src/windows/shimcache.ts";
export { getCustomShimdb, getShimdb } from "./src/windows/shimdb.ts";
export { getLnkFile } from "./src/windows/shortcuts.ts";
export {
  getSrumApplicationInfo,
  getSrumApplicationTimeline,
  getSrumApplicationVfu,
  getSrumEnergyInfo,
  getSrumEnergyUsage,
  getSrumNetworkConnectivity,
  getSrumNetworkInfo,
  getSrumNotifications,
} from "./src/windows/srum.ts";
export { getAltUserassist, getUserassist } from "./src/windows/userassist.ts";
export { getAltUsersWin, getUsersWin } from "./src/windows/users.ts";
export { getAltUsnjrnl, getUsnjrnl } from "./src/windows/usnjrnl.ts";
export { getTaskFile, getTasks } from "./src/windows/tasks.ts";
export { getServiceFile, getServices } from "./src/windows/services.ts";
export { getJumplistPath, getJumplists } from "./src/windows/jumplists.ts";
export { getRecycleBin, getRecycleBinFile } from "./src/windows/recyclebin.ts";
export { getChocolateyInfo } from "./src/windows/chocolatey.ts";
export { logonsWindows } from "./src/windows/eventlogs/logons.ts";
export { getShellItem } from "./src/windows/shellitems.ts";
export { userAccessLog } from "./src/windows/ese/ual.ts";
export { parseTable } from "./src/windows/ese.ts";
export { updateHistory } from "./src/windows/ese/updates.ts";
export { getWmiPersist } from "./src/windows/wmi.ts";
