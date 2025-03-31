---
description: GNOME Virtual FileSystem
keywords:
  - linux
  - gnome
---

# GVFS

GNOME Virtual FileSystem (GVFS) is a userspace filesystem that GNOME
applications may use. The metadata for the GVFS is typically stored at:
`/home/%/.local/share/gvfs-metadata/%`, they are in a binary format and must be
parsed.

Parsing this data may provide useful information for forensic investigators.
GVFS metadata may also retain data about files even after they have been deleted
from disk. Some information it may contain includes:

- Document metadata
- URL for downloaded files
- Mounted devices

Example below:

```json
{
    "name": "payroll.pdf",
    "metadata": {
        "evince::author": "",
        "evince::continuous": "1",
        "evince::dual-page": "0",
        "evince::dual-page-odd-left": "1",
        "evince::fullscreen": "0",
        "evince::inverted-colors": "0",
        "evince::page": "0",
        "evince::rtl": "0",
        "evince::sidebar_page": "thumbnails",
        "evince::sidebar_size": "148",
        "evince::sidebar_visibility": "1",
        "evince::sizing_mode": "free",
        "evince::title": "",
        "evince::window_height": "830",
        "evince::window_maximized": "0",
        "evince::window_width": "1556",
        "evince::window_x": "26",
        "evince::window_y": "23",
        "evince::zoom": "1"
    },
    "last_change": "2024-11-22T23:39:26.000Z",
    "path": "/Downloads/payroll/payroll.pdf",
    "source": "/home/user/.local/share/gvfs-metadata/home"
}
```

Other Parsers:

- [gvfs-meta-explorer](https://github.com/emanuele-f/gvfs-meta-explorer)

References:

- [GVFS](https://en.wikipedia.org/wiki/GVfs)
- [Shellbags for Linux](https://www.sciencedirect.com/science/article/abs/pii/S1742287615001085)

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse GVFS
metadata files.

```typescript
import { parseGvfs } from "./artemis-api/src/linux/gnome/gvfs";

function main() {
    const results = parseGvfs();
    console.log(results);
}

main();
```

# Output Structure

An array of `GvfsEntry` entries.

````typescript
export interface GvfsEntry {
    /**Name of GvfsEntry */
    name: string;
    /**Attributes associated with the entry. Example:
     * ```json
     * "metadata": {
            "download-uri": "https://download.freebsd.org/releases/amd64/amd64/ISO-IMAGES/14.1/FreeBSD-14.1-RELEASE-amd64-disc1.iso"
        },
     * ```
     */
    metadata: Record<number, string | string[]>;
    /**Full path of the GvfsEntry */
    path: string;
    /**Last change timestamp of the **metadata** */
    last_change: string;
    /**GFVS file source */
    source: string;
}
````
