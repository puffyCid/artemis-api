import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { SystemExtension } from "../../../types/macos/plist/system_extensions";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Get all System Extensions on the system
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to `db.plist`
 * @returns Array of `SystemExtension` or `MacosError`
 */
export function systemExtensions(
  protocol = AccessorProtocol.Host,
  alt_path?: string,
): SystemExtension[] | MacosError {
  const path = alt_path ?? "/Library/SystemExtensions/db.plist";
  const accessor = new Accessor();

  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new MacosError(`SYSTEM_EXTENSION`, `failed to glob for ${path}: ${matches}`);
  }

  const exts: SystemExtension[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const bytes = accessor.readFileHandle(entry.handle as FileHandle);
    if (bytes instanceof FileError) {
      console.warn(`Failed to read ${entry.meta.display_path}: ${bytes}`);
      continue;
    }

    const plist_data = getPlist(bytes);
    if (plist_data instanceof MacosError) {
      console.warn(`Failed to parse ${entry.meta.display_path}: ${plist_data}`);
      continue;
    }

    for (const value in plist_data) {
      if (value !== "extensions" || Array.isArray(plist_data)) {
        continue;
      }

      const ext_info = plist_data[value] as Record<string, unknown>[];
      for (const ext of ext_info) {
        const bundle = ext["container"] as Record<string, string>;
        const ver = ext["bundleVersion"] as Record<string, string>;
        const sys_ext: SystemExtension = {
          path: ext["originPath"] as string,
          uuid: ext["uniqueID"] as string,
          state: ext["state"] as string,
          id: ext["identifier"] as string,
          version: ver["CFBundleVersion"] ?? "",
          categories: ext["categories"] as string[],
          bundle_path: bundle["bundlePath"] ?? "",
          team: ext["teamID"] as string,
          evidence: entry.meta.display_path,
        };

        exts.push(sys_ext);
      }
    }
  }

  return exts;
}
