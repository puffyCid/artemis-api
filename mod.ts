import { Cron, get_cron } from "./src/unix/cron.ts";
import {
  BashHistory,
  get_bash_history,
  get_python_history,
  get_zsh_history,
  PythonHistory,
  ZshHistory,
} from "./src/unix/shell_history.ts";

/**
 * Linux exported functions
 */
export { getElf } from "./src/linux/elf.ts";
export { getLinuxProcesses } from "./src/linux/processes.ts";
export { getJournal } from "./src/linux/journal.ts";

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
export { getMacosProcesses } from "./src/macos/processes.ts";
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
export { getLinuxSudoLogs, getMacosSudoLogs } from "./src/unix/sudologs.ts";

/**
 * Cross platform exported functions
 */
export { outputResults } from "./src/system/output.ts";
export { getSysteminfo } from "./src/system/systeminfo.ts";

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
export { getWinProcesses } from "./src/windows/processes.ts";
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

/**
 * Application functions start here
 */

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
