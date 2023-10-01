---
description: Interact with Application Artifacts
---

# Applications

These functions can be used to pull data related to common third-party software

### getChromiumUsersHistory() -> `ChromiumHistory[]`

Return Chromium history for all users

### getChromiumHistory(path) -> `RawChromiumHistory[]`

Parse the Chromium History sqlite file at provided path. Will parse locked
sqlite files.

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| path  | `string` | Chromium History file |

### getChromiumUsersDownloads() -> `ChromiumDownloads[]`

Return Chromium downloads for all users

### getChromiumDownloads(path) -> `RawChromiumDownloads[]`

Parse the Chromium History sqlite file at provided path for downloads. Will
parse locked sqlite files.

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| path  | `string` | Chromium History file |

### chromiumExtensions(platform) -> `Record<string, object>[] | Error`

Parse all Chromium extensions (manifest.json files) for all users. Returns array
JSON objects.

| Param    | Type           | Description                                               |
| -------- | -------------- | --------------------------------------------------------- |
| platform | `PlatformType` | OS platform to parse. Supports Windows and macOS (Darwin) |

### getFirefoxUsersHistory() -> `FirefoxHistory[]`

Return Firefox history for all users

### getFirefoxHistory(path) -> `RawFirefoxHistory[]`

Get Firefox history from provided `places.sqlite` file. Will parse locked sqlite
files.

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| path  | `string` | Chromium History file |

### getFirefoxUsersDownloads() -> `FirefoxDownloads[]`

Return Firefox downloads for all users

### getFirefoxDownloads(path) -> `RawFirefoxDownloads[]`

Get Firefox downloads from provided `places.sqlite` file. Will parse locked
sqlite files.

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| path  | `string` | Chromium History file |

### firefoxAddons(platform) -> `Record<string, object>[] | Error`

Parse all Firefox addons (addons.json files) for all users. Returns array JSON
objects.

| Param    | Type           | Description                                               |
| -------- | -------------- | --------------------------------------------------------- |
| platform | `PlatformType` | OS platform to parse. Supports Windows and macOS (Darwin) |

### fileHistory() -> `History[] | Error`

Return a list of files opened by LibreOffice for all users. Currently only macOS
is supported
