import { Accessor, getPlist } from "../../../mod";
import { AccessorProtocol, DirHandle, EntryKind, FileHandle, GlobMatch } from "../../../types/filesystem/accessor";
import { Applications } from "../../../types/macos/plist/apps";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";

/**
 * Scan the filesystem for Applications that have DockTile persistence
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to to start the app scan. Will search for all paths that match `Contents/Info.plist`
 * @returns Array of `Applications` that contain DockTile entries
 */
export function dockTiles(protocol = AccessorProtocol.Host, alt_path?: string): Applications[] | MacosError {
  const apps: Applications[] = [];
  const accessor = new Accessor();
  const start = alt_path ?? "/System";

  const results = accessor.readDir(start, protocol);
  if (results instanceof FileError) {
    return new MacosError(`PLIST`, `failed to start app scan at '${start}': ${results}`);
  }

  for (const entry of results) {
    if (entry.meta.kind === EntryKind.File) {
      const app = parsePlist(entry, accessor);
      if (app instanceof MacosError || app === undefined) {
        continue;
      }
      apps.push(app);
      continue;
    }


    if (entry.meta.kind !== EntryKind.Directory) {
      continue;
    }

    iterateVolumes(entry.handle as DirHandle, accessor, apps);
  }

  return apps;
}

/**
 * Walk the entire filesystem to look for Applications with DockTile plugin
 * @param handle `DirHandle` object to read
 * @param accessor `Accessor` instance to use
 * @param apps Array of `Applications` to track
 */
function iterateVolumes(handle: DirHandle, accessor: Accessor, apps: Applications[]): void {
  const results = accessor.readDirHandle(handle);
  if (results instanceof FileError) {
    console.error(`Failed to read location '${JSON.stringify(handle)}': ${results}`)
    return;
  }

  for (const entry of results) {
    if (entry.meta.kind === EntryKind.File) {
      const app = parsePlist(entry, accessor);
      if (app instanceof MacosError || app === undefined) {
        continue;
      }
      apps.push(app);
      continue;
    }


    if (entry.meta.kind !== EntryKind.Directory) {
      continue;
    }

    iterateVolumes(entry.handle as DirHandle, accessor, apps);
  }
}

/**
 * Parse the `Info.plist` file
 * @param entry `GlobMatch` object to `Info.plist`
 * @param accessor `Accessor` instance to use
 * @returns `Applications` info or error
 */
function parsePlist(entry: GlobMatch, accessor: Accessor): Applications | MacosError | undefined {
  if (entry.meta.kind !== EntryKind.File || !entry.meta.full_path.endsWith("Contents/Info.plist") || !entry.meta.full_path.toLowerCase().includes("plugins")) {
    return undefined;
  }
  const bytes = accessor.readFileHandle(entry.handle as FileHandle);
  if (bytes instanceof FileError) {
    return new MacosError(`PLIST`, `failed to read '${entry.meta.display_path}': ${bytes}`);
  }
  let data = getPlist(bytes);
  if (data instanceof Error || data instanceof Uint8Array) {
    return new MacosError(`PLIST`, `Failed to parse plist '${entry.meta.display_path}': ${data}`);
  }
  data = data as Record<string, string>;
  const check = JSON.stringify(data).toLowerCase();
  // Easy way to check for any DockTile Plugins
  if (!check.includes("docktileplugin") && !check.includes("docktile")) {
    return undefined;
  }

  const app: Applications = {
    filename: `${data["CFBundleName"]}`,
    full_path: entry.meta.full_path.replace("/Contents/Info.plist", ""),
    bundle_executable: `${data["CFBundleExecutable"]}`,
    bundle_id: `${data["CFBundleIdentifier"]}`,
    bundle_name: `${data["CFBundleName"]}`,
    bundle_short_version: `${data["CFBundleShortVersionString"]}`,
    bundle_version: `${data["CFBundleVersion"]}`,
    display_name: `${data["CFBundleExecutable"]}`,
    copyright: `${data["NSHumanReadableCopyright"]}`,
    evidence: entry.meta.display_path,
  };

  return app;
}