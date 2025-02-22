/**
 * Functions to parse Common Dialog MRU entries
 * https://www.magnetforensics.com/blog/what-is-mru-most-recently-used/
 */

import { Registry } from "../../../../types/windows/registry.ts";
import { MruValues } from "../../../../types/windows/registry/recently_used.ts";
import { ShellItems } from "../../../../types/windows/shellitems.ts";
import { decode } from "../../../encoding/base64.ts";
import { EncodingError } from "../../../encoding/errors.ts";
import { extractUtf16String } from "../../../encoding/strings.ts";
import { NomError } from "../../../nom/error.ts";
import { take, takeUntil } from "../../../nom/parsers.ts";
import { WindowsError } from "../../errors.ts";
import { getShellItem } from "../../shellitems.ts";
import { assembleMru } from "../recently_used.ts";

/**
 * Parse the Open and Save MRU keys
 * @param reg_data Array of `Registry` entries
 * @returns Array of `MruValues` or `WindowsError`
 */
export function openSaveMru(reg_data: Registry[]): MruValues[] | WindowsError {
  const mru_entries = [];
  for (const entry of reg_data) {
    if (
      !entry.path.includes(
        "\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePidlMRU",
      )
    ) {
      continue;
    }

    mru_entries.push(entry);
  }

  const mrus = [];
  for (const entries of mru_entries) {
    for (const value of entries.values) {
      if (value.value === "MRUListEx") {
        continue;
      }
      let data = decode(value.data);
      if (data instanceof EncodingError) {
        console.error(`could not decode OpenSave key ${value.value}: ${data}`);
        continue;
      }
      const items: ShellItems[] = [];
      // MRU entries are ShellItems. Parse all ShellItem data
      while (data.length != 0) {
        const item = getShellItem(data);
        if (item instanceof WindowsError) {
          console.error(
            `could not parse OpenSave shellitem for ${value.value}: ${item}`,
          );
          break;
        }
        data = item.remaining;
        items.push(item.item);
      }

      const mru = assembleMru(items);
      mrus.push(mru);
    }
  }

  return mrus;
}

/**
 * Parse the Last Visited MRU keys
 * @param reg_data Array of `Registry` entries
 * @returns Array of `MruValues` or `WindowsError`
 */
export function lastVisitMru(reg_data: Registry[]): MruValues[] | WindowsError {
  const mru_entries = [];
  for (const entry of reg_data) {
    if (
      !entry.path.includes(
        "\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\LastVisitedPidlMRU",
      )
    ) {
      continue;
    }

    mru_entries.push(entry);
  }

  const mrus = [];
  for (const entries of mru_entries) {
    for (const value of entries.values) {
      if (value.value === "MRUListEx") {
        continue;
      }
      const data = decode(value.data);
      if (data instanceof EncodingError) {
        console.error(
          `could not decode LastVisited key ${value.value}: ${data}`,
        );
        continue;
      }

      // Nom until end of string character for UTF16
      const remaining = takeUntil(data, new Uint8Array([0, 0, 0]));
      if (remaining instanceof NomError) {
        console.error(`could not nom UTF16 filename: ${remaining}`);
        continue;
      }

      // Now nom the end of string charater
      const remaining_item = take(remaining.remaining as Uint8Array, 3);
      if (remaining_item instanceof NomError) {
        console.error(`could not nom end of byte string: ${remaining}`);
        continue;
      }

      let item_data = remaining_item.remaining;
      const filename = extractUtf16String(remaining.nommed as Uint8Array);

      const items: ShellItems[] = [];
      // MRU entries are ShellItems. Parse all ShellItem data
      while (item_data.length != 0) {
        const item = getShellItem(item_data as Uint8Array);
        if (item instanceof WindowsError) {
          console.error(
            `could not parse LastVisited shellitem for ${value.value}: ${item}`,
          );
          break;
        }
        item_data = item.remaining;
        items.push(item.item);
      }

      const mru = assembleMru(items);
      mru.filename = filename;
      mrus.push(mru);
    }
  }

  return mrus;
}
