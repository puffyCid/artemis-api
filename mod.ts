/**
 * Linux exported functions
 */
export { getElf } from "./src/linux/elf.ts";
export { getJournal } from "./src/linux/journal.ts";
export { getLogon } from "./src/linux/logon.ts";
export { getSudoLogsLinux } from "./src/linux/sudo.ts";
export { getDebInfo } from "./src/linux/deb.ts";
export { getRpmInfo } from "./src/linux/rpm.ts";
export { listSnaps } from "./src/linux/snap.ts";
export { getGnomeExtensions } from "./src/linux/gnome/extensions.ts";
export { geditRecentFiles } from "./src/linux/gnome/gedit.ts";
export { parseGvfs } from "./src/linux/gnome/gvfs.ts";
export { gnomeAppUsage } from "./src/linux/gnome/usage.ts";

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
export { getUnifiedLog } from "./src/macos/unifiedlogs.ts";
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
export { quarantineEvents } from "./src/macos/sqlite/quarantine.ts";
export { gatekeeperEntries } from "./src/macos/sqlite/gatekeeper.ts";
export { parseCookies } from "./src/macos/safari/cookies.ts";

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
export { dumpData, outputResults } from "./src/system/output.ts";
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
  chromiumDownloads,
  chromiumHistory,
  chromiumPreferences,
  getChromiumAutofill,
  getChromiumBookmarks,
  getChromiumCookies,
  getChromiumDips,
  getChromiumLogins,
} from "./src/applications/chromium.ts";
export {
  FireFox,
} from "./src/applications/firefox/fox.ts";
export { fileHistory, getExtensions } from "./src/applications/vscode.ts";
export { recentFiles } from "./src/applications/libreoffice.ts";
export { querySqlite } from "./src/applications/sqlite.ts";

/**
 * Windows exported functions
 */
export { getAmcache } from "./src/windows/amcache.ts";
export { getBits } from "./src/windows/bits.ts";
export { getEventlogs } from "./src/windows/eventlogs.ts";
export { readAdsData, readRawFile } from "./src/windows/ntfs.ts";
export { getPe } from "./src/windows/pe.ts";
export { getPrefetch } from "./src/windows/prefetch.ts";
export { getRegistry } from "./src/windows/registry.ts";
export { getSearch } from "./src/windows/search.ts";
export { getShellbags } from "./src/windows/shellbags.ts";
export { getShimcache } from "./src/windows/shimcache.ts";
export { getShimdb } from "./src/windows/shimdb.ts";
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
export { getUserassist } from "./src/windows/userassist.ts";
export { getUsersWin } from "./src/windows/users.ts";
export { getUsnjrnl } from "./src/windows/usnjrnl.ts";
export { getTasks } from "./src/windows/tasks.ts";
export { getServices } from "./src/windows/services.ts";
export { getJumplists } from "./src/windows/jumplists.ts";
export { getRecycleBin } from "./src/windows/recyclebin.ts";
export { getChocolateyInfo } from "./src/windows/chocolatey.ts";
export { logonsWindows } from "./src/windows/eventlogs/logons.ts";
export { getShellItem } from "./src/windows/shellitems.ts";
export { getWmiPersist } from "./src/windows/wmi.ts";
export { powershellHistory } from "./src/windows/powershell.ts";
export { parseMru } from "./src/windows/registry/recently_used.ts";
export { listUsbDevices } from "./src/windows/registry/usb.ts";
export { parseWordWheel } from "./src/windows/registry/wordwheel.ts";
export { UserAccessLogging } from "./src/windows/ese/ual.ts";
export { Updates } from "./src/windows/ese/updates.ts";
export { Outlook } from "./src/windows/outlook.ts";

/**
 * Timelining
 */
export { timelineArtifact } from "./src/timesketch/timeline.ts";
export { Timesketch } from "./src/timesketch/client.ts";

/**
 * Unfold
 */
export { Unfold } from "./src/unfold/client.ts";

/**
 * iOS
 */

export { extractBackup } from "./src/ios/itunes/backup.ts";