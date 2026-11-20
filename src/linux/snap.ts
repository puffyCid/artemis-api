import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { SnapState } from "../../types/linux/snap";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/files";
import { LinuxError } from "./errors";

/**
 * Function to return a list of installed Snaps
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_state Optional path to `/var/lib/snapd/state.json`
 * @param alt_snaps Optional path to `snap.yaml`
 * @returns Object containing list of installed Snaps
 */
export function listSnaps(protocol = AccessorProtocol.Host, alt_state?: string, alt_snaps?: string): Record<string, SnapState> | LinuxError {
  let path = "/var/lib/snapd/state.json";

  if (alt_state !== undefined) {
    path = alt_state;
  }

  const accessor = new Accessor();
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new LinuxError(`SNAP`, `failed to glob for snap state '${path}': ${matches}`);
  }

  let state_data: unknown | undefined = undefined;
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const state = readTextFile(entry.handle as FileHandle);
    if (state instanceof FileError) {
      return new LinuxError("SNAP", `Failed to read state handle '${JSON.stringify(entry.handle)}': ${state}`);
    }

    state_data = JSON.parse(state);
  }

  if (state_data === undefined) {
    return new LinuxError(`SNAP`, `missing snap state '${path}': ${state_data}`);
  }

  const snaps: Record<string, SnapState> = state_data["data"]["snaps"];

  let snap_path = "/snap/*/*/meta/snap.yaml";
  if (alt_snaps !== undefined) {
    snap_path = alt_snaps;
  }

  const snap_matches = accessor.globfs(snap_path);
  if (snap_matches instanceof FileError) {
    return new LinuxError(`SNAP`, `failed to glob for snaps '${snap_path}': ${snap_matches}`);
  }

  for (const entry of snap_matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const meta = readTextFile(entry.handle as FileHandle);
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
      for (let i = 0; i < snaps[value]?.sequence.length; i++) {
        const name = snaps[value].sequence[i].name;
        const revision = snaps[value].sequence[i].revision;
        if (
          entry.meta.full_path.includes(name) &&
          entry.meta.full_path.includes(`${revision}`)
        ) {
          snaps[value].sequence[i].version =
            version.split("version: ").at(1)?.replaceAll("'", "") ?? "";
          snaps[value]["last-refresh-time"] = new Date(
            snaps[value]["last-refresh-time"].replace(/(\.\d{3})\d+/, "$1"),
          ).toISOString();
          snaps[value].evidence = entry.meta.display_path;
        }
      }
    }
  }

  return snaps;
}
