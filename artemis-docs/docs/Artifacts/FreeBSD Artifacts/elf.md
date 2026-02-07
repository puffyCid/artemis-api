---
description: The native executable format for FreeBSD
keywords:
  - freebsd
  - executable
  - binary
---

# ELF

The Executable Linkable Format (ELF) is the executable format for
applications on FreeBSD systems.

Artemis is able to parse basic metadata from ELF files.

Other Parsers:

- [radare2](https://rada.re/n/)
- [LIEF](https://lief-project.github.io/)

References:

- [LIEF](https://lief-project.github.io/)
- [ELF](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format)

## TOML Collection

There is no way to collect just ELF data with artemis instead it is an optional
feature for the [filelisting](./files.md) and [processes](./processes.md)
artifacts.

However, it is possible to directly parse ELF files by using TypeScript. See the
[API](../../API/overview.md) documentation for details.

## Collection Options

N/A

## Output Structure

An array of `ElfInfo` entries

```typescript
export interface ElfInfo {
  /**Array of symbols in ELF binary */
  symbols: string[];
  /**Array of sections in ELF binary */
  sections: string[];
  /**Machine type information in ELF binary */
  machine_type: string;
}
```
