import {
  TimesketchArtifact,
  TimesketchTimeline,
} from "../../types/timesketch/timeline.ts";
import { TimesketchError } from "./error.ts";
import { ProcessInfo } from "../../types/system/processes.ts";
import { LoginItems } from "../../types/macos/loginitems.ts";
import { UnifiedLog } from "../../types/macos/unifiedlogs.ts";
import { HomebrewData } from "../../types/macos/homebrew.ts";
import { Fsevents } from "../../types/macos/fsevents.ts";
import { Groups, Users } from "../../types/macos/accounts.ts";
import { ExecPolicy } from "../../types/macos/execpolicy.ts";
import { MacosFileInfo } from "../../types/macos/files.ts";
import { WindowsFileInfo } from "../../types/windows/files.ts";
import { LinuxFileInfo } from "../../types/linux/files.ts";
import { SafariDownloads, SafariHistory } from "../../types/macos/safari.ts";
import { Launchd } from "../../types/macos/launchd.ts";
import { Emond } from "../../types/macos/emond.ts";
import { Spotlight } from "../../types/macos/spotlight.ts";
import { Prefetch } from "../../types/windows/prefetch.ts";
import { Amcache } from "../../types/windows/amcache.ts";
import { Shimcache } from "../../types/windows/shimcache.ts";
import { Bits } from "../../types/windows/bits.ts";
import { EventLogRecord } from "../../types/windows/eventlogs.ts";
import { Jumplists } from "../../types/windows/jumplists.ts";
import { Shortcut } from "../../types/windows/shortcuts.ts";
import { RecycleBin } from "../../types/windows/recyclebin.ts";
import { Registry } from "../../types/windows/registry.ts";
import { Services } from "../../types/windows/services.ts";
import { Shellbags } from "../../types/windows/shellbags.ts";
import { RawFileInfo } from "../../types/windows/ntfs.ts";
import { Shimdb } from "../../types/windows/shimdb.ts";
import {
  ApplicationInfo,
  ApplicationTimeline,
  AppVfu,
  EnergyInfo,
  EnergyUsage,
  NetworkConnectivityInfo,
  NetworkInfo,
  NotificationInfo,
} from "../../types/windows/srum.ts";
import { SearchEntry } from "../../types/windows/search.ts";
import { TaskData } from "../../types/windows/tasks.ts";
import { UserAssist } from "../../types/windows/userassist.ts";
import { UserInfo } from "../../types/windows/users.ts";
import { UsnJrnl } from "../../types/windows/usnjrnl.ts";
import { WmiPersist } from "../../types/windows/wmi.ts";
import { LogonsWindows } from "../../types/windows/eventlogs/logons.ts";
import { Journal } from "../../types/linux/journal.ts";
import { ChromiumHistory } from "../../types/applications/chromium.ts";

/**
 * macOS artifact timelines
 */
import { timelineLoginItems } from "./artifacts/macos/loginitems.ts";
import { timelineUnifiedLogs } from "./artifacts/macos/unifiedlogs.ts";
import { timelineHomebrew } from "./artifacts/macos/homebrew.ts";
import { timelineFsevents } from "./artifacts/macos/fsevents.ts";
import { timelineUsersMacos } from "./artifacts/macos/users.ts";
import { timelineGroupsMacos } from "./artifacts/macos/groups.ts";
import { timelineExecpolicy } from "./artifacts/macos/execpolicy.ts";
import {
  timelineSafariDownloads,
  timelineSafariHistory,
} from "./artifacts/macos/safari.ts";
import { timelineLaunchd } from "./artifacts/macos/launchd.ts";
import { timelineSpotlight } from "./artifacts/macos/spotlight.ts";
import { timelineEmond } from "./artifacts/macos/emond.ts";

/**
 * Linux artifact timelines
 */
import { timelineJournals } from "./artifacts/linux/journals.ts";
import type { RpmPackages } from "../../types/linux/rpm.ts";

/**
 * Application artifact timelines
 */
import { timelineChromiumHistory } from "./artifacts/applications/chromium/history.ts";

/**
 * Cross platform artifact timelines
 */
import { timelineProcesses } from "./artifacts/processes.ts";
import { timelineFiles } from "./artifacts/files.ts";

/**
 * Windows artifact timelines
 */
import { timelineAmcache } from "./artifacts/windows/amcache.ts";
import { timelineShimcache } from "./artifacts/windows/shimcache.ts";
import { timelinePrefetch } from "./artifacts/windows/prefetch.ts";
import { timelineBits } from "./artifacts/windows/bits.ts";
import { timelineEventLogs } from "./artifacts/windows/eventlogs.ts";
import { timelineJumplists } from "./artifacts/windows/jumplists.ts";
import { timelineShortcuts } from "./artifacts/windows/shortcuts.ts";
import { timelineRecycleBin } from "./artifacts/windows/recyclebin.ts";
import { timelineRegistry } from "./artifacts/windows/registry.ts";
import { timelineShellbags } from "./artifacts/windows/shellbags.ts";
import { timelineServices } from "./artifacts/windows/services.ts";
import { timelineRawFiles } from "./artifacts/windows/ntfs.ts";
import { timelineShimdb } from "./artifacts/windows/shimdb.ts";
import { timelineSearch } from "./artifacts/windows/search.ts";
import { timelineSrum } from "./artifacts/windows/srum.ts";
import { timelineTasks } from "./artifacts/windows/tasks.ts";
import { timelineUserAssist } from "./artifacts/windows/userassist.ts";
import { timelineUsersWindows } from "./artifacts/windows/users.ts";
import { timelineUsnJrnl } from "./artifacts/windows/usnjrnl.ts";
import { timelineWmiPersist } from "./artifacts/windows/wmi.ts";
import { timelineLogonsWindows } from "./artifacts/windows/eventlogs/logons.ts";
import { timelineGatekeeper } from "./artifacts/macos/sqlite/gatekeeper.ts";
import { GatekeeperEntries } from "../../types/macos/sqlite/gatekeeper.ts";
import { timelineRpm } from "./artifacts/linux/rpm.ts";

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
    default:
      return new TimesketchError(`ARTIFACT`, `unknown artifact ${artifact}`);
  }
}
