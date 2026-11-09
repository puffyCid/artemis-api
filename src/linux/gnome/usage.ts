import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import type { AppUsage, RawAppUsage } from "../../../types/linux/gnome/usage";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/mod";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to extract GNOME Application usage
 * @param alt_path Optional path to `application_state`
 * @returns Array of `AppUsage` or `LinuxError`
 */
export function gnomeAppUsage(protocol = AccessorProtocol.Host, alt_path?: string): AppUsage[] | LinuxError {
  let path = "/home/*/.local/share/gnome-shell/application_state";

  if (alt_path !== undefined) {
    path = alt_path;
  }

  const accessor = new Accessor();
  // Based on the `AccessorProtocol` glob for application_state files
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new LinuxError('GNOME_APP_USAGE', `failed to glob for ${path}: ${matches}`);
  }


  const apps: AppUsage[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const data = readXml(entry.handle as FileHandle);
    if (data instanceof EncodingError) {
      console.warn(
        `Could not read ${entry.meta.display_path}: ${data}`,
      );
      continue;
    }

    const usage_json = data as unknown as RawAppUsage;
    if (!Array.isArray(usage_json[ "application-state" ].context.application)) {
      usage_json[ "application-state" ].context.application = [ usage_json[ "application-state" ].context.application ];
    }

    for (const value of usage_json[ "application-state" ].context.application) {
      const app_usage: AppUsage = {
        id: value[ "@id" ],
        score: Number(value[ "@score" ]),
        "last-seen": unixEpochToISO(Number(value[ "@last-seen" ])),
        evidence: entry.meta.display_path,
        message: value[ "@id" ],
        datetime: unixEpochToISO(Number(value[ "@last-seen" ])),
        timestamp_desc: "Last Seen",
        artifact: "GNOME Application Usage",
        data_type: "linux:gnome:usage:entry"
      };

      apps.push(app_usage);
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
  const results = gnomeAppUsage(AccessorProtocol.Host, app);
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