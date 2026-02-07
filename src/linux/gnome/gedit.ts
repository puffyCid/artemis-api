import type { RecentFiles } from "../../../types/linux/gnome/gedit";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/mod";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to extract recently open files by gedit
 * @param alt_path Optional path to `gedit-metadata.xml`
 * @returns Array of `RecentFiles` or `LinuxError`
 */
export function geditRecentFiles(
  alt_path?: string,
): RecentFiles[] | LinuxError {
  let path = "/home/*/.local/share/gedit/gedit-metadata.xml";

  if (alt_path !== undefined) {
    path = alt_path;
  }

  const glob_paths = glob(path);
  if (glob_paths instanceof FileError) {
    console.warn(`Could not glob ${path}: ${glob_paths}`);
    return new LinuxError(
      `GEDIT`,
      "could not get recent files",
    );
  }

  const files: RecentFiles[] = [];

  for (const entry of glob_paths) {
    const data = readXml(entry.full_path);
    if (data instanceof EncodingError) {
      console.warn(
        `Could not read ${entry.full_path}: ${data}`,
      );
      continue;
    }

    const meta = data[ "metadata" ] as Record<
      string,
      Record<string, Record<string, string>>[]
    >;

    const docs = meta[ "document" ];
    if (docs === undefined) {
      continue;
    }
    for (const doc of docs) {
      if (doc[ "$" ] === undefined) {
        continue;
      }
      const recent: RecentFiles = {
        path: doc[ "$" ][ "uri" ] ?? "",
        accessed: unixEpochToISO(Number(doc[ "$" ][ "atime" ])),
        gedit_source: entry.full_path,
        message: `Accessed: ${doc[ "$" ][ "uri" ] ?? ""}`,
        datetime: `${unixEpochToISO(Number(doc[ "$" ][ "atime" ])) ?? "1970-01-01T00:00:00.000Z"}`,
        timestamp_desc: "Last Accessed",
        artifact: "Gedit",
        data_type: "linux:gedit:entry"
      };
      files.push(recent);
    }
  }

  return files;
}

/**
 * Function to test GNOME gedit parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the GNOME gedit parsing
 */
export function testGeditRecentFiles(): void {
  const test = "../../test_data/linux/gnome/gedit_recent.xml";
  const result = geditRecentFiles(test);
  if (result instanceof LinuxError) {
    throw result;
  }

  if (result[ 0 ] === undefined) {
    throw `Got undefined results`;
  }

  if (result[ 0 ].path != "file:///home/devel/Downloads/analyzeMFT-3.0.7.1/src/analyzeMFT/__init__.py") {
    throw `Got path ${result[ 0 ].path} expected file:///home/devel/Downloads/analyzeMFT-3.0.7.1/src/analyzeMFT/__init__.py.......geditRecentFiles ❌`;
  }

  if (result[ 0 ].accessed != "2025-01-22T05:02:02.996Z") {
    throw `Got accessed ${result[ 0 ].accessed} expected 2025-01-22T05:02:02.996Z.......geditRecentFiles ❌`;
  }

  console.info(`  Function geditRecentFiles ✅`);

}