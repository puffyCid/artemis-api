import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { MacosError } from "../errors";
import { glob } from "../../filesystem/files";
import { FileError } from "../../filesystem/errors";
import { MacosQuarantine } from "../../../types/macos/sqlite/quarantine";
import {
  QuarantineEvent,
  QuarantineType,
} from "../../../types/macos/sqlite/quarantine";
import { cocoatimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";

/**
 * Function to extract macOS Quarantine Events
 * @param db Optional path to the `com.apple.LaunchServices.QuarantineEventsV2` file
 * @returns Array of `MacosQuarantine` or `MacosError`
 */
export function quarantineEvents(
  alt_file?: string,
): MacosQuarantine[] | MacosError {
  let paths: string[] = [];

  if (alt_file !== undefined) {
    paths = [ alt_file ];
  } else {
    const glob_path =
      "/Users/*/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV2";
    const paths_results = glob(glob_path);
    if (paths_results instanceof FileError) {
      return new MacosError(
        `QUARANTINE_EVENT`,
        `failed to glob path: ${glob_path}: ${paths_results}`,
      );
    }

    for (const entry of paths_results) {
      paths.push(entry.full_path);
    }
  }
  const query = "select * from LSQuarantineEvent";
  const events: MacosQuarantine[] = [];

  for (const path of paths) {
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
      return new MacosError(
        `QUARANTINE_EVENT`,
        `failed to query ${path}: ${results}`,
      );
    }

    const entries: QuarantineEvent[] = [];
    for (const value of results) {
      const entry: QuarantineEvent = {
        id: value[ "LSQuarantineEventIdentifier" ] as string,
        timestamp: unixEpochToISO(cocoatimeToUnixEpoch(
          value[ "LSQuarantineTimeStamp" ] as number,
        )),
        agent_name: value[ "LSQuarantineAgentName" ] as string,
        type: quarantineType(value[ "LSQuarantineTypeNumber" ] as number),
        bundle_id:
          typeof value[ "LSQuarantineAgentBundleIdentifier" ] === "undefined" ||
            value[ "LSQuarantineAgentBundleIdentifier" ] === null
            ? ""
            : value[ "LSQuarantineAgentBundleIdentifier" ] as string,
        url_string: typeof value[ "LSQuarantineDataURLString" ] === "undefined" ||
          value[ "LSQuarantineDataURLString" ] === null
          ? ""
          : value[ "LSQuarantineDataURLString" ] as string,
        sender_address:
          typeof value[ "LSQuarantineSenderAddress" ] === "undefined" ||
            value[ "LSQuarantineSenderAddress" ] === null
            ? ""
            : value[ "LSQuarantineSenderAddress" ] as string,
        sender_name: typeof value[ "LSQuarantineSenderName" ] === "undefined" ||
          value[ "LSQuarantineSenderName" ] === null
          ? ""
          : value[ "LSQuarantineSenderName" ] as string,
        origin_alias: typeof value[ "LSQuarantineOriginAlias" ] === "undefined" ||
          value[ "LSQuarantineOriginAlias" ] === null
          ? ""
          : value[ "LSQuarantineOriginAlias" ] as string,
        origin_title: typeof value[ "LSQuarantineOriginTitle" ] === "undefined" ||
          value[ "LSQuarantineOriginTitle" ] === null
          ? ""
          : value[ "LSQuarantineOriginTitle" ] as string,
        origin_url:
          typeof value[ "LSQuarantineOriginURLString" ] === "undefined" ||
            value[ "LSQuarantineOriginURLString" ] === null
            ? ""
            : value[ "LSQuarantineOriginURLString" ] as string,
      };

      entries.push(entry);
    }

    const event: MacosQuarantine = {
      path,
      events: entries,
    };

    events.push(event);
  }

  return events;
}

/**
 * Determin the quarantine type
 * @param data Quarantine Type event number
 * @returns `QuarantineType` enum
 */
function quarantineType(data: number): QuarantineType {
  switch (data) {
    case 0:
      return QuarantineType.WEBDOWNLOAD;
    case 1:
      return QuarantineType.DOWNLOAD;
    case 2:
      return QuarantineType.EMAILATTACHMENT;
    case 3:
      return QuarantineType.MESSAGEATTACHMENT;
    case 4:
      return QuarantineType.CALENDARATTACHMENT;
    case 5:
      return QuarantineType.ATTACHMENT;
    default:
      return QuarantineType.UNKNOWN;
  }
}
