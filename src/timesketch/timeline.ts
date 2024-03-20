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

import { timelineProcesses } from "./artifacts/processes.ts";
import { timelineLoginItems } from "./artifacts/macos/loginitems.ts";
import { timelineUnifiedLogs } from "./artifacts/macos/unifiedlogs.ts";
import { timelineHomebrew } from "./artifacts/macos/homebrew.ts";
import { timelineFsevents } from "./artifacts/macos/fsevents.ts";

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
    case TimesketchArtifact.UNIFIEDLOGS:
      return timelineUnifiedLogs(data as UnifiedLog[], include_raw);
    case TimesketchArtifact.HOMEBREW:
      return timelineHomebrew(data as HomebrewReceipt[], include_raw);
    case TimesketchArtifact.FSEVENTS:
      return timelineFsevents(data as Fsevents[], include_raw);
    default:
      return new TimesketchError(`ARTIFACT`, `unkonwn artifact ${artifact}`);
  }
}
