import type { AppUsage } from "../../../types/linux/gnome/usage";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/mod";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to extract GNOME Application usage
 * @param alt_path Optional path to `application_state`
 * @returns Array of `AppUsage` or `LinuxError`
 */
export function gnomeAppUsage(alt_path?: string): AppUsage[] | LinuxError {
  let path = "/home/*/.local/share/gnome-shell/application_state";

  if (alt_path !== undefined) {
    path = alt_path;
  }

  const glob_paths = glob(path);
  if (glob_paths instanceof FileError) {
    console.warn(`Could not glob ${path}: ${glob_paths}`);
    return new LinuxError(
      `GNOME_APP_USAGE`,
      "could not get application_state",
    );
  }

  const apps: AppUsage[] = [];
  for (const entry of glob_paths) {
    const data = readXml(entry.full_path);
    if (data instanceof EncodingError) {
      console.warn(
        `Could not read ${entry.full_path}: ${data}`,
      );
      continue;
    }

    const context = data[ "application-state" ] as Record<string, unknown[]>;

    const context_entries = context[ "context" ];
    if (context_entries === undefined) {
      continue;
    }

    for (const value of context_entries) {
      const applications = value as Record<
        string,
        unknown[]
      >;
      if (applications[ "application" ] === undefined) {
        continue;
      }

      for (const app_entry of applications[ "application" ]) {
        const app = app_entry as Record<
          string,
          Record<string, string>
        >;
        if (app[ "$" ] === undefined) {
          continue;
        }

        const app_usage: AppUsage = {
          id: app[ "$" ][ "id" ] ?? "",
          score: Number(app[ "$" ][ "score" ]),
          "last-seen": unixEpochToISO(Number(app[ "$" ][ "last-seen" ])),
          source: entry.full_path,
          message: app[ "$" ][ "id" ] ?? "",
          datetime: unixEpochToISO(Number(app[ "$" ][ "last-seen" ])),
          timestamp_desc: "Last Seen",
          artifact: "GNOME Application Usage",
          data_type: "linux:gnome:usage:entry"
        };

        apps.push(app_usage);
      }
    }
  }

  return apps;
}

/**
 * Function to test GNOME App usage parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the GNOME App usage parsing
 */
export function testGnomeAppUsage(): void {
  const app = "../../test_data/linux/gnome/usage.xml";
  const results = gnomeAppUsage(app);
  if (results instanceof LinuxError) {
    throw results;
  }

  if (results.length !== 23) {
    throw `Got ${results.length} entries expected 23.......gnomeAppUsage ❌`;
  }

  if (results[ 2 ]?.id !== "libreoffice-startcenter.desktop") {
    throw `Got ${results[ 2 ]?.id} entries expected "libreoffice-startcenter.desktop".......gnomeAppUsage ❌`;
  }

  if (results[ 3 ]?.[ "last-seen" ] !== "2025-09-22T01:39:36.000Z") {
    throw `Got ${results[ 3 ]?.[ "last-seen" ]} entries expected "2025-09-22T01:39:36.000Z".......gnomeAppUsage ❌`;
  }

  console.info(`  Function gnomeAppUsage ✅`);

}