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
