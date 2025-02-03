export interface ManifestPlist {
  /**Key used to help decrypt encrypted backups */
  BackupKeyBag: number[];
  Version: string;
  /**YYYY-MM-DDTHH:mm:ss.SSSZ */
  Date: string;
  WasPasscodeSet: boolean;
  Lockdown: Lockdown;
  Applications: Record<string, AppBundle>;
  IsEncrypted: boolean;
}

interface Lockdown {
  "com.apple.MobileDeviceCrashCopy": unknown;
  "com.apple.TerminalFlashr": unknown;
  "com.apple.mobile.data_sync": {
    Bookmarks: SyncData;
    Contacts: SyncData;
    Calendars: SyncData;
    Notes: SyncData;
  };
  "com.apple.Accessibility": {
    MonoAudioEnabledByiTunes: boolean;
    VoiceOverTouchEnabledByiTunes: boolean;
    ClosedCaptioningEnabledByiTunes: boolean;
    SpeakAutoCorrectionsEnabledByiTunes: boolean;
    InvertDisplayEnabledByiTunes: boolean;
    ZoomTouchEnabledByiTunes: boolean;
  };
  ProductVersion: string;
  ProductType: string;
  BuildVersion: string;
  "com.apple.mobile.iTunes.accessories": unknown;
  "com.apple.mobile.wireless_lockdown": unknown;
  UniqueDeviceID: string;
  SerialNumber: string;
  DeviceName: string;
}

interface SyncData {
  AccountNames: string[];
  Sources: string[];
}

interface AppBundle {
  CFBundleIdentifier: string;
  Path: string;
  ContainerContentClass: string;
}

/**
 * Info related to how many AppDomains are in the Manifest.db Files table
 * Excludes AppDomainGroups and AppDomainPlugins
 */
export interface ManifestDomainStats {
  /**Name of the AppDomain. Ex: `SysSharedContainerDomain-systemgroup.com.apple.osanalytics` or `WirelessDomain` */
  domain: string;
  /**How many rows associated with that domain */
  count: number;
  /**Bundle app namespace. Ex: `com.apple.akd` or `jp.pokemon.pokemonhome` or `WirelessDomain`*/
  namespace: string;
}

/**
 * Manifest metadata associated with App domain
 */
export interface ManifestApp {
  /**Name of the AppDomain. Ex: `SysSharedContainerDomain-systemgroup.com.apple.osanalytics` or `WirelessDomain` */
  domain: string;
  /**Bundle app namespace. Ex: `com.apple.akd` or `jp.pokemon.pokemonhome` or `WirelessDomain`*/
  namespace: string;
  /**What the un-hashed file path should be */
  hash_path: string;
  relativePath: string;
  flags: number;
  file_type: FileType;
  /**Base64 binary plist */
  file: string;
  /**FileID file hash name */
  fileID: string;
  /**Directory name where the `fileID` is located */
  directory: string;
  /**If domain is a plugin */
  is_plugin: boolean;
  /**If domain is a group */
  is_group: boolean;
}

/**
 * Determines what the relativePath is
 */
export enum FileType {
  IsFile = "IsFile",
  IsDirectory = "IsDirectory",
  IsSymlink = "IsSymlink",
  Unknown = "Unknown",
}

export interface FileMetadata {
  modified: string;
  flags: number;
  extended_attributes: number;
  group_id: number;
  changed: string;
  created: string;
  relative_path: number;
  size: number;
  inode: number;
  mode: number;
  user_id: number;
  path: string;
}
