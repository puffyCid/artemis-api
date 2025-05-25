---
description: GNOME Epiphany
keywords:
  - linux
  - gnome
---

# GNOME Epiphany

Epiphany is the default web browser for the GNOME desktop. Artemis supports extracting a variety of artifacts from the browser. Currently artemis can extract:
- Browser history
- Cookies
- Last printed page
- Website permissions
- Last session info

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect Epiphany artifacts.

```typescript
import { Epiphany } from "./artemis-api/src/linux/gnome/epiphany";

function main() {
    const use_unfold = true;
    // Enable optional Unfold parsing
    const client = new Epiphany(use_unfold);
    const data = client.history();
    console.log(JSON.stringify(data));
}

main();
```

# Output Structure

Depending on the the functions used will return the objects below:

```typescript
export interface EpiphanyHistory {
    target_url: string | null;
    url_id: number;
    target_host: number;
    title: string | null;
    sync_id: string | null;
    visit_count: number;
    typed_count: number;
    last_visit_time: string;
    thumbnail_update_time: string;
    hidden_from_overview: boolean;
    visit_type: VisitType;
    referring_visit: string | null;
    db_path: string;
    unfold?: Url;
}

/**
 * Similar format as `FirefoxCookies`
 */
export interface EpiphanyCookies {
    id: number;
    name: string | null;
    value: string | null;
    host: string | null;
    path: string | null;
    expiry: string | null;
    last_accessed: string | null;
    is_secure: boolean | null;
    is_http_only: boolean | null;
    same_site: boolean | null;
    db_path: string;
}

export interface EpiphanyPermissions {
    url: string;
    permissions: Record<string, string>;
    file_path: string;
}

export enum VisitType {
    None = "None",
    Link = "Link",
    Typed = "Typed",
    Bookmark = "Bookmark",
    HomePage = "HomePage",
    Unknown = "Unknown",
}

export interface EpiphanyPrint {
    scale: number;
    copies: number;
    number: number;
    reverse: boolean;
    output: string;
    page_set: string;
    printer: string;
    pages: string | number;
    collate: boolean;
    file_path: string;
}
```