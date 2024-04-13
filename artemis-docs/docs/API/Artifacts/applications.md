---
description: Interact with Application Artifacts
---

# Applications

These functions can be used to pull data related to common third-party software

### getChromiumUsersHistory() -> ChromiumHistory[] | ApplicationError

Return Chromium history for all users

### getChromiumHistory(path) -> RawChromiumHistory[] | ApplicationError

Parse the Chromium History sqlite file at provided path. Will parse locked
sqlite files.

All Chromium derived browsers should be supported.

| Param | Type   | Description           |
| ----- | ------ | --------------------- |
| path  | string | Chromium History file |

### getChromiumUsersDownloads() -> ChromiumDownloads[] | ApplicationError

Return Chromium downloads for all users

### getChromiumDownloads(path) -> RawChromiumDownloads[] | ApplicationError

Parse the Chromium History sqlite file at provided path for downloads. Will
parse locked sqlite files.

All Chromium derived browsers should be supported.

| Param | Type   | Description           |
| ----- | ------ | --------------------- |
| path  | string | Chromium History file |

### chromiumExtensions(platform) -> Record&lt;string, unknown&gt;[] | ApplicationError

Parse all Chromium extensions (manifest.json files) for all users. Returns array
JSON objects.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |

### getFirefoxUsersHistory() -> FirefoxHistory[] | ApplicationError

Return Firefox history for all users

### getFirefoxHistory(path) -> RawFirefoxHistory[] | ApplicationError

Get Firefox history from provided places.sqlite file. Will parse locked sqlite
files.

| Param | Type   | Description           |
| ----- | ------ | --------------------- |
| path  | string | Chromium History file |

### getFirefoxUsersDownloads() -> FirefoxDownloads[] | ApplicationError

Return Firefox downloads for all users

### getFirefoxDownloads(path) -> RawFirefoxDownloads[] | ApplicationError

Get Firefox downloads from provided places.sqlite file. Will parse locked sqlite
files.

| Param | Type   | Description           |
| ----- | ------ | --------------------- |
| path  | string | Chromium History file |

### firefoxAddons(platform) -> Record&lt;string, unknown&gt;[] | ApplicationError

Parse all Firefox addons (addons.json files) for all users. Returns array JSON
objects.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |

### recentFiles(platform) -> History[] | ApplicationError

Return a list of files opened by LibreOffice for all users.

| Param    | Type         | Description          |
| -------- | ------------ | -------------------- |
| platform | PlatformType | OS platform to parse |

### fileHistory(platform) -> FileHistory[] | ApplicationError

Parse the local file history for VSCode. Returns list of history entries. Also
supports VSCodium.

| Param    | Type         | Description          |
| -------- | ------------ | -------------------- |
| platform | PlatformType | OS platform to parse |

### getExtensions(platform, path) -> Extensions[] | ApplicationError

Get installed VSCode or VSCodium extensions. Can also provide an optional
alternative path to the extensions.json file. Otherwise will use default paths.

| Param    | Type         | Description                             |
| -------- | ------------ | --------------------------------------- |
| platform | PlatformType | OS platform to parse)                   |
| path     | string       | Optional path to a extensions.json file |

### querySqlite(path, query) -> Record&lt;string, unknown&gt;[] | ApplicationError

Execute a SQLITe query against a provided database file. Databases are opened in
read-only mode. In addition, this function will bypass locked SQLITE databases.

| Param | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| path  | string | Path to the sqlite db                  |
| query | string | Query to execute against the sqlite db |

### getFirefoxCookies(platform, path) -> FirefoxCookies[] | ApplicationError

Get Firefox cookies for all users based on platform. Can also provide an
optional alternative path to the Cookie sqlite database instead

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |
| path     | string       | Optional path to a Firefox cookie database                |

### getChromiumCookies(platform, path) -> ChromiumCookies[] | ApplicationError

Get Chromium cookies for all users based on platform. Can also provide an
optional alternative path to the Cookie sqlite database. May fail if Chromium is
running due to Chromium process locking the file.

All Chromium derived browsers should be supported.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |
| path     | string       | Optional path to a Chromium cookie database               |

### getChromiumAutofill(platform, path) -> ChromiumAutofill[] | ApplicationError

Get Chromium autofill info for all users based on platform. Can also provide an
optional alternative path to the Web Data sqlite database.

All Chromium derived browsers should be supported.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |
| path     | string       | Optional path to a Chromium Web Data database             |

### getChromiumBookmarks(platform, path) -> ChromiumBookmarks[] | ApplicationError

Try to get Chromium bookmarks for all users based on platform. Can also provide
an optional alternative path to the Cookie sqlite database.

All Chromium derived browsers should be supported.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |
| path     | string       | Optional path to a Chromium bookmark file                 |

### getChromiumLogins(platform, path) -> ChromiumLogins[] | ApplicationError

Get saved Login information associated with Chromium browsers

All Chromium derived browsers should be supported.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |
| path     | string       | Optional path to a Chromium Login Data database           |

### chromiumPreferences(platform) -> Record&lt;string, unknown&gt;[] | ApplicationError

Get Chromium Preferences

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |

### getChromiumDips(platform, path) -> Dips[] | ApplicationError

Get Detect Incidental Party State (DIPS) info. DIPS collects metrics related to websites

All Chromium derived browsers should be supported.

| Param    | Type         | Description                                               |
| -------- | ------------ | --------------------------------------------------------- |
| platform | PlatformType | OS platform to parse. Supports Windows and macOS (Darwin) |
| path     | string       | Optional path to a Chromium Login Data database           |