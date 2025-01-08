import { SnapState } from "../../types/linux/snap.ts";
import { FileError } from "../filesystem/errors.ts";
import { glob, readTextFile } from "../filesystem/mod.ts";
import { LinuxError } from "./errors.ts";

/**
 * Function to return a list of installed Snaps
 * @returns Object containing list of installed Snaps
 */
export function listSnaps(): Record<string, SnapState> | LinuxError {
  const state = readTextFile("/var/lib/snapd/state.json");
  if (state instanceof FileError) {
    return new LinuxError("SNAP", `Failed to read state.json: ${state}`);
  }

  const state_data = JSON.parse(state);
  const snaps: Record<string, SnapState> = state_data["data"]["snaps"];

  const glob_paths = glob("/snap/*/*/meta/snap.yaml");
  if (glob_paths instanceof FileError) {
    console.error("SNAP", `Failed to glob snap paths: ${glob_paths}`);
    return snaps;
  }

  for (const entry of glob_paths) {
    const meta = readTextFile(entry.full_path);
    if (meta instanceof FileError) {
      continue;
    }

    const regex = /version: .*/;
    const matches = regex.exec(meta);
    if (matches === null) {
      continue;
    }

    const version = matches[0];
    for (const value in snaps) {
      for (let i = 0; i < snaps[value].sequence.length; i++) {
        const name = snaps[value].sequence[i].name;
        const revision = snaps[value].sequence[i].revision;
        if (
          entry.full_path.includes(name) &&
          entry.full_path.includes(`${revision}`)
        ) {
          snaps[value].sequence[i].version =
            version.split("version: ").at(1)?.replaceAll("'", "") ?? "";
          snaps[value]["last-refresh-time"] = new Date(
            snaps[value]["last-refresh-time"],
          ).toISOString();
        }
      }
    }
  }

  return snaps;
}
