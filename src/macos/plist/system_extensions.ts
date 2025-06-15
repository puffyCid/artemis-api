import { SystemExtension } from "../../../types/macos/plist/system_extensions";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Get all System Extensions on the system
 * @returns Array of `SystemExtension` or `MacosError`
 */
export function systemExtensions(
  alt_path?: string,
): SystemExtension[] | MacosError {
  let path = "/Library/SystemExtensions/db.plist";
  if (alt_path !== undefined) {
    path = alt_path;
  }
  const plist_data = getPlist(path);
  if (plist_data instanceof MacosError || plist_data instanceof Uint8Array) {
    console.warn(`failed to parse plist ${path}: ${plist_data}`);
    return new MacosError(
      "SYSTEM_EXTENSION",
      `failed to parse extensions plist ${path}: ${plist_data}`,
    );
  }

  const exts: SystemExtension[] = [];
  for (const entry in plist_data) {
    if (entry !== "extensions") {
      continue;
    }

    const ext_info = plist_data[ entry ] as Record<string, unknown>[];
    for (const ext of ext_info) {
      const bundle = ext[ "container" ] as Record<string, string>;
      const ver = ext[ "bundleVersion" ] as Record<string, string>;
      const sys_ext: SystemExtension = {
        path: ext[ "originPath" ] as string,
        uuid: ext[ "uniqueID" ] as string,
        state: ext[ "state" ] as string,
        id: ext[ "identifier" ] as string,
        version: ver[ "CFBundleVersion" ],
        categories: ext[ "categories" ] as string[],
        bundle_path: bundle[ "bundlePath" ],
        team: ext[ "teamID" ] as string,
      };
      exts.push(sys_ext);
    }
  }

  return exts;
}
