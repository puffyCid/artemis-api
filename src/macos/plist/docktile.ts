import { Accessor, getPlist } from "../../../mod";
import { AccessorProtocol } from "../../../types/filesystem/accessor";
import { Applications } from "../../../types/macos/plist/apps";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";
import { scanApps } from "./apps";

/**
 * Scan the filesystem for Applications that have DockTile persistence
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to to start the app scan. Will search for all paths that match `Contents/Info.plist`
 * @returns Array of `Applications` that contain DockTile entries
 */
export function dockTiles(protocol = AccessorProtocol.Host, alt_path?: string): Applications[] | MacosError {
  const apps = scanApps(protocol, alt_path);
  if (apps instanceof MacosError) {
    return apps;
  }
  const dockTileApps = checkDockPersistence(apps, protocol);

  return dockTileApps;
}

/**
 * Check for DockTile persistence in Applications
 * @param apps Array of `Applications` to check for DockTile PlugIn
 * @returns Array of `Applications` that contain DockTile PlugIn
 */
function checkDockPersistence(apps: Applications[], protocol: AccessorProtocol): Applications[] {
  const dockTileApps: Applications[] = [];
  const accessor = new Accessor();
  for (const app of apps) {
    // Only want to check Info.plist in PlugIns path
    if (!app.evidence.toLowerCase().includes("plugins")) {
      continue;
    }

    const source = app.evidence.split(":", 2).at(1);
    if (source === undefined) {
      continue;
    }

    const bytes = accessor.readFile(source, protocol);
    if (bytes instanceof FileError) {
      continue;
    }

    const data = getPlist(bytes);
    if (data instanceof MacosError || data instanceof Uint8Array) {
      console.error(`Failed to parse plist ${app.evidence}: ${data}`);
      continue;
    }

    const check = JSON.stringify(data).toLowerCase();
    // Easy way to check for any DockTile Plugins
    if (!check.includes("docktileplugin") && !check.includes("docktile")) {
      continue;
    }

    dockTileApps.push(app);
  }

  return dockTileApps;
}
