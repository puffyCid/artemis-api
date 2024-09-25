import {
  Mru,
  MruType,
  MruValues,
} from "../../../types/windows/registry/recently_used.ts";
import { ShellItems } from "../../../types/windows/shellitems.ts";
import { WindowsError } from "../errors.ts";
import { getRegistry } from "../registry.ts";
import { lastVisitMru, openSaveMru } from "./mru/common.ts";
import { recentDocs } from "./mru/recent_docs.ts";

/**
 * Parse common Most Recently Used (MRU) Registry keys
 * @param ntuser_path Path to NTUSER.DAT file
 * @returns Array of common `Mru` entries or `WindowsError`
 */
export function parseMru(ntuser_path: string): Mru[] | WindowsError {
  const reg_data = getRegistry(ntuser_path);
  if (reg_data instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not parse Registry ${ntuser_path}: ${reg_data}`,
    );
  }

  const common = openSaveMru(reg_data.registry_entries);
  if (common instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not get OpenSave MRU entries: ${common}`,
    );
  }

  const mrus = [];

  const open_save_mru: Mru = {
    ntuser_path,
    kind: MruType.OPENSAVE,
    mru: common,
  };

  mrus.push(open_save_mru);

  const last_visit = lastVisitMru(reg_data.registry_entries);
  if (last_visit instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not get LastVisited MRU entries: ${common}`,
    );
  }

  const last_visit_mru: Mru = {
    ntuser_path,
    kind: MruType.LASTVISITED,
    mru: last_visit,
  };

  mrus.push(last_visit_mru);

  const recent_docs = recentDocs(reg_data.registry_entries);
  if (recent_docs instanceof WindowsError) {
    return new WindowsError(
      "MRU",
      `Could not get RecentDocs MRU entries: ${common}`,
    );
  }

  const recent_docs_mru: Mru = {
    ntuser_path,
    kind: MruType.RECENTDOCS,
    mru: recent_docs,
  };

  mrus.push(recent_docs_mru);

  return mrus;
}

/**
 * Assemble `ShellItems` into a MRU formatted entry
 * @param items Array of `Shellitems`
 * @returns Generic `MruValues`
 */
export function assembleMru(items: ShellItems[]): MruValues {
  const paths = [];

  if (items.length === 0) {
    return {
      filename: "",
      path: "",
      modified: "1601-01-01T00:00:00.000Z",
      created: "1601-01-01T00:00:00.000Z",
      accessed: "1601-01-01T00:00:00.000Z",
      items: [],
    };
  }

  for (const item of items) {
    paths.push(item.value.replaceAll("\\\\", ""));
  }
  // Get last entry
  const item = items[items.length - 1];
  const entry: MruValues = {
    filename: item.value,
    path: paths.join("\\"),
    modified: item.modified,
    created: item.created,
    accessed: item.accessed,
    items,
  };

  return entry;
}
