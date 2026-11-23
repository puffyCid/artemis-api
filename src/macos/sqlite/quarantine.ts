import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { MacosError } from "../errors";
import { FileError } from "../../filesystem/errors";
import {
  QuarantineEvent,
  QuarantineType,
} from "../../../types/macos/sqlite/quarantine";
import { cocoatimeToIso } from "../../time/conversion";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { Accessor } from "../../filesystem/accessor";

/**
 * Function to extract macOS Quarantine Events
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to the `com.apple.LaunchServices.QuarantineEventsV2` file
 * @returns Array of `QuarantineEvent` or `MacosError`
 */
export function quarantineEvents(
  protocol = AccessorProtocol.Host,
  alt_path?: string,
): QuarantineEvent[] | MacosError {
  const path = alt_path ?? "/Users/*/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV2";
  const query = "select * from LSQuarantineEvent";

  const accessor = new Accessor();
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new MacosError(
      `QUARANTINE_EVENT`,
      `failed to glob path: ${path}: ${matches}`,
    );
  }

  const events: QuarantineEvent[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    let results;
    if (protocol === AccessorProtocol.Host) {
      results = querySqlite(path, query);
    } else {
      const client = new Sqlite(entry.handle as FileHandle);
      results = client.query(query);
    }

    if (results instanceof ApplicationError) {
      continue;
    }

    for (const value of results) {
      const row: QuarantineEvent = {
        id: value[ "LSQuarantineEventIdentifier" ] as string,
        timestamp: cocoatimeToIso(
          value[ "LSQuarantineTimeStamp" ] as number,
        ),
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
        evidence: entry.meta.display_path
      };

      events.push(row);
    }
  }

  return events;
}

/**
 * Determine the quarantine type
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
