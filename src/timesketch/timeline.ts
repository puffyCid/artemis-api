import {
  TimesketchArtifact,
  TimesketchTimeline,
} from "../../types/timesketch/timeline.ts";
import { TimesketchError } from "./error.ts";
import { ProcessInfo } from "../../types/system/processes.ts";
import { LoginItems } from "../../types/macos/loginitems.ts";
import { UnifiedLog } from "../../types/macos/unifiedlogs.ts";
import { HomebrewReceipt } from "../../types/macos/homebrew.ts";
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

/**
 * Function to timeline artifacts parsed by artemis
 * @param data Artifact data to timeline. Must be a supported artifact defined by `TimesketchArtifact`
 * @param artifact A `TimesketchArtifact` artifact to timeline
 * @param include_raw Boolean value to indicate if the raw artifact should be included in timeline. Defaults to true
 * @returns Array of `TimesketchTimeline` or `TimesketchError`
 */
export function timelineArtifact(
  data: unknown,
  artifact: TimesketchArtifact,
  include_raw = true,
): TimesketchTimeline[] | TimesketchError {
  switch (artifact) {
    case TimesketchArtifact.PROCESSESS:
      return timelineProcesses(data as ProcessInfo[], include_raw);
    case TimesketchArtifact.LOGINITEMS:
      return timelineLoginItems(data as LoginItems[], include_raw);
    case TimesketchArtifact.SUDOLOGS_MACOS:
    case TimesketchArtifact.UNIFIEDLOGS:
      return timelineUnifiedLogs(data as UnifiedLog[], include_raw);
    case TimesketchArtifact.HOMEBREW:
      return timelineHomebrew(data as HomebrewReceipt[], include_raw);
    case TimesketchArtifact.FSEVENTS:
      return timelineFsevents(data as Fsevents[], include_raw);
    case TimesketchArtifact.USERS_MACOS:
      return timelineUsersMacos(data as Users[], include_raw);
    case TimesketchArtifact.GROUPS_MACOS:
      return timelineGroupsMacos(data as Groups[], include_raw);
    case TimesketchArtifact.EXECPOLICY:
      return timelineExecpolicy(data as ExecPolicy[], include_raw);
    case TimesketchArtifact.FILES:
      return timelineFiles(
        data as MacosFileInfo[] | LinuxFileInfo[] | WindowsFileInfo[],
        include_raw,
      );
    case TimesketchArtifact.EMOND:
      return timelineEmond(data as Emond[], include_raw);
    case TimesketchArtifact.SPOTLIGHT:
      return timelineSpotlight(data as Spotlight[], include_raw);
    case TimesketchArtifact.LAUNCHD:
      return timelineLaunchd(data as Launchd[], include_raw);
    case TimesketchArtifact.SAFARI_DOWNLOADS:
      return timelineSafariDownloads(data as SafariDownloads[], include_raw);
    case TimesketchArtifact.SAFARI_HISTORY:
      return timelineSafariHistory(data as SafariHistory[], include_raw);
    case TimesketchArtifact.AMCACHE:
      return timelineAmcache(data as Amcache[], include_raw);
    case TimesketchArtifact.SHIMCACHE:
      return timelineShimcache(data as Shimcache[], include_raw);
    case TimesketchArtifact.PREFETCH:
      return timelinePrefetch(data as Prefetch[], include_raw);
    default:
      return new TimesketchError(`ARTIFACT`, `unkonwn artifact ${artifact}`);
  }
}
