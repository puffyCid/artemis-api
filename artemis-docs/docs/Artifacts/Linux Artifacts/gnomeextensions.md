---
description: GNOME Shell Extensions
keywords:
  - linux
  - gnome
---

# GNOME Extensions

GNOME is popular Linux Desktop environment pre-installed on many Linux
distributions. ~~In order to get a better user experience~~ Users often install
GNOME Shell extensions to enhance the Desktop environment. Artemis supports
parsing extension metadata to obtain information on installed extensions.

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect
installed GNOME extensions. By default the API will parse user and system
installed extensions.

## Sample API Script

```typescript
import { getGnomeExtensions } from "./artemis-api/src/linux/gnome/extensions";

function main() {
    const results = getGnomeExtensions();
    console.log(results);
}

main();
```

## Output Structure

An array of `Extension` entries.

```typescript
/**
 * Information about installed GNOME extensions
 */
export interface Extension {
  /**Path to extension metadata.json file */
  extension_path: string;
  /**Name of the extension */
  name: string;
  /**Extension description */
  description: string;
  /**Author (UUID) of the extension */
  uuid: string;
  /**Extension version */
  version: number;
  /**Supported GNOME Shell versions */
  "shell-version": string[];
  /**Extension Type: User or System */
  extension_type: ExtensionType;
  /**Other JSON key entries */
  [ key: string ]: unknown;
  /**metadata.json created */
  created: string;
  /**metadata.json modified */
  modified: string;
  /**metadata.json accessed */
  accessed: string;
  /**metadata.json changed */
  changed: string;
  message: string;
  datetime: string;
  timestamp_desc: "Created";
  artifact: "GNOME Extension";
  data_type: "linux:gnome:extensions:entry",
}

export enum ExtensionType {
  User = "User",
  System = "System",
  Unknown = "Unknown",
}
```
