---
description: Bookmark data on macOS
keywords:
  - macOS
  - binary
---

# Bookmarks

macOS `Bookmark` data is similar to Windows `Shortcut` artifacts. It points to
another file on the system. Bookmark data is sometimes found in plist files.
Example artifacts include:

- LoginItems
- Office MRU files

# Collection

You have to use the artemis [api](../../API/overview.md) in order to parse
`Bookmark` data.

# Sample API Script

```typescript
import { parseBookmark } from "./artemis-api/src/macos/bookmark.ts";
function main() {
  // Need to obtain Bookmark bytes from another file. Plist files may have bookmark data.
  const results = parseBookmark(new Uint8Array());
  console.log(results);
}
```

# Output Structure

A `BookmarkData` object structure

```typescript
export interface BookmarkData {
  /**Path to file */
  path: string;
  /**Path represented as Catalog Node ID */
  cnid_path: string;
  /**Created timestamp of target file  */
  created: string;
  /**Path to the volume of target file */
  volume_path: string;
  /**Target file URL type */
  volume_url: string;
  /**Name of volume target file is on */
  volume_name: string;
  /**Volume UUID */
  volume_uuid: string;
  /**Size of target volume in bytes */
  volume_size: number;
  /**Created timestamp of volume */
  volume_created: string;
  /**Volume Property flags */
  volume_flags: VolumeFlags[];
  /**Flag if volume if the root filesystem */
  volume_root: boolean;
  /**Localized name of target file */
  localized_name: string;
  /**Read-Write security extension of target file */
  security_extension_rw: string;
  /**Read-Only security extension of target file */
  security_extension_ro: string;
  /**File property flags */
  target_flags: TargetFlags[];
  /**Username associated with `Bookmark` */
  username: string;
  /**Folder index number associated with target file */
  folder_index: number;
  /**UID associated with `Bookmark` */
  uid: number;
  /**`Bookmark` creation flags */
  creation_options: CreationFlags[];
  /**Is target file executable */
  is_executable: boolean;
  /**Does target file have file reference flag */
  file_ref_flag: boolean;
}

export enum TargetFlags {
  RegularFile = "RegularFile",
  Directory = "Directory",
  SymbolicLink = "SymbolicLink",
  Volume = "Volume",
  Package = "Package",
  SystemImmutable = "SystemImmutable",
  UserImmutable = "UserImmutable",
  Hidden = "Hidden",
  HasHiddenExtension = "HasHiddenExtension",
  Application = "Application",
  Compressed = "Compressed",
  CanSetHiddenExtension = "CanSetHiddenExtension",
  Readable = "Readable",
  Writable = "Writable",
  Executable = "Executable",
  AliasFile = "AliasFile",
  MountTrigger = "MountTrigger",
}

export enum CreationFlags {
  MinimalBookmark = "MinimalBookmark",
  SuitableBookmark = "SuitableBookmark",
  SecurityScope = "SecurityScope",
  SecurityScopeAllowOnlyReadAccess = "SecurityScopeAllowOnlyReadAccess",
  WithoutImplicitSecurityScope = "WithoutImplicitSecurityScope",
  PreferFileIDResolutionMask = "PreferFileIDResolutionMask",
}

export enum VolumeFlags {
  Local = "Local",
  Automount = "Automount",
  DontBrowse = "DontBrowse",
  ReadOnly = "ReadOnly",
  Quarantined = "Quarantined",
  Ejectable = "Ejectable",
  Removable = "Removable",
  Internal = "Internal",
  External = "External",
  DiskImage = "DiskImage",
  FileVault = "FileVault",
  LocaliDiskMirror = "LocaliDiskMirror",
  Ipod = "Ipod",
  Idisk = "Idisk",
  Cd = "Cd",
  Dvd = "Dvd",
  DeviceFileSystem = "DeviceFileSystem",
  TimeMachine = "TimeMachine",
  Airport = "Airport",
  VideoDisk = "VideoDisk",
  DvdVideo = "DvdVideo",
  BdVideo = "BdVideo",
  MobileTimeMachine = "MobileTimeMachine",
  NetworkOptical = "NetworkOptical",
  BeingRepaired = "BeingRepaired",
  Unmounted = "Unmounted",
  SupportsPersistentIds = "SupportsPersistentIds",
  SupportsSearchFs = "SupportsSearchFs",
  SupportsExchange = "SupportsExchange",
  SupportsSymbolicLinks = "SupportsSymbolicLinks",
  SupportsDenyModes = "SupportsDenyModes",
  SupportsCopyFile = "SupportsCopyFile",
  SupportsReadDirAttr = "SupportsReadDirAttr",
  SupportsJournaling = "SupportsJournaling",
  SupportsRename = "SupportsRename",
  SupportsFastStatFs = "SupportsFastStatFs",
  SupportsCaseSensitiveNames = "SupportsCaseSensitiveNames",
  SupportsCasePreservedNames = "SupportsCasePreservedNames",
  SupportsFlock = "SupportsFlock",
  SupportsNoRootDirectoryTimes = "SupportsNoRootDirectoryTimes",
  SupportsExtendedSecurity = "SupportsExtendedSecurity",
  Supports2TbFileSize = "Supports2TbFileSize",
  SupportsHardLinks = "SupportsHardLinks",
  SupportsMandatoryByteRangeLocks = "SupportsMandatoryByteRangeLocks",
  SupportsPathFromId = "SupportsPathFromId",
  Journaling = "Journaling",
  SupportsSparseFiles = "SupportsSparseFiles",
  SupportsZeroRunes = "SupportsZeroRunes",
  SupportsVolumeSizes = "SupportsVolumeSizes",
  SupportsRemoteEvents = "SupportsRemoteEvents",
  SupportsHiddenFiles = "SupportsHiddenFiles",
  SupportsDecmpFsCompression = "SupportsDecmpFsCompression",
  Has64BitObjectIds = "Has64BitObjectIds",
  PropertyFlagsAll = "PropertyFlagsAll",
}
```
