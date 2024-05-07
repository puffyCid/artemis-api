---
description: Interact with macOS Artifacts
---

# macOS

These functions can be used to pull data related to macOS artifacts

### getUsers(path) -> Users[] | MacosError

Return all local users on macOS sysem. Can provide an optional alternative path
to directory containing users. Otherwise will use default path on system
/var/db/dslocal/nodes/Default/users

| Param | Type   | Description                                  |
| ----- | ------ | -------------------------------------------- |
| path  | string | Optional alternative path to users directory |

### getGroup(path) -> Groups[] | MacosError

Return all local groups on macOS sysem. Can provide an optional alternative path
to directory containing groups. Otherwise will use default path on system
/var/db/dslocal/nodes/Default/groups

| Param | Type   | Description                                   |
| ----- | ------ | --------------------------------------------- |
| path  | string | Optional alternative path to groups directory |

### parseAlias(data) -> Alias | MacosError

Parse macOS [alias](https://en.wikipedia.org/wiki/Alias_(Mac_OS)) data. Alias
files are a legacy shortcut format. May be encountered in plist files such as
the firewall plist file.

| Param | Type       | Description     |
| ----- | ---------- | --------------- |
| data  | Uint8Array | Raw alias bytes |

### getEmond(path) -> Emond[] | MacosError

Get all [Emond](../../Artifacts/macOS%20Artifacts/emond.md) rules on macOS. FYI
Emond was removed on Ventura. Can provide an optional alternative path to
directory containing emond rules. Otherwise will parse emond config on system to
try to find rules

| Param | Type   | Description                              |
| ----- | ------ | ---------------------------------------- |
| path  | String | Optional alternative path to emond rules |

### getExecpolicy(path) -> ExecPolicy[] | MacosError

Parse the ExecPolicy sqlite database on macOS. Can provide an optional
alternative path to ExecPolicy database. Otherwise will parse default database
on system at /var/db/SystemPolicyConfiguration/ExecPolicy

| Param | Type   | Description                                      |
| ----- | ------ | ------------------------------------------------ |
| path  | String | Optional alternative path to ExecPolicy database |

### firewallStatus(alt_path) -> Firewall | MacosError

Return firewall information and status on macOS. Can provide an optional path to
com.apple.alf.plist, otherwise will use /Library/Preferences/com.apple.alf.plist

| Param    | Type   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| alt_path | String | Alternative full path to the com.apple.alf.plist file |

### getFsevents(path) -> Fsevents[] | MacosError

Parse macOS FsEvents from provided file.

| Param | Type   | Description                    |
| ----- | ------ | ------------------------------ |
| path  | String | Full path to the FsEvents file |

### getLaunchdDaemons() -> Launchd[] | MacosError

Return all Launch daemons on macOS

### getLaunchdAgents() -> Launchd[] | MacosError

Return all Launch agents on macOS

### getLoginitems(path) -> LoginItems[] | MacosError

Return all LoginItems on macOS. Can provide an optional alternative path to a
LoginItem file (.btm). Otherwise will parse default default locations for
LoginItems

| Param | Type   | Description                                 |
| ----- | ------ | ------------------------------------------- |
| path  | String | Optional alternative path to LoginItem file |

### getMacho(path) -> MachoInfo[] | MacosError

Parse a macho file and return metadata about the binary.

| Param | Type   | Description          |
| ----- | ------ | -------------------- |
| path  | string | Path to macho binary |

### getPlist(path or Uint8Array) -> Record&lt;string, unknown&gt; | Uint8Array | Record&lt;string, unknown&gt;[] | MacosError

Parse a plist file. Supports parsing a provide plist file path or the raw bytes
of plist data. Sometimes a plist file may contain another base64 encoded plist.
This function can parse the raw plist bytes.

| Param              | Type                 | Description                           |
| ------------------ | -------------------- | ------------------------------------- |
| path or Uint8Array | string or Uint8Array | Path to plist file or raw plist bytes |

### passwordPolicy(alt_path) -> PasswordPolicy[] | MacosError

Get password policies on macOS. Will parse plist file at
/var/db/dslocal/nodes/Default/config/shadowhash.plist. You may also provide an
optional alternative path to the shadowhash.plist file.

| Param    | Type   | Description                                        |
| -------- | ------ | -------------------------------------------------- |
| alt_path | String | Optional alternative path to shadowhash.plist file |

### getSafariUsersHistory() -> SafariHistory[] | MacosError

Return Safari history for all users

### getSafariHistory(path) -> RawSafariHistory[] | MacosError

Parse Safari history from provided History.db sqlite file. Supports locked
files.

| Param | Type   | Description             |
| ----- | ------ | ----------------------- |
| path  | string | Path to History.db file |

### getSafariUsersDownloads() -> SafariDownloads[] | MacosError

Return Safari downloads for all users

### getSafariDownloads(path) -> RawSafariDownloads[] | MacosError

Parse Safari history from provided Downloads.plist file.

| Param | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| path  | string | Path to Downloads.plist file |

### getUnifiedLog(path, archive_path) -> UnifiedLog[] | MacosError

Parse a single UnifiedLog file (.tracev3) on macOS. Typically found at:

- /private/var/db/diagnostics/Persist
- /private/var/db/diagnostics/Signpost
- /private/var/db/diagnostics/HighVolume
- /private/var/db/diagnostics/Special

You may also specify an optional logarchive style directory containing the
Unified Log metadata (UUID directories, timesync, and dsc directory). Otherwise
artemis will parse their default locations.

| Param        | Type   | Description                                                                   |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| path         | string | Path to .tracev3 file                                                         |
| archive_path | string | Optional path to a logarchive style directory containing Unified Log metadata |

### parseRequirementBlob(data) -> SingleRequirement | MacosError

Parse the Requirement Blob from raw codesigning bytes. This part of Apple's
CodeSigning framework. This data can be found in macho binaries and also plist
files.

| Param | Type       | Description                                |
| ----- | ---------- | ------------------------------------------ |
| data  | Uint8Array | Raw bytes associated with requirement blob |

### listApps() -> Applications[] | MacosError

Return a simple Application listing. Searches user installed Apps, System Apps,
default Homebrew paths:

- /usr/local/Cellar
- /opt/homebrew/Cellar

Use scanApps() if you want to scan the entire filesystem for Apps

### scanApps() -> Applications[] | MacosError

Scans the entire filesystem under /System/ and tries to parse all Applications.

Includes embedded Apps, Frameworks, and any file that ends with
%/Contents/Info.plist

Use listApps() if you a simpler Application listing

### dockTiles() -> Applications[] | MacosError

Scans the entire filesystem under /System looking for Applications that use
DockTile persistence. See https://theevilbit.github.io/beyond/beyond_0032/ for
details on Dock Tile PlugIns

Includes embedded Apps, Frameworks, and any file that ends with
%/Contents/Info.plist

### getPackages(glob_path) -> HomebrewReceipt[]

Get Homebrew packages on the system. Does **not** include Casks.\
Use getHomebrewInfo() to get all packages and Casks.

By default this function will search for all packages at:

- /opt/homebrew/Cellar
- /usr/local/Cellar

| Param     | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| glob_path | string | Optional alternative glob path to use |

### getCasks(glob_path) -> HomebrewFormula[]

Get Homebrew Casks on the system. Does **not** include packages.\
Use getHomebrewInfo() to get all packages and Casks.

By default this function will search for all packages at:

- /opt/homebrew/Caskroom
- /usr/local/Caskroom

| Param     | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| glob_path | string | Optional alternative glob path to use |

### getHomebrewInfo() -> HomebrewData

Get Homebrew packages and Casks on the system. Searches for Homebrew data at:

- /opt/homebrew
- /usr/local

### wifiNetworks() -> Wifi[]

Get list of joined Wifi networks on macOS. Requires root access.

By default it will try to parse WiFi networks at
/Library/Preferences/com.apple.wifi.known-networks.plist.

You may also provide an optional alnternative path to
com.apple.wifi.known-networks.plist.

| Param    | Type   | Description                                                           |
| -------- | ------ | --------------------------------------------------------------------- |
| alt_path | String | Optional alternative path to com.apple.wifi.known-networks.plist file |

### getSudoLogs() -> UnifiedLog[]

Parse the UnifiedLogs and extract entries related to sudo activity.

### parseBom(path) -> Bom

Parse Bill of Materials (BOM) files. BOM files are created whenever the macOS
Installer is used to install an application.\
BOM files track what files were created by the Installer. It is commonly used to
ensure files are removed when the application is uninstalled. This function will
also try to parse the plist receipt associated with the BOM file (if found in
same directory).

BOM files are located at /var/db/receipts/*.bom

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| path  | string | Path to BOM file |

### systemExtensions(alt_path) -> SystemExtension[]

Get list of macOS System Extensions. By default artemis will try to extract
installed extensions at /Library/SystemExtensions/db.plist.

However, you may also provide an optional alternative path to db.plist.

| Param    | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| alt_path | String | Optional alternative path to db.plist file |

### queryTccDb(alt_db) -> TccValues[] | MacosError

Query all TCC.db files on the system. TCC.db contains granted permissions for
applications.\
An optional path to the TCC.db can be provided. Otherwise will parse all user
and System TCC.db files.

| Param  | Type   | Description                  |
| ------ | ------ | ---------------------------- |
| alt_db | string | Optional path to TCC.db file |

### setupSpotlightParser(glob_path) -> StoreMeta | MacosError

Collect and setup the required data needed to parse the macOS Spotlight
database.\
This function must be called before a user can parse the Spotlight database
using the JS API.

The glob_path should point to the directory containing the Spotlight database
files.\
The primary Spotlight database can be found at:
/System/Volumes/Data/.Spotlight-V100/Store-V\*/\*/\*\
Would return something like:
/System/Volumes/Data/.Spotlight-V100/Store-V3/123-445566-778-12384/*

| Param     | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| glob_path | string | Glob path to a directory containing the Spotlight Database files |

### getSpotlight(meta, store_file, offset) -> StoreMeta | MacosError

Parse the macOS Spotlight database. The database can potentially return a large
amount of data (5+GBs).\
To prevent excessive memory usage, this function will parse the database in
blocks (chunks).

It will parse **10** blocks at a time before returning the results. The
`StoreMeta` value obtaind from setupSpotlightParser, contains the **TOTAL**
amount of blocks in the Spotlight database! You must loop through the blocks and
track what block offset the parser should start at!

If you want to the parser to start at the beginning of the Spotlight database,
provide an offset of zero (0). Once the parser returns data, your next offset
will now be ten (10) because it parsed **10** blocks starting at zero (0-9).

Finally, you must provide the full path to the Spotlight database file
(store.db). This is typically found in in the directory provided to
`setupSpotlightParser`\
(ex:
/System/Volumes/Data/.Spotlight-V100/Store-V3/123-445566-778-12384/store.db)

| Param      | Type      | Description                                           |
| ---------- | --------- | ----------------------------------------------------- |
| meta       | StoreMeta | Spotlight metadata obtained from setupSpotlightParser |
| store_file | string    | Full path to the store.db file                        |
| offset     | number    | Offset to start parsing the Spotlight database        |

### getXprotectDefinitions(alt_path) -> XprotectEntries[] | MacosError

Grab Xprotect definitions on macOS. By default artemis will check for
Xprotect.plist files at:

- /Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Resources/Xprotect.plist
- /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/Xprotect.plist

You may also provide an optional alternative path to the Xprotect.plist file.

| Param    | Type   | Description                          |
| -------- | ------ | ------------------------------------ |
| alt_path | string | Optional path to Xprotect.plist file |

### luluRules(alt_path) -> LuluRules | MacosError

Grab LuLu rules on macOS. By default artemis will check for rule.plist file at:

- /Library/Objective-See/LuLu/rules.plist

You may also provide an optional alternative path to the rules.plist file.

| Param    | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| alt_file | string | Optional path to rules.plist file |

### munkiApplicationUsage(db) -> MunkiApplicationUsage[] | MacosError

Grab application usage tracked by Munki on macOS. By default artemis will check
for application_usage.sqlite file at:

- /Library/Managed Installs/application_usage.sqlite

You may also provide an optional alternative path to the
application_usage.sqlite file.

| Param | Type   | Description                                    |
| ----- | ------ | ---------------------------------------------- |
| db    | string | Optional path to application_usage.sqlite file |

### quarantineEvents(alt_file) -> MacosQuarantine[] | MacosError

Grab quarantine events tracked by macOS. By default artemis will check for
quarantine events for all users file at:

- /Users/*/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV2

You may also provide an optional alternative path to the
com.apple.LaunchServices.QuarantineEventsV2 file.

| Param    | Type   | Description                                                       |
| -------- | ------ | ----------------------------------------------------------------- |
| alt_file | string | Optional path to com.apple.LaunchServices.QuarantineEventsV2 file |
