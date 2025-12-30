/**
 * Application exported test functions
 */
export { testLevelLdb } from "../src/applications/leveldb/table";
export { testLevelWal } from "../src/applications/leveldb/wal";
export { testRecentFiles } from "../src/applications/libreoffice";
export { testReadTrace } from "../src/applications/anydesk/trace";
export { testReadConfig } from "../src/applications/anydesk/conf";
export { testReadOdlFiles } from "../src/applications/onedrive/odl";
export { testOneDrive } from "../src/applications/onedrive/onedrive";
export { testExtractSyncEngine } from "../src/applications/onedrive/sqlite";
export { testChromiumJsonFiles } from "../src/applications/chromium/json";
export { testChromiumPreferences } from "../src/applications/chromium/preferences";
export { testChromiumLocalStorage } from "../src/applications/chromium/level";
export { testChromiumSessions } from "../src/applications/chromium/sessions";
export { testChromiumSqlite } from "../src/applications/chromium/sqlite";

/**
 * Linux exported test functions
 */
export { testGetGnomeExtensions } from "../src/linux/gnome/extensions";
export { testGeditRecentFiles } from "../src/linux/gnome/gedit";
export { testRpmInfo } from "../src/linux/rpm";
export { testFirmwareHistory } from "../src/linux/firmware";
export { testGnomeAppUsage } from "../src/linux/gnome/usage";
export { testParseGvfs } from "../src/linux/gnome/gvfs";
export { testQueryLogons } from "../src/linux/sqlite/wtmpdb";

/**
 * Windows exported test functions
 */
export { testPowerShellHistory } from "../src/windows/powershell";
export { testLogonsWindows } from "../src/windows/eventlogs/logons";
export { testParseMru } from "../src/windows/registry/recently_used";
export { testWindowsWifiNetworks } from "../src/windows/registry/wifi";
export { testGetRunKeys } from "../src/windows/registry/run";
export { testServiceInstalls } from "../src/windows/eventlogs/services";

/**
 * macOS exported test functions
 */
export { testHomebrew } from "../src/macos/homebrew";
export { testParseBom } from "../src/macos/bom";

/**
 * HTTP exported test functions
 */
export { testCircluHashlookup } from "../src/http/circlu";
export { testCheckEolStatus } from "../src/http/eol";