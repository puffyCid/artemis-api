import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import {
  type Extension,
  ExtensionType,
} from "../../../types/linux/gnome/extensions";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { readTextFile, stat } from "../../filesystem/files";
import { LinuxError } from "../errors";

/**
 * Function to get installed GNOME extensions. Will parse user and system installed extensions by default
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to a GNOME extension
 * @returns Array of `Extension` or `LinuxError`
 */
export function getGnomeExtensions(
  protocol = AccessorProtocol.Host,
  alt_path?: string,
): Extension[] | LinuxError {
  let paths = [
    "/home/*/.local/share/gnome-shell/extensions/*/metadata.json",
    "/usr/share/gnome-shell/extensions/*/metadata.json",
  ];

  if (alt_path !== undefined) {
    paths = [ alt_path ];
  }

  const accessor = new Accessor();

  const extensions: Extension[] = [];
  for (const entry of paths) {
    // Based on the `AccessorProtocol` glob for gedit files
    const matches = accessor.globfs(entry, protocol);
    if (matches instanceof FileError) {
      console.warn(`Could not glob ${entry}: ${matches}`);
      continue;
    }

    for (const extension of matches) {
      if (extension.meta.kind !== EntryKind.File) {
        continue;
      }

      const data = readTextFile(extension.handle as FileHandle);
      if (data instanceof FileError) {
        console.warn(
          `Could not read ${extension.meta.display_path}: ${data}`,
        );
        continue;
      }

      const ext_data: Extension = JSON.parse(data);
      ext_data.evidence = extension.meta.display_path;

      const meta = stat(ext_data.evidence);
      if (!(meta instanceof FileError)) {
        ext_data.created = meta.created;
        ext_data.accessed = meta.accessed;
        ext_data.modified = meta.modified;
        ext_data.changed = meta.changed;
      }

      if (extension.meta.directory.includes("home")) {
        ext_data.extension_type = ExtensionType.User;
      } else if (extension.meta.directory.includes("/usr/")) {
        ext_data.extension_type = ExtensionType.System;
      } else {
        ext_data.extension_type = ExtensionType.Unknown;
      }
      ext_data.message = ext_data.name;
      ext_data.datetime = ext_data.created;
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
  const result = getGnomeExtensions(AccessorProtocol.Host, test);
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