---
description: The Mozilla browser
keywords:
  - browser
  - mozilla
---

# Firefox

Firefox is a popular open source web browser created and maintained by Mozilla.
Artemis supports parsing the following artifacts from Firefox.

- History
- Downloads
- Cookies
- Addons
- Website storage
- Favicons

Other parsers:

- Any program that read a SQLITE database

# Collection

You have to use the artemis [api](../../API/overview.md) in order to collect FireFox data

```typescript
import { FireFox, PlatformType } from "./artemis-api/mod";

function main() {
  const enable_unfold = true;
  const fox = new FireFox(PlatformType.Linux, enable_unfold);

  const start = 0;
  const limit = 300;
  const history_data = fox.history(start, limit);

  const addons = fox.addons();
  return addons;
}

main();

```

# Output Structure

Dependent on browser artifact user wants to parse.

```typescript
export interface FirefoxHistory {
  /**Array of history entries */
  history: RawFirefoxHistory[];
  /**Path associated with the history file */
  path: string;
  /**User associated with the history file */
  user: string;
}

/**
 * An interface representing the Firefox SQLITE tables: `moz_places` and `moz_origins`
 */
export interface RawFirefoxHistory {
  /**SQLITE row id */
  moz_places_id: number;
  /**Page URL */
  url: string;
  /**Page title */
  title: string;
  /**URL in reverse */
  rev_host: string;
  /**Page visit count */
  visit_count: number;
  /**Hidden value */
  hidden: number;
  /**Typed value */
  typed: number;
  /**Frequency value */
  frequency: number;
  /**Last visit time */
  last_visit_date: string;
  /**GUID for entry */
  guid: string;
  /**Foreign count value */
  foreign_count: number;
  /**Hash of URL */
  url_hash: number;
  /**Page description */
  description: string;
  /**Preview image URL value */
  preview_image_url: string;
  /**Prefix value (ex: https://) */
  prefix: string;
  /** Host value */
  host: string;
}

export interface FirefoxDownloads {
  /**Array of downloads entries */
  downloads: RawFirefoxDownloads[];
  /**Path associated with the downloads file */
  path: string;
  /**User associated with the downloads file */
  user: string;
}

/**
 * An interface representing the Firefox SQLITE tables: `moz_places`, `moz_origins`, `moz_annos`, `moz_anno_attributes`
 */
export interface RawFirefoxDownloads {
  /**ID for SQLITE row */
  id: number;
  /**ID to history entry */
  place_id: number;
  /**ID to anno_attribute entry */
  anno_attribute_id: number;
  /**Content value */
  content: string;
  /**Flags value */
  flags: number;
  /**Expiration value */
  expiration: number;
  /**Download type value */
  download_type: number;
  /**Date added */
  date_added: string;
  /**Last modified */
  last_modified: string;
  /**Downloaded file name */
  name: string;
  /**History data associated with downloaded file */
  history: RawFirefoxHistory;
}

export interface FirefoxCookies {
  id: number;
  origin_attributes: string;
  name?: string;
  value?: string;
  host?: string;
  path?: string;
  expiry?: number;
  last_accessed?: string;
  creation_time?: string;
  is_secure?: boolean;
  is_http_only?: boolean;
  in_browser_element: boolean;
  same_site: boolean;
  raw_same_site: boolean;
  scheme_map: number;
  db_path: string;
}
```
