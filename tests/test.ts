/**
 * Application exported test functions
 */
export { testLevelLdb } from "../src/applications/leveldb/table";
export { testLevelWal } from "../src/applications/leveldb/wal";
export { testRecentFiles } from "../src/applications/libreoffice";
export { testReadTrace } from "../src/applications/anydesk/trace";
export { testReadConfig } from "../src/applications/anydesk/conf";

/**
 * Linux exported test functions
 */
export { testGetGnomeExtensions } from "../src/linux/gnome/extensions";
export { testGeditRecentFiles } from "../src/linux/gnome/gedit";
export { testRpmInfo } from "../src/linux/rpm";
export { testFirmwareHistory } from "../src/linux/firmware";
/**
 * Windows exported test functions
 */

export { testPowerShellHistory } from "../src/windows/powershell";
export { testLogonsWindows } from "../src/windows/eventlogs/logons";
export { testParseMru } from "../src/windows/registry/recently_used";