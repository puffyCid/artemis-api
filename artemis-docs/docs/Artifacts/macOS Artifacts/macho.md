---
description: The native executable format for macOS
keywords:
  - macOS
  - executable
  - binary
---

# Macho

macOS Mach object (`macho`) is the executable format for applications on macOS.
artemis is able to parse basic metadata from `macho` files.

Other Parsers:

- [radare2](https://rada.re/n/)
- [LIEF](https://lief-project.github.io/)
- [XMachOView](https://github.com/horsicq/XMachOViewer)

References:

- [LIEF](https://lief-project.github.io/)
- [Macho](https://github.com/aidansteele/osx-abi-macho-file-format-reference)

# TOML Collection

There is no way to collect just `macho` data with artemis instead it is an
optional feature for the macOS `filelisting` and `processes` artifacts.

However, it is possible to directly parse `macho` files by using JavaScript. See
the [scripts](../../Intro/Scripting/scripts.md) chapter for examples.

# Configuration Optaions

N/A

# Output Structure

An array of `macho` entries

```typescript
export interface MachoInfo {
  /**CPU arch */
  cpu_type: string;
  /**CPU model */
  cpu_subtype: string;
  /**File type, ex: executable, dylib, object, core, etc*/
  filetype: string;
  /**Segments of the macho binary */
  segments: Segment64[];
  /**Dynamic libraries in the macho binary */
  dylib_command: DylibCommand[];
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
```
