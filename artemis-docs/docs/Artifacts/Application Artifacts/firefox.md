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
- Form history

Other parsers:

- Any program that read a SQLITE database

## Collection

You have to use the artemis [api](../../API/overview.md) in order to collect FireFox data


## Sample API Script

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

## Output Structure

Dependent on browser artifact user wants to parse.

```typescript
import { Url } from "../http/unfold";

/**
 * Firefox history is stored in a SQLITE file.
 * `artemis` uses the `sqlite` crate to read the SQLITE file. It can even read the file if Firefox is running.
 *
 * References:
 *  - https://kb.mozillazine.org/Places.sqlite
 */

/**
 * An interface representing the Firefox SQLITE tables: `moz_places` and `moz_origins`
 */
export interface FirefoxHistory {
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
  unfold: Url | undefined;
  db_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "URL Visited";
  artifact: "URL History";
  data_type: "application:firefox:history:entry";
}

/**
 * An interface representing the Firefox SQLITE tables: `moz_places`, `moz_origins`, `moz_annos`, `moz_anno_attributes`
 */
export interface FirefoxDownloads {
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
  db_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "File Download Start";
  artifact: "File Download";
  data_type: "application:firefox:downloads:entry";
}

export interface FirefoxCookies {
  id: number;
  origin_attributes: string;
  name: string;
  value: string;
  host: string;
  path: string;
  expiry: string;
  last_accessed: string;
  creation_time: string;
  is_secure: boolean;
  is_http_only: boolean;
  in_browser_element: boolean;
  same_site: boolean;
  scheme_map: number;
  db_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "Cookie Expires";
  artifact: "Website Cookie";
  data_type: "application:firefox:cookies:entry";
}

export interface FirefoxFavicons {
  icon_url: string;
  expires: string;
  db_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "Favicon Expires";
  artifact: "URL Favicon";
  data_type: "application:firefox:favicons:entry";
}

export interface FirefoxProfiles {
  full_path: string;
  version: number;
}

export interface FirefoxStorage {
  repository: Respository;
  suffix?: string;
  group: string;
  origin: string;
  client_usages: string;
  last_access: string;
  accessed: number;
  persisted: number;
  db_path: string;
  message: string;
  datetime: string;
  timestamp_desc: "Website Storage Last Accessed";
  artifact: "Website Storage";
  data_type: "application:firefox:storage:entry";
}

export enum Respository {
  Persistent = "Persistent",
  Default = "Default",
  Private = "Private",
  Unknown = "Unknown",
  Temporary = "Temporary",
}

export interface FirefoxAddons {
  installed: string;
  updated: string;
  active: boolean;
  visible: boolean;
  author: string;
  version: string;
  path: string;
  db_path: string;
  message: string;
  datetime: string;
  name: string;
  description: string;
  creator: string;
  timestamp_desc: "Extension Installed";
  artifact: "Browser Extension";
  data_type: "application:firefox:extension:entry";
}
```
