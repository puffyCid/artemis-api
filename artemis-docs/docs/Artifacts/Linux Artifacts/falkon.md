---
description: KDE Falkon browser
keywords:
  - linux
  - kde
  - browser
---

# Falkon

Falkon is a popular browser for the KDE Desktop environment. Artemis
supports parsing several types of Falkon browser data:

- History
- Cookies
- Bookmarks

## Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
Falkon browser data.

```typescript
import { Falkon, PlatformType } from "./artemis-api/mod";
function main() {
    const client = new Falkon(PlatformType.Linux, true);
    console.log(JSON.stringify(client.history()));
    console.log(JSON.stringify(client.cookie()));
    console.log(JSON.stringify(client.bookmark()));
}

main();
```

## Output Structure

Depending on the the functions used artemis will return the objects below:

```typescript
export interface FalkonHistory {
    id: number;
    url: string;
    unfold: Url | undefined;
    /**Path to the browsedata.db sqlite file */
    db_path: string;
    /**Browser version */
    version: string;
    title: string | null;
    visited: string;
    count: number;
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}

export interface FalkonCookie {
    created: string;
    host_key: string;
    top_frame_site_key: string;
    name: string;
    value: string;
    encrypted_value: string;
    path: string;
    expires: string;
    is_secure: boolean;
    is_httponly: boolean;
    last_access: string;
    has_expires: boolean;
    is_persistent: boolean;
    priority: number;
    samesite: number;
    source_scheme: number;
    source_port: number;
    last_update: string;
    source_type: ChromiumCookieType;
    has_cross_site_ancestor: boolean;
    message: string;
    /**Path to the Cookies sqlite file */
    db_path: string;
    /**Browser version */
    version: string;
    datetime: string;
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}

export interface FalkonBookmark {
    bookmark_type: string;
    description: string;
    name: string;
    location: BookmarkLocation;
    url: string;
    visit_count: number;
    /**Path to the bookmarks.json file */
    path: string;
    /**Browser version */
    version: string;
    message: string;
    datetime: string;
    timestamp_desc: string;
    artifact: string;
    data_type: string;
}

export enum BookmarkLocation {
    Bar = "BookmarkBar",
    Menu = "BookmarkMenu",
    Other = "BookmarkOther"
}
```
