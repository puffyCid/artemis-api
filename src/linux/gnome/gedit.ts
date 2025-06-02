import type { RecentFiles } from "../../../types/linux/gnome/gedit";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/mod";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/mod";
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
    for (const doc of docs) {
      const recent: RecentFiles = {
        path: doc[ "$" ][ "uri" ],
        accessed: unixEpochToISO(Number(doc[ "$" ][ "atime" ])),
        gedit_source: entry.full_path,
      };
      files.push(recent);
    }
  }

  return files;
}
