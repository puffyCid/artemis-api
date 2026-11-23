import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { MacosError } from "../errors";
import { MunkiApplicationUsage } from "../../../types/macos/sqlite/munki";
import { unixEpochToISO } from "../../time/conversion";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";

/**
 * Function to extract application usage info from Munki database
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to the `application_usage.sqlite` file
 * @returns Array of `MunkiApplicationUsage` or `MacosError`
 */
export function munkiApplicationUsage(
  protocol = AccessorProtocol.Host,
  alt_path?: string,
): MunkiApplicationUsage[] | MacosError {
  const path = alt_path ?? "/Library/Managed Installs/application_usage.sqlite";
  const query = "select * from application_usage";

  const accessor = new Accessor();
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new MacosError(`MUNKI`, `failed to glob for '${path}': ${matches}`);
  }
  const entries: MunkiApplicationUsage[] = [];
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
      const row: MunkiApplicationUsage = {
        event: value[ "event" ] as string,
        bundle_id: value[ "bundle_id" ] as string,
        app_version: value[ "app_version" ] as string,
        app_path: value[ "app_path" ] as string,
        last_time: unixEpochToISO(value[ "last_time" ] as number),
        number_times: value[ "number_times" ] as number,
        evidence: entry.meta.display_path,
      };

      entries.push(row);
    }
  }

  return entries;
}
