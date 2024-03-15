import { getPlist } from "../../../mod.ts";
import { MacosError } from "../errors.ts";
import { scanApps } from "./apps.ts";

/**
 * Scan the filesystem for Applications that have DockTile persistence
 * @returns Array of `Applications` that contain DockTile entries
 */
export async function dockTiles(): Promise<Applications[]> {
  const apps = await scanApps();
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

    // Easy way to check for any DockTile Plugins
    if (!JSON.stringify(data).toLowerCase().includes("docktileplugin")) {
      continue;
    }

    dockTileApps.push(app);
  }

  return dockTileApps;
}
