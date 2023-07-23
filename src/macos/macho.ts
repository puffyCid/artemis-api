/**
 * An interface to basic macho information
 *
 * References:
 *  - https://github.com/aidansteele/osx-abi-macho-file-format-reference
 */
export interface MachoInfo {
  /**CPU arch */
  cpu_type: string;
  /**CPU model */
  cpu_subtype: string;
  /**File type, ex: executable, dylib, object, core, etc*/
  filetype: string;
  /**Segments of the macho binary */
  sgements: Segment64[];
  /**Dynamic libraries in the macho binary */
  dylib_commands: DylibCommand[];
  /**Macho binary id */
  id: string;
  /**Macho team id */
  team_id: string;
  /**Parsed out macho entitlements from plist */
  entitlements: Record<string, unknown>;
  /**Base64 encoded embedded certs within the binary */
  certs: string;
  /**Minium OS binary can run on */
  minos: string;
  /**SDK version macho was compiled for */
  sdk: string;
}

/**
 * Metadata about macho Segments
 */
export interface Segment64 {
  /**Name of segment */
  name: string;
  /**Virtual memory address */
  vmaddr: number;
  /**Virtual memory size */
  vmsize: number;
  /**Offset in the macho binary */
  file_offset: number;
  /**Size of segment */
  file_size: number;
  /**Maxmimum permitted memory protection */
  max_prot: number;
  /**Initial memory protection */
  init_prot: number;
  /**Number of sections in the semgent */
  nsects: number;
  /**Segment flags */
  flags: number;
  /**Array of section data */
  sections: Sections[];
}

/**
 * Metadata about macho Sections
 */
export interface Sections {
  /**Name of section */
  section_name: string;
  /**Name of segment the section belongs to */
  segment_name: string;
  /**Virtual memory address */
  addr: number;
  /**Size of section */
  size: number;
  /**Section offset in file */
  offset: number;
  /**Section byte alignment */
  align: number;
  /**File offset to relocation entries */
  relocation_offset: number;
  /**Number of relocation entries */
  number_relocation_entries: number;
  /**Flags related to the section */
  flags: number;
  /**Reserved */
  reserved: number;
  /**Reserved */
  reserved2: number;
  /**Reserved */
  reserved3: number;
}

/**
 * Metadata about macho dylibcommand
 */
export interface DylibCommand {
  /**Name of dynamic library */
  name: string;
  /**Timestamp when the library was build */
  timestamp: number;
  /**Version of dynamic library */
  current_version: number;
  /**Compatiblity version of dynamic library */
  compatibility_version: string;
}

/**
 * Function to parse a `macho` executable.
 * @param path Full path to a `macho` file
 * @returns Basic `MachoInfo` interface array or null
 */
export function getMacho(path: string): MachoInfo[] | null {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_macho(path);
  if (data === "") {
    return null;
  }

  const macho: MachoInfo[] = JSON.parse(data);
  return macho;
}
