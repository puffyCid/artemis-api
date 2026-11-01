import { Accessor, getRegistry } from "../../../mod";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { Registry } from "../../../types/windows/registry";
import { WordWheelEntry } from "../../../types/windows/registry/wordwheel";
import { EncodingError } from "../../encoding/errors";
import { decode } from "../../encoding/mod";
import { extractUtf16String } from "../../encoding/strings";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { WindowsError } from "../errors";

/**
 * Fucntion to parse user WordWheel searches in Windows Explorer
 * @param [protocol=AccessorProtocol.Ntfs] `AccessorProtocol` The default is `AccesssorProtocol.Ntfs`.
 * @param alt_path Path to NTUSER.dat file. Can also provide a glob to NTUSER.dat files
 * @returns Array of `WordWheelEntry` or `WindowsError`
 */
export function parseWordWheel(protocol = AccessorProtocol.Ntfs, alt_path?: string): WordWheelEntry[] | WindowsError {
  const accessor = new Accessor();
  const drive = getSystemDrive();

  let path = `${drive}\\Users\\*\\[Nn][Tt][Uu][Ss][Ee][Rr].[Dd][Aa][Tt]`;
  if (alt_path !== undefined) {
    path = alt_path;
  }

  // Based on the `AccessorProtocol` glob for Registry file
  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new WindowsError('WORDWHEEL', `failed to glob for ${path}: ${matches}`);
  }

  let wheels: WordWheelEntry[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const reg_data = getRegistry(entry.handle as FileHandle);
    if (reg_data instanceof WindowsError) {
      return new WindowsError(`WORDWHEEL`, `failed to parse ${path}: ${reg_data}`);
    }

    wheels = wheels.concat(extractWheel(reg_data));
  }

  return wheels;
}

/**
 * Extract WordWheel entries from Registry. It is just a string value
 * @param reg Array of `Registry` entries
 * @returns Array of `WordWheelEntry` entries
 */
function extractWheel(reg: Registry[]): WordWheelEntry[] {
  const wheels: WordWheelEntry[] = [];
  for (const entry of reg) {
    if (!entry.path.includes("WordWheel")) {
      continue;
    }

    for (const value of entry.values) {
      if (
        Number.isNaN(Number(value.value)) || value.data_type !== "REG_BINARY"
      ) {
        continue;
      }
      const bytes = decode(value.data);
      if (bytes instanceof EncodingError) {
        continue;
      }

      const search_term = extractUtf16String(bytes);
      const search: WordWheelEntry = {
        search_term,
        last_modified: entry.last_modified,
        evidence: entry.evidence,
        reg_path: entry.path,
      };
      wheels.push(search);
    }
  }

  return wheels;
}
