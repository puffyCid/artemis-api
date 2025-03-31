import { getPlist } from "../../../mod";
import { Applications } from "../../../types/macos/plist/apps";
import { FileError } from "../../filesystem/errors";
import { glob, readFile } from "../../filesystem/files";
import { readDir } from "../../filesystem/mod";
import { parseIcon } from "../../images/icns";
import { MacosError } from "../errors";

/**
 * Returns a very simple App listing on the system. Searches user installed Apps, System Apps, default Homebrew paths (/usr/local/Cellar, /opt/homebrew/Cellar).
 * Use `scanApps()` if you want to scan the entire filesystem for Apps
 * @returns Array of `Applications`
 */
export function listApps(): Applications[] {
  const app_paths = [
    "/Applications/*/Contents/Info.plist",
    "/System/Applications/*/Contents/Info.plist",
    "/opt/homebrew/Cellar/*/*/*.app/Contents/Info.plist",
    "/usr/local/Cellar/*/*/*.app/Contents/Info.plist",
  ];
  let all_apps: Applications[] = [];
  for (const path of app_paths) {
    const results = getApps(path);
    if (results instanceof MacosError) {
      continue;
    }

    all_apps = all_apps.concat(results);
  }
  return all_apps;
}

/**
 * Scans the entire filesystem under /System and tries to parse all Applications. Includes embedded Apps, Frameworks, and any file that ends with `%/Contents/Info.plist`
 * @returns Array of `Applications`
 */
export async function scanApps(): Promise<Applications[]> {
  const apps: Applications[] = [];
  await iterateVolumes("/System", apps);

  return apps;
}

/**
 * Walk the entire filesystem to look for Applications
 * @param path Path to read
 * @param apps Array of `Applications` to track
 */
async function iterateVolumes(path: string, apps: Applications[]) {
  const entries = await readDir(path);
  if (entries instanceof FileError) {
    return;
  }

  for (const entry of entries) {
    if (entry.full_path.endsWith("Contents/Info.plist") && entry.is_file) {
      try {
        const app = parsePlist(entry.full_path);
        if (app instanceof Error) {
          continue;
        }
        apps.push(app);
      } catch (err) {
        console.warn(`Failed to parse plist ${entry.full_path}: ${err}`);
        continue;
      }
    }

    if (entry.is_directory) {
      await iterateVolumes(entry.full_path, apps);
    }
  }
}

/**
 * Get Application information by parse `Info.plist` file
 * @param path Path to glob for applications
 * @returns Array of `Applications` or `MacosError`
 */
function getApps(path: string): Applications[] | MacosError {
  const glob_paths = glob(path);
  if (glob_paths instanceof FileError) {
    return new MacosError(`PLIST`, `Failed to glob for plists: ${glob_paths}`);
  }
  const apps: Applications[] = [];
  for (const entry of glob_paths) {
    const app = parsePlist(entry.full_path);
    if (app instanceof MacosError) {
      continue;
    }
    apps.push(app);
  }
  return apps;
}

/**
 * Parse the `Info.plist` file
 * @param path Path to `Info.plist`
 * @returns `Applications` info or error
 */
function parsePlist(path: string): Applications | MacosError {
  let data = getPlist(path);
  if (data instanceof Error || data instanceof Uint8Array) {
    console.error(`Failed to parse plist ${path}: ${data}`);
    return new MacosError(`PLIST`, `Failed to parse plist ${path}`);
  }
  data = data as Record<string, string>;

  let icon_file = "";
  if (`${data["CFBundleIconFile"]}`.includes("/")) {
    icon_file = `${data["CFBundleIconFile"]}`;
  } else if (`${data["CFBundleIconFile"]}`.includes("icns")) {
    icon_file = path.replace(
      "Info.plist",
      `Resources/${data["CFBundleIconFile"]}`,
    );
  } else {
    icon_file = path.replace(
      "Info.plist",
      `Resources/${data["CFBundleIconFile"]}.icns`,
    );
  }

  const app: Applications = {
    filename: `${data["CFBundleName"]}.app`,
    full_path: path.replace("/Contents/Info.plist", ""),
    bundle_executable: `${data["CFBundleExecutable"]}`,
    bundle_id: `${data["CFBundleIdentifier"]}`,
    bundle_name: `${data["CFBundleName"]}`,
    bundle_short_version: `${data["CFBundleShortVersionString"]}`,
    bundle_version: `${data["CFBundleVersion"]}`,
    display_name: `${data["CFBundleExecutable"]}`,
    copyright: `${data["NSHumanReadableCopyright"]}`,
    icon: readIcon(icon_file),
    info: path,
  };

  return app;
}

/**
 * Read and parse the icon file associated with the app
 * @param path Path to icns file
 * @returns Return base64 icon picture
 */
function readIcon(path: string): string {
  if (path.includes("undefined")) {
    return "";
  }
  const data = readFile(path);
  if (!(data instanceof Uint8Array)) {
    console.error(`Could not read icns file at ${path}: ${data}`);
    return "";
  }
  const icons = parseIcon(data);
  if (icons instanceof Error) {
    console.error(`Could not parse icns file at ${path}: ${data}`);
    return "";
  }

  for (const icon of icons) {
    if (icon.size == 128 || icon.size == 64) {
      return icon.image;
    }
  }
  console.warn("Could not find a good icon image to return");
  return "";
}
