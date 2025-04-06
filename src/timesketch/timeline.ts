import {
  TimesketchArtifact,
  TimesketchTimeline,
} from "../../types/timesketch/timeline";
import { TimesketchError } from "./error";
import { ProcessInfo } from "../../types/system/processes";
import { LoginItems } from "../../types/macos/loginitems";
import { UnifiedLog } from "../../types/macos/unifiedlogs";
import { HomebrewData } from "../../types/macos/homebrew";
import { Fsevents } from "../../types/macos/fsevents";
import { Groups, Users } from "../../types/macos/accounts";
import { ExecPolicy } from "../../types/macos/execpolicy";
import { MacosFileInfo } from "../../types/macos/files";
import { WindowsFileInfo } from "../../types/windows/files";
import { LinuxFileInfo } from "../../types/linux/files";
import { SafariDownloads, SafariHistory } from "../../types/macos/safari";
import { Launchd } from "../../types/macos/launchd";
import { Emond } from "../../types/macos/emond";
import { Spotlight } from "../../types/macos/spotlight";
import { Prefetch } from "../../types/windows/prefetch";
import { Amcache } from "../../types/windows/amcache";
import { Shimcache } from "../../types/windows/shimcache";
import { Bits } from "../../types/windows/bits";
import { EventLogRecord } from "../../types/windows/eventlogs";
import { Jumplists } from "../../types/windows/jumplists";
import { Shortcut } from "../../types/windows/shortcuts";
import { RecycleBin } from "../../types/windows/recyclebin";
import { Registry } from "../../types/windows/registry";
import { Services } from "../../types/windows/services";
import { Shellbags } from "../../types/windows/shellbags";
import { RawFileInfo } from "../../types/windows/ntfs";
import { Shimdb } from "../../types/windows/shimdb";
import {
  ApplicationInfo,
  ApplicationTimeline,
  AppVfu,
  EnergyInfo,
  EnergyUsage,
  NetworkConnectivityInfo,
  NetworkInfo,
  NotificationInfo,
} from "../../types/windows/srum";
import { SearchEntry } from "../../types/windows/search";
import { TaskData } from "../../types/windows/tasks";
import { UserAssist } from "../../types/windows/userassist";
import { UserInfo } from "../../types/windows/users";
import { UsnJrnl } from "../../types/windows/usnjrnl";
import { WmiPersist } from "../../types/windows/wmi";
import { LogonsWindows } from "../../types/windows/eventlogs/logons";
import { Journal } from "../../types/linux/journal";
import { ChromiumHistory } from "../../types/applications/chromium";

/**
 * macOS artifact timelines
 */
import { timelineLoginItems } from "./artifacts/macos/loginitems";
import { timelineUnifiedLogs } from "./artifacts/macos/unifiedlogs";
import { timelineHomebrew } from "./artifacts/macos/homebrew";
import { timelineFsevents } from "./artifacts/macos/fsevents";
import { timelineUsersMacos } from "./artifacts/macos/users";
import { timelineGroupsMacos } from "./artifacts/macos/groups";
import { timelineExecpolicy } from "./artifacts/macos/execpolicy";
import {
  timelineSafariDownloads,
  timelineSafariHistory,
} from "./artifacts/macos/safari";
import { timelineLaunchd } from "./artifacts/macos/launchd";
import { timelineSpotlight } from "./artifacts/macos/spotlight";
import { timelineEmond } from "./artifacts/macos/emond";
import { timelineGatekeeper } from "./artifacts/macos/sqlite/gatekeeper";
import { GatekeeperEntries } from "../../types/macos/sqlite/gatekeeper";

/**
 * Linux artifact timelines
 */
import { timelineJournals } from "./artifacts/linux/journals";
import type { RpmPackages } from "../../types/linux/rpm";
import { timelineAbrt } from "./artifacts/linux/abrt";
import { Abrt } from "../../types/linux/abrt";
import { timelineRpm } from "./artifacts/linux/rpm";

/**
 * Application artifact timelines
 */
import { timelineChromiumHistory } from "./artifacts/applications/chromium/history";
import { timelineFileHistory } from "./artifacts/applications/vscode";
import { FileHistory } from "../../types/applications/vscode";
import { timelineRecentFiles } from "./artifacts/applications/libreoffice";
import { RecentFilesLibreOffice } from "../../types/applications/libreoffice";

/**
 * Cross platform artifact timelines
 */
import { timelineProcesses } from "./artifacts/processes";
import { timelineFiles } from "./artifacts/files";

/**
 * Windows artifact timelines
 */
import { timelineAmcache } from "./artifacts/windows/amcache";
import { timelineShimcache } from "./artifacts/windows/shimcache";
import { timelinePrefetch } from "./artifacts/windows/prefetch";
import { timelineBits } from "./artifacts/windows/bits";
import { timelineEventLogs } from "./artifacts/windows/eventlogs";
import { timelineJumplists } from "./artifacts/windows/jumplists";
import { timelineShortcuts } from "./artifacts/windows/shortcuts";
import { timelineRecycleBin } from "./artifacts/windows/recyclebin";
import { timelineRegistry } from "./artifacts/windows/registry";
import { timelineShellbags } from "./artifacts/windows/shellbags";
import { timelineServices } from "./artifacts/windows/services";
import { timelineRawFiles } from "./artifacts/windows/ntfs";
import { timelineShimdb } from "./artifacts/windows/shimdb";
import { timelineSearch } from "./artifacts/windows/search";
import { timelineSrum } from "./artifacts/windows/srum";
import { timelineTasks } from "./artifacts/windows/tasks";
import { timelineUserAssist } from "./artifacts/windows/userassist";
import { timelineUsersWindows } from "./artifacts/windows/users";
import { timelineUsnJrnl } from "./artifacts/windows/usnjrnl";
import { timelineWmiPersist } from "./artifacts/windows/wmi";
import { timelineLogonsWindows } from "./artifacts/windows/eventlogs/logons";

/**
 * Function to timeline artifacts parsed by artemis
 * @param data Artifact data to timeline. Must be a supported artifact defined by `TimesketchArtifact`
 * @param artifact A `TimesketchArtifact` artifact to timeline
 * @returns Array of `TimesketchTimeline` or `TimesketchError`
 */
export function timelineArtifact(
  data: unknown,
  artifact: TimesketchArtifact,
): TimesketchTimeline[] | TimesketchError {
  switch (artifact) {
    case TimesketchArtifact.PROCESSESS:
      return timelineProcesses(data as ProcessInfo[]);
    case TimesketchArtifact.LOGINITEMS:
      return timelineLoginItems(data as LoginItems[]);
    case TimesketchArtifact.SUDOLOGS_MACOS:
    case TimesketchArtifact.UNIFIEDLOGS:
      return timelineUnifiedLogs(data as UnifiedLog[]);
    case TimesketchArtifact.HOMEBREW:
      return timelineHomebrew(data as HomebrewData);
    case TimesketchArtifact.FSEVENTS:
      return timelineFsevents(data as Fsevents[]);
    case TimesketchArtifact.USERS_MACOS:
      return timelineUsersMacos(data as Users[]);
    case TimesketchArtifact.GROUPS_MACOS:
      return timelineGroupsMacos(data as Groups[]);
    case TimesketchArtifact.EXECPOLICY:
      return timelineExecpolicy(data as ExecPolicy[]);
    case TimesketchArtifact.GATEKEEPER:
      return timelineGatekeeper(data as GatekeeperEntries[]);
    case TimesketchArtifact.FILES:
      return timelineFiles(
        data as MacosFileInfo[] | LinuxFileInfo[],
        false,
      );
    case TimesketchArtifact.FILES_WINDOWS:
      return timelineFiles(
        data as WindowsFileInfo[],
        true,
      );
    case TimesketchArtifact.EMOND:
      return timelineEmond(data as Emond[]);
    case TimesketchArtifact.SPOTLIGHT:
      return timelineSpotlight(data as Spotlight[]);
    case TimesketchArtifact.LAUNCHD:
      return timelineLaunchd(data as Launchd[]);
    case TimesketchArtifact.SAFARI_DOWNLOADS:
      return timelineSafariDownloads(data as SafariDownloads[]);
    case TimesketchArtifact.SAFARI_HISTORY:
      return timelineSafariHistory(data as SafariHistory[]);
    case TimesketchArtifact.AMCACHE:
      return timelineAmcache(data as Amcache[]);
    case TimesketchArtifact.SHIMCACHE:
      return timelineShimcache(data as Shimcache[]);
    case TimesketchArtifact.PREFETCH:
      return timelinePrefetch(data as Prefetch[]);
    case TimesketchArtifact.BITS:
      return timelineBits(data as Bits);
    case TimesketchArtifact.EVENTLOGS:
      return timelineEventLogs(data as EventLogRecord[]);
    case TimesketchArtifact.JUMPLISTS:
      return timelineJumplists(data as Jumplists[]);
    case TimesketchArtifact.SHORTCUTS:
      return timelineShortcuts(data as Shortcut[]);
    case TimesketchArtifact.RECYCLEBIN:
      return timelineRecycleBin(data as RecycleBin[]);
    case TimesketchArtifact.REGISTRY:
      return timelineRegistry(data as Registry[]);
    case TimesketchArtifact.SHELLBAGS:
      return timelineShellbags(data as Shellbags[]);
    case TimesketchArtifact.SERVICES:
      return timelineServices(data as Services[]);
    case TimesketchArtifact.RAWFILES:
      return timelineRawFiles(data as RawFileInfo[]);
    case TimesketchArtifact.SHIMDB:
      return timelineShimdb(data as Shimdb[]);
    case TimesketchArtifact.SRUM:
      return timelineSrum(
        data as
        | ApplicationInfo[]
        | ApplicationTimeline[]
        | AppVfu[]
        | EnergyInfo[]
        | EnergyUsage[]
        | NetworkInfo[]
        | NetworkConnectivityInfo[]
        | NotificationInfo[],
      );
    case TimesketchArtifact.SEARCH:
      return timelineSearch(data as SearchEntry[]);
    case TimesketchArtifact.TASKS:
      return timelineTasks(data as TaskData);
    case TimesketchArtifact.USERASSIST:
      return timelineUserAssist(data as UserAssist[]);
    case TimesketchArtifact.USERS_WINDOWS:
      return timelineUsersWindows(data as UserInfo[]);
    case TimesketchArtifact.USNJRNL:
      return timelineUsnJrnl(data as UsnJrnl[]);
    case TimesketchArtifact.WMIPERSIST:
      return timelineWmiPersist(data as WmiPersist[]);
    case TimesketchArtifact.LOGONS_WINDOWS:
      return timelineLogonsWindows(data as LogonsWindows[]);
    case TimesketchArtifact.JOURNALS:
    case TimesketchArtifact.SUDOLOGS_LINUX:
      return timelineJournals(data as Journal[]);
    case TimesketchArtifact.CHROMIUM_HISTORY:
    case TimesketchArtifact.CHROME_HISTORY:
    case TimesketchArtifact.EDGE_HISTORY:
      return timelineChromiumHistory(data as ChromiumHistory[], artifact);
    case TimesketchArtifact.RPM:
      return timelineRpm(data as RpmPackages[]);
    case TimesketchArtifact.VSCODE_FILEHISTORY:
      return timelineFileHistory(data as FileHistory[]);
    case TimesketchArtifact.LIBREOFFICE_RECENTFILES:
      return timelineRecentFiles(data as RecentFilesLibreOffice[]);
    case TimesketchArtifact.ABRT:
      return timelineAbrt(data as Abrt[]);
    default:
      return new TimesketchError(`ARTIFACT`, `unknown artifact ${artifact}`);
  }
}
