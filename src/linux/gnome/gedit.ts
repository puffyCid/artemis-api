import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import type { RawGeditRecentFiles, RecentFiles } from "../../../types/linux/gnome/gedit";
import { EncodingError } from "../../encoding/errors";
import { readXml } from "../../encoding/mod";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to extract recently open files by gedit
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to `gedit-metadata.xml`
 * @returns Array of `RecentFiles` or `LinuxError`
 */
export function geditRecentFiles(
  protocol = AccessorProtocol.Host,
  alt_path?: string,
): RecentFiles[] | LinuxError {
  let path = "/home/*/.local/share/gedit/gedit-metadata.xml";

  if (alt_path !== undefined) {
    path = alt_path;
  }

  const accessor = new Accessor();
  // Based on the `AccessorProtocol` glob for gedit files
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new LinuxError('GEDIT', `failed to glob for ${path}: ${matches}`);
  }


  const files: RecentFiles[] = [];

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

    const gedit_json = data as unknown as RawGeditRecentFiles;
    if (!Array.isArray(gedit_json.metadata.document)) {
      gedit_json.metadata.document = [ gedit_json.metadata.document ];
    }
    for (const value of gedit_json.metadata.document) {
      const recent: RecentFiles = {
        path: value[ "@uri" ],
        accessed: unixEpochToISO(Number(value[ "@atime" ])),
        evidence: entry.meta.display_path,
        message: `Accessed: ${value[ "@uri" ]}`,
        datetime: unixEpochToISO(Number(value[ "@atime" ])),
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
  const result = geditRecentFiles(AccessorProtocol.Host, test);
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