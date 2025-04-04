import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { MacosError } from "../errors";
import { MunkiApplicationUsage } from "../../../types/macos/sqlite/munki";
import { unixEpochToISO } from "../../time/conversion";

/**
 * Function to extract application usage info from Munki database
 * @param db Optional path to the `application_usage.sqlite` file
 * @returns Array of `MunkiApplicationUsage` or `MacosError`
 */
export function munkiApplicationUsage(
  db = "/Library/Managed Installs/application_usage.sqlite",
): MunkiApplicationUsage[] | MacosError {
  const query = "select * from application_usage";
  const results = querySqlite(db, query);
  if (results instanceof ApplicationError) {
    return new MacosError(`MUNKI`, `failed to query ${db}: ${results}`);
  }

  const entries: MunkiApplicationUsage[] = [];
  for (const value of results) {
    const entry: MunkiApplicationUsage = {
      event: value["event"] as string,
      bundle_id: value["bundle_id"] as string,
      app_version: value["app_version"] as string,
      app_path: value["app_path"] as string,
      last_time: unixEpochToISO(value["last_time"] as number),
      number_times: value["number_times"] as number,
    };

    entries.push(entry);
  }

  return entries;
}
