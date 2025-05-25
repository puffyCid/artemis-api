---
description: Interact with Linux Artifacts
---

# Linux

These functions can be used to pull data related to Linux artifacts

### getLogon(path) -> Logon[] | LinuxError

Parse a single logon related file. The path needs to end with one of the
following:

1. wtmp
2. btmp
3. utmp

| Param | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| path  | string | Path to wtmp, utmp, or btmp file |

### getElf(path) -> ElfInfo | LinuxError

Parse an ELF executable file.

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| path  | string | Path to ELF file |

### getJournal(path) -> Journal[] | LinuxError

Parse a systemd [Journal](../../Artifacts/Linux%20Artifacts/journals.md) file.

:::info

This function is for convenience. It will parse the entire Journal file before
returning data. The larger the file the more memory artemis will require.

You may want to consider using a
[filter script](../../Intro/Scripting/filterscripts.md) if you are concerned
about memory usage.

By default Journal file max size is 128 MB (compressed!). Once uncompressed you
could see memory usage around ~2-4GBs

:::

| Param | Type   | Description          |
| ----- | ------ | -------------------- |
| path  | string | Path to Journal file |

### getDebInfo(alt_path) -> DebPackages[] | LinuxError

Get list of installed deb packages on the system. Can provide an alternative
path to the dpkg status.

Uses /var/lib/dpkg/status by default

| Param    | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| alt_path | string | Alt path to dpkg status file |

### getSudoLogs() -> Journal[]

Parse the Journal files and extract entries related to sudo activity.

### getRpmInfo(offset, limit, path) -> RpmPackages[] | LinuxError

Get list of installed rpm packages on the system. May provide an alternative
full path to the rpmdb.sqlite file.

You must provided an offset and the amount of packages to query from the
database.

:::info

This function only supports parsing the sqlite database for RPM packages.\
Modern versions of RPM use sqlite to store package info. However, older versions
used the Berkley database.

For example, Fedora 33 switched over to the sqlite format (released 2020-10-27)\
Therefore versions older than Fedora 33 would not be supported by this function
because they are still using the Berkley database!

:::

On Fedora based distributions the sqlite file should be located at
/var/lib/rpm/rpmdb.sqlite

| Param    | Type   | Description                                                                |
| -------- | ------ | -------------------------------------------------------------------------- |
| offset   | number | Query offset to start at. 0 will start at the first package inthe database |
| limit    | number | How many packages to query                                                 |
| alt_path | string | Optional path to the rpmdb.sqlite file                                     |

### getGnomeExtensions(alt_path) -> Extension[] | LinuxError

Get list of installed GNOME Shell extensions. Can provide an optional
alternative path to a metadata.json file.

Parses user and sytem installed extensions by default

| Param    | Type   | Description                    |
| -------- | ------ | ------------------------------ |
| alt_path | string | Alt path to metadata.json file |

### gnomeAppUsage(alt_path) -> AppUsage[] | LinuxError

Parse recently used GNOME applications.

| Param    | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| alt_path | string | Alt path to application_state file |

### geditRecentFiles(alt_path) -> RecentFiles[] | LinuxError

Parse recently opened files by gedit.

| Param    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| alt_path | string | Alt path to gedit-metadata.xml file |

### parseGvfs(alt_path) -> GvfsEntry[] | LinuxError

Parse GVFS metadata files. By default artemis will parse all GVFS metadata files
for all users.

| Param    | Type   | Description                                        |
| -------- | ------ | -------------------------------------------------- |
| alt_path | string | Alt path to GVFS metadata file. Can also be a glob |

### listSnaps() -> Record&lt;string, SnapState&gt; | LinuxError

Get a list of all installed Snap packages

### extractAbrt(alt_dir) -> Abrt[] | LinuxError

Extract abrt metadata about application crashes. You may provide an optional alternative directory containing abrt related files.

By default all abrt crashes are parsed. Root access is required to access abrt related fiels

| Param    | Type   | Description                                        |
| -------- | ------ | -------------------------------------------------- |
| alt_dir  | string | Alt path to abrt crash directory                   |

### Epiphany Browser Class

A basic class to extract data from the Epiphany browser. You may optionally enable Unfold URL parsing (default is disabled) and provide an alternative glob to the base Epiphany directory.

#### history() -> EpiphanyHistory[]

Extract URL history from Epiphany

#### cookies() -> EpiphanyCookies[]

Extract Cookies from Epiphany

#### permissions() -> EpiphanyPermissions[]

Extract website permissions from Epiphany

#### lastPrint() -> EpiphanyPrint[]

Extract last printed page from Epiphany

#### sessions() -> Record&lt;string, SnapState&gt;[]

Extract last session(s) from Epiphany