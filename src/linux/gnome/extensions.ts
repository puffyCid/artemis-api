import {
  type Extension,
  ExtensionType,
} from "../../../types/linux/gnome/extensions";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { readTextFile, stat } from "../../filesystem/files";
import { LinuxError } from "../errors";

/**
 * Function to get installed GNOME extensions. Will parse user and system installed extensions by default
 * @param alt_path Optional path to a GNOME extension
 * @returns Array of `Extension` or `LinuxError`
 */
export function getGnomeExtensions(
  alt_path?: string,
): Extension[] | LinuxError {
  let paths = [
    "/home/*/.local/share/gnome-shell/extensions/*/metadata.json",
    "/usr/share/gnome-shell/extensions/*/metadata.json",
  ];

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }

  const extensions: Extension[] = [];
  for (const entry of paths) {
    const glob_paths = glob(entry);
    if (glob_paths instanceof FileError) {
      console.warn(`Could not glob ${entry}: ${glob_paths}`);
      continue;
    }

    for (const extension of glob_paths) {
      const data = readTextFile(extension.full_path);
      if (data instanceof FileError) {
        console.warn(
          `Could not read ${extension.full_path}: ${data}`,
        );
        continue;
      }

      const ext_data: Extension = JSON.parse(data);
      ext_data.extension_path = extension.full_path;

      const meta = stat(ext_data.extension_path);
      if (!(meta instanceof FileError)) {
        ext_data.created = meta.created;
        ext_data.accessed = meta.accessed;
        ext_data.modified = meta.modified;
        ext_data.changed = meta.changed;
      }

      if (extension.full_path.includes("home")) {
        ext_data.extension_type = ExtensionType.User;
      } else if (extension.full_path.includes("/usr/")) {
        ext_data.extension_type = ExtensionType.System;
      } else {
        ext_data.extension_type = ExtensionType.Unknown;
      }
      extensions.push(ext_data);
    }
  }

  return extensions;
}

/**
 * Function to test GNOME extension parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the GNOME extension parsing
 */
export function testGetGnomeExtensions(): void {
  const test = "../../test_data/linux/gnome/metadata.json";
  const result = getGnomeExtensions(test);
  if (result instanceof LinuxError) {
    throw result;
  }

  if (result[ 0 ] === undefined) {
    throw `Got extension name undefined expected GSConnect.......getGnomeExtensions ❌`;
  }

  if (result[ 0 ].name != "GSConnect") {
    throw `Got extension name ${result[ 0 ].name} expected GSConnect.......getGnomeExtensions ❌`;
  }

  console.info(`  Function getGnomeExtensions ✅`);

}