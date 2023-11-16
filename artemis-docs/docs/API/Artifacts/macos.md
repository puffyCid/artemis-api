---
description: Interact with macOS Artifacts
---

# macOS

These functions can be used to pull data related to macOS artifacts

### getUsers() -> `Users[] | MacosError`

Return all local users on macOS sysem

### getGroup() -> `Groups[] | MacosError`

Return all local groups on macOS sysem

### parseAlias(data) -> `Alias | MacosError`

Parse macOS [alias](https://en.wikipedia.org/wiki/Alias_(Mac_OS)) data. Alias
files are a legacy shortcut format. May be encountered in `plist` files such as
the firewall `plist` file.

| Param | Type         | Description     |
| ----- | ------------ | --------------- |
| data  | `Uint8Array` | Raw alias bytes |

### getEmond() -> `Emond[] | MacosError`

Get all [Emond](../../Artifacts/macOS%20Artifacts/emond.md) rules on macOS.
Emond was been removed on Ventura.

### getExecpolicy() -> `ExecPolicy[] | MacosError`

Parse the ExecPolicy sqlite database on macOS

### firewallStatus() -> `Firewall | MacosError`

Return firewall information and status on macOS

### getFsevents() -> `Fsevents[] | MacosError`

Parse macOS [FsEvents](../../Artifacts/macOS%20Artifacts/fsevents.md)

### getLaunchdDaemons() -> `Launchd[] | MacosError`

Return all Launch daemons on macOS

### getLaunchdAgents() -> `Launchd[] | MacosError`

Return all Launch agents on macOS

### getLoginitems() -> `LoginItems[] | MacosError`

Return all LoginItems on macOS

### getMacho(path) -> `MachoInfo[] | MacosError`

Parse a macho file and return metadata about the binary.

| Param | Type     | Description          |
| ----- | -------- | -------------------- |
| path  | `string` | Path to macho binary |

### getPlist(path) -> `Record<string, unknown> | number[] | MacosError`

Parse a plist file. Supports parsing a provide plist file path or the raw bytes
of plist data. Sometimes a plist file may contain another base64 encoded plist.
This function can parse the raw plist bytes.

| Param | Type                                  | Description                           |
| ----- | ------------------------------------- | ------------------------------------- |
| path  | <code>string &#124; Uint8Array</code> | Path to plist file or raw plist bytes |

### passwordPolicy() -> `PasswordPolicy[] | MacosError`

Get password policies on macOS. Will parse plist file at
`/var/db/dslocal/nodes/Default/config/shadowhash.plist`

### getSafariUsersHistory() -> `SafariHistory[] | MacosError`

Return Safari history for all users

### getSafariHistory(path) -> `RawSafariHistory[] | MacosError`

Parse Safari history from provided `History.db` sqlite file. Supports locked
files.

| Param | Type     | Description               |
| ----- | -------- | ------------------------- |
| path  | `string` | Path to `History.db` file |

### getSafariUsersDownloads() -> `SafariDownloads[] | MacosError`

Return Safari downloads for all users

### getSafariDownloads(path) -> `RawSafariDownloads[] | MacosError`

Parse Safari history from provided `Downloads.plist` file.

| Param | Type     | Description                    |
| ----- | -------- | ------------------------------ |
| path  | `string` | Path to `Downloads.plist` file |

### getUnifiedLog(path) -> `UnifiedLog[] | MacosError`

Parse a single UnifiedLog file (.tracev3) on macOS. Typically found at
`/private/var/db/diagnostics/{Persist, Signpost, HighVolume, Special}`

| Param | Type     | Description           |
| ----- | -------- | --------------------- |
| path  | `string` | Path to .tracev3 file |

### parseRequirementBlob(data) -> `SingleRequirement | MacosError`

Parse the Requirement Blob from raw codesigning bytes. This part of Apple's
CodeSigning framework. This data can be found in macho binaries and also plist
files.

| Param | Type         | Description                                |
| ----- | ------------ | ------------------------------------------ |
| data  | `Uint8Array` | Raw bytes associated with requirement blob |

### listApps() -> `Applications[] | MacosError`

Return a simple Application listing. Searches user installed Apps, System Apps,
default Homebrew paths (/usr/local/Cellar, /opt/homebrew/Cellar).

Use `scanApps()` if you want to scan the entire filesystem for Apps

### scanApps() -> `Applications[] | MacosError`

Scans the entire filesystem under /System/ and tries to parse all Applications.

Includes embedded Apps, Frameworks, and any file that ends with
`%/Contents/Info.plist`

Use `listApps()` if you a simpler Application listing

### dockTiles() -> `Applications[] | MacosError`

Scans the entire filesystem under /System looking for Applications that use
DockTile persistence. See https://theevilbit.github.io/beyond/beyond_0032/ for
details on Dock Tile PlugIns

Includes embedded Apps, Frameworks, and any file that ends with
`%/Contents/Info.plist`
