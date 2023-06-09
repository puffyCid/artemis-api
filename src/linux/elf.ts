/**
 * ELF files are native executable format on Linux systems.
 * `ElfInfo` is an interface for basic ELF information
 *
 * References:
 *  - https://en.wikipedia.org/wiki/Executable_and_Linkable_Format
 */
export interface ElfInfo {
  /**Array of symbols in ELF binary */
  symbols: string[];
  /**Array of sections in ELF binary */
  sections: string[];
  /**Machine type information in ELF binary */
  machine_type: string;
}

/**
 * Function to parse an `elf` executable.
 * @param path Full path to a `elf` file
 * @returns Basic `ElfInfo` interface or null
 */
export function getElf(path: string): ElfInfo | null {
  const data = Deno[Deno.internal].core.ops.get_elf(path);
  if (data === "") {
    return null;
  }

  const elf: ElfInfo = JSON.parse(data);
  return elf;
}
