---
description: The native executable format for Windows
keywords:
  - windows
  - executable
  - binary
---

# Portable Executable

Windows Portable Executable (PE) is executable format for applications on
Windows. artemis is able to parse basic metadata from PE files using the
[pelite](https://crates.io/crates/pelite) crate.

Other Parsers:

- [radare2](https://rada.re/n/)
- [XPEViewer](https://github.com/horsicq/XPEViewer)
- [LIEF](https://lief-project.github.io/)

References:

- [LIEF](https://lief-project.github.io/)
- [libyal](https://github.com/libyal/libexe/blob/main/documentation/Executable%20(EXE)%20file%20format.asciidoc)

# TOML Collection

There is no way to collect just PE data with artemis instead it is an optional
feature for the Windows filelisting, rawfilelisting, and processes
artifacts.

However, it is possible to directly parse PE files by using TypeScript. See the
[API](../../API/overview.md) documentation for details.

# Collection Options

N/A

# Output Structure

An object containing PE info

```typescript
export interface PeInfo {
  /**Array of imported DLLs */
  imports: string[];
  /**Array of section names */
  sections: string[];
  /**Base64 encoded certificate information */
  cert: string;
  /**Path to PDB file */
  pdb: string;
  /**PE product version */
  product_version: string;
  /**PE file version */
  file_version: string;
  /**PE product name */
  product_name: string;
  /**PE company name */
  company_name: string;
  /**PE file description */
  file_description: string;
  /**PE internal name */
  internal_name: string;
  /**PE copyright */
  legal_copyright: string;
  /**PE original filename */
  original_filename: string;
  /**PE manifest info */
  manifest: string;
  /**Array of base64 icons */
  icons: string[];
}
```
