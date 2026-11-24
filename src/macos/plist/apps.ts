import { Accessor, getPlist } from "../../../mod";
import { Applications } from "../../../types/macos/plist/apps";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";
import { AccessorProtocol, DirHandle, EntryKind, FileHandle, GlobMatch } from "../../../types/filesystem/accessor";

/**
 * Returns a very simple App listing on the system. Searches user installed Apps, System Apps, default Homebrew paths (/usr/local/Cellar, /opt/homebrew/Cellar).  
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * Use `scanApps()` if you want to scan the entire filesystem for Apps
 * @param alt_path Optional path to App `Info.plist` file
 * @returns Array of `Applications`
 */
export function listApps(protocol = AccessorProtocol.Host, alt_path?: string): Applications[] {
  const app_paths = alt_path ? [alt_path] : [
    "/Applications/*/Contents/Info.plist",
    "/System/Applications/*/Contents/Info.plist",
    "/opt/homebrew/Cellar/*/*/*.app/Contents/Info.plist",
    "/usr/local/Cellar/*/*/*.app/Contents/Info.plist",
  ];

  const accessor = new Accessor();

  let all_apps: Applications[] = [];
  for (const path of app_paths) {
    const results = getApps(path, accessor, protocol);
    if (results instanceof MacosError) {
      continue;
    }

    all_apps = all_apps.concat(results);
  }
  return all_apps;
}

/**
 * Scans the entire filesystem under /System and tries to parse all Applications. Includes embedded Apps, Frameworks, and any file that ends with `%/Contents/Info.plist`
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to to start the app scan. Will search for all paths that match `Contents/Info.plist`
 * @returns Array of `Applications`
 */
export function scanApps(protocol = AccessorProtocol.Host, alt_path?: string): Applications[] | MacosError {
  const apps: Applications[] = [];
  const accessor = new Accessor();
  const start = alt_path ?? "/System";

  const results = accessor.readDir(start, protocol);
  if (results instanceof FileError) {
    return new MacosError(`PLIST`, `failed to start app scan at '${start}': ${results}`);
  }

  for (const entry of results) {
    if (entry.meta.kind === EntryKind.File && entry.meta.full_path.endsWith("Contents/Info.plist")) {
      const app = parsePlist(entry, accessor);
      if (app instanceof MacosError) {
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
 * Walk the entire filesystem to look for Applications
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
    if (entry.meta.kind === EntryKind.File && entry.meta.full_path.endsWith("Contents/Info.plist")) {
      const app = parsePlist(entry, accessor);
      if (app instanceof MacosError) {
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
 * Get Application information by parse `Info.plist` file
 * @param path Path to glob for applications
 * @param accessor `Accessor` instance to use
 * @param protocol `AccessorProtocol` to use
 * @returns Array of `Applications` or `MacosError`
 */
function getApps(path: string, accessor: Accessor, protocol: AccessorProtocol): Applications[] | MacosError {
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new MacosError(`PLIST`, `Failed to glob for ${path}: ${matches}`);
  }
  const apps: Applications[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const app = parsePlist(entry, accessor);
    if (app instanceof MacosError) {
      continue;
    }
    apps.push(app);
  }
  return apps;
}

/**
 * Parse the `Info.plist` file
 * @param entry `GlobMatch` object to `Info.plist`
 * @param accessor `Accessor` instance to use
 * @returns `Applications` info or error
 */
function parsePlist(entry: GlobMatch, accessor: Accessor): Applications | MacosError {
  const bytes = accessor.readFileHandle(entry.handle as FileHandle);
  if (bytes instanceof FileError) {
    return new MacosError(`PLIST`, `failed to read '${entry.meta.display_path}': ${bytes}`);
  }
  let data = getPlist(bytes);
  if (data instanceof Error || data instanceof Uint8Array) {
    return new MacosError(`PLIST`, `Failed to parse plist '${entry.meta.display_path}': ${data}`);
  }
  data = data as Record<string, string>;

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
