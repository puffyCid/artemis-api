---
description: Emond jobs on macOS
keywords:
  - macOS
  - persistence
  - plaintext
---

# Emond

macOS Event Monitor Daemon (Emond) is a service that allows users to register
rules to perform actions when specific events are triggered, for example "system
startup". Emond can be leveraged to achieve persistence on macOS. Starting on
macOS Ventura (13) emond has been removed.

Other Parsers:

- None

References:

- [What is emond](https://magnusviri.com/what-is-emond.html)
- [Emond for Persistence](https://www.xorrior.com/emond-persistence/)

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse `BOM`
data.

## Output Structure

An array of `Emond` entries

```typescript
export interface Emond {
  /**Raw plist data associated with Emond rule */
  plist_data: Record<string, unknown> | number[] | Record<string, unknown>[]
  /**Path to Emond plist */
  evidence: string;
}
```
