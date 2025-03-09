import { getRegistry } from "../../../mod.ts";
import { Registry } from "../../../types/windows/registry.ts";
import { WordWheelEntry } from "../../../types/windows/registry/wordwheel.ts";
import { EncodingError } from "../../encoding/errors.ts";
import { decode } from "../../encoding/mod.ts";
import { extractUtf16String } from "../../encoding/strings.ts";
import { FileError } from "../../filesystem/errors.ts";
import { glob } from "../../filesystem/files.ts";
import { WindowsError } from "../errors.ts";

/**
 * Fucntion to parse user WordWheel searches in Windows Explorer
 * @param path Path to NTUSER.dat file. Can also provide a glob to NTUSER.dat files
 * @returns Array of `WordWheelEntry` or `WindowsError`
 */
export function parseWordWheel(path: string): WordWheelEntry[] | WindowsError {
  const globs = glob(path);
  if (globs instanceof FileError) {
    return new WindowsError(
      "WORDWHEEL",
      `Could not glob registry path ${path}: ${globs}`,
    );
  }

  let wheels: WordWheelEntry[] = [];
  for (const glob_path of globs) {
    if (!glob_path.is_file) {
      continue;
    }

    const reg_data = getRegistry(glob_path.full_path);
    if (reg_data instanceof WindowsError) {
      console.warn(`Could not parse Registry file ${glob_path.full_path}`);
      continue;
    }

    wheels = wheels.concat(extractWheel(reg_data, glob_path.full_path));
  }
  return wheels;
}

/**
 * Extract WordWheel entries from Regstry. It is just a string value
 * @param reg Array of `Registry` entries
 * @param source_path Source path to the NTUSER.dat file
 * @returns Array of `WordWheelEntry` entries
 */
function extractWheel(reg: Registry[], source_path: string): WordWheelEntry[] {
  const wheels: WordWheelEntry[] = [];
  for (const entry of reg) {
    if (!entry.path.includes("WordWheel")) {
      continue;
    }

    for (const value of entry.values) {
      if (
        Number.isNaN(Number(value.value)) || value.data_type != "REG_BINARY"
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
        source_path,
        reg_path: entry.path,
      };
      wheels.push(search);
    }
  }

  return wheels;
}
