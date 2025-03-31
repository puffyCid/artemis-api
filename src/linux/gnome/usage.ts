import type { AppUsage } from "../../../types/linux/gnome/usage";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/mod";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/mod";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to extract GNOME Application usage
 * @param alt_path Optional path to `application_state`
 * @returns Array of `AppUsage` or `LinuxError`
 */
export function gnomeAppUsage(alt_path?: string): AppUsage[] | LinuxError {
  let path = "/home/*/.local/share/gnome-shell/application_state";

  if (alt_path != undefined) {
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
    for (const value of context_entries) {
      const applications = value as Record<
        string,
        unknown[]
      >;

      for (const app_entry of applications[ "application" ]) {
        const app = app_entry as Record<
          string,
          Record<string, string>
        >;

        const app_usage: AppUsage = {
          id: app[ "$" ][ "id" ],
          score: Number(app[ "$" ][ "score" ]),
          "last-seen": unixEpochToISO(Number(app[ "$" ][ "last-seen" ])),
          source: entry.full_path,
        };

        apps.push(app_usage);
      }
    }
  }

  return apps;
}
