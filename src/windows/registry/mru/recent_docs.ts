import { Registry } from "../../../../types/windows/registry";
import { MruValues } from "../../../../types/windows/registry/recently_used";
import { ShellItems } from "../../../../types/windows/shellitems";
import { decode } from "../../../encoding/base64";
import { EncodingError } from "../../../encoding/errors";
import { extractUtf16String } from "../../../encoding/strings";
import { NomError } from "../../../nom/error";
import { take, takeUntil } from "../../../nom/parsers";
import { WindowsError } from "../../errors";
import { getShellItem } from "../../shellitems";
import { assembleMru } from "../recently_used";

/**
 * Parse RecentDocs MRU keys
 * @param reg_data Array of `Registry` entries
 * @returns Array of `MruValues` or `WindowsError`
 */
export function recentDocs(reg_data: Registry[]): MruValues[] | WindowsError {
  const mru_entries: Registry[] = [];
  for (const entry of reg_data) {
    if (
      !entry.path.includes(
        "\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs",
      )
    ) {
      continue;
    }

    mru_entries.push(entry);
  }

  const mrus: MruValues[] = [];
  for (const entries of mru_entries) {
    for (const value of entries.values) {
      if (value.value === "MRUListEx") {
        continue;
      }
      const data = decode(value.data);
      if (data instanceof EncodingError) {
        console.error(
          `could not decode recent docs key ${value.value}: ${data}`,
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
        console.error(`could not nom end of string: ${remaining}`);
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
            `could not parse recent docs shellitem for ${value.value}: ${item}`,
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
