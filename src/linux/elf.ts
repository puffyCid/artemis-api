import { ElfInfo } from "../../types/linux/elf";
import { LinuxError } from "./errors";

/**
 * Function to parse an `elf` executable.
 * @param path Full path to a `elf` file
 * @returns Basic `ElfInfo` interface or LinuxError
 */
export function getElf(path: string): ElfInfo | LinuxError {
  try {
    // @ts-expect-error: Custom Artemis function
    const data = js_get_elf(path);
    return data;
  } catch (err) {
    return new LinuxError("ELF", `failed to parse elf ${path}: ${err}`);
  }
}
