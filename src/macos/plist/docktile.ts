import { getPlist } from "../../../mod";
import { Applications } from "../../../types/macos/plist/apps";
import { MacosError } from "../errors";
import { scanApps } from "./apps";

/**
 * Scan the filesystem for Applications that have DockTile persistence
 * @returns Array of `Applications` that contain DockTile entries
 */
export async function dockTiles(): Promise<Applications[]> {
  const skip_icons = true;
  const apps = await scanApps(skip_icons);
  const dockTileApps = checkDockPersistence(apps);

  return dockTileApps;
}

/**
 * Check for DockTile persistence in Applications
 * @param apps Array of `Applications` to check for DockTile PlugIn
 * @returns Array of `Applications` that contain DockTile PlugIn
 */
function checkDockPersistence(apps: Applications[]): Applications[] {
  const dockTileApps: Applications[] = [];
  for (const app of apps) {
    // Only want to check Info.plist in PlugIns path
    if (!app.info.toLowerCase().includes("plugins")) {
      continue;
    }

    const data = getPlist(app.info);
    if (data instanceof MacosError || data instanceof Uint8Array) {
      console.error(`Failed to parse plist ${app.info}: ${data}`);
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
