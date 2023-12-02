/**
 * Linux exported functions
 */
export { getElf } from "./src/linux/elf.ts";
export { getJournal } from "./src/linux/journal.ts";
export { getLogon } from "./src/linux/logon.ts";

/**
 * macOS exported functions
 */
export { getEmond } from "./src/macos/emond.ts";
export { getLoginitems } from "./src/macos/loginitems.ts";
export { getLaunchdAgents, getLaunchdDaemons } from "./src/macos/launchd.ts";
export { getGroups, getUsers } from "./src/macos/accounts.ts";
export { getExecpolicy } from "./src/macos/execpolicy.ts";
export { getFsevents } from "./src/macos/fsevents.ts";
export { getMacho } from "./src/macos/macho.ts";
export { getPlist } from "./src/macos/plist.ts";
export { getUnifiedLog } from "./src/macos/unifiedlogs.ts";
export {
  getSafariDownloads,
  getSafariHistory,
  getSafariUsersDownloads,
  getSafariUsersHistory,
} from "./src/macos/safari.ts";

/**
 * Unix exported functions
 */
export { getSudoLogs } from "./src/unix/sudologs.ts";
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
  uptime,
} from "./src/system/systeminfo.ts";
export { disks } from "./src/system/disks.ts";
export { cpus } from "./src/system/cpu.ts";
export { memory, processListing } from "./src/system/memory.ts";
/**
 * Application exported functions
 */
export {
  getChromiumDownloads,
  getChromiumHistory,
  getChromiumUsersDownloads,
  getChromiumUsersHistory,
} from "./src/applications/chromium.ts";
export {
  getFirefoxDownloads,
  getFirefoxHistory,
  getFirefoxUsersDownloads,
  getFirefoxUsersHistory,
} from "./src/applications/firefox.ts";

/**
 * Windows exported functions
 */
export { getAltAmcache, getAmcache } from "./src/windows/amache.ts";
export { getBits, getBitsPath } from "./src/windows/bits.ts";
export { getEventlogs } from "./src/windows/eventlogs.ts";
export { readAdsData, readRawFile } from "./src/windows/ntfs.ts";
export { getPe } from "./src/windows/pe.ts";
export { getPrefetch, getPrefetchPath } from "./src/windows/prefetch.ts";
export { getRegistry } from "./src/windows/registry.ts";
export { getSearch } from "./src/windows/search.ts";
export { getAltShellbags, getShellbags } from "./src/windows/shellbags.ts";
export { getAltShimcache, getShimcache } from "./src/windows/shimcache.ts";
export {
  getAltShimdb,
  getCustomShimdb,
  getShimdb,
} from "./src/windows/shimdb.ts";
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
export { getAltTasks, getTaskFile, getTasks } from "./src/windows/tasks.ts";
export {
  getAltServices,
  getServiceFile,
  getServices,
} from "./src/windows/services.ts";
export {
  getAltJumplists,
  getJumplistPath,
  getJumplists,
} from "./src/windows/jumplists.ts";
export { getRecycleBin, getRecycleBinFile } from "./src/windows/recyclebin.ts";
