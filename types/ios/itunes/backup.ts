import { AppMetadata } from "./metadata.ts";

/**
 * Metadata about the iTunes backup
 */
export interface InfoPlist {
  /**Installed App Info */
  Applications: Record<string, AppInfo>;
  /**Device Build version */
  "Build Version": string;
  /**Name of the device */
  "Device Name": string;
  /**Display name of the device */
  "Display Name": string;
  GUID: string;
  "Installed Applications": string[];
  /**YYYY-MM-DDTHH:mm:ssZ */
  "Last Backup Date": string;
  "Product Name": string;
  "Product Type": string;
  "Serial Number": string;
  "Target Identifier": string;
  "Target Device": string;
  "Unique Identifier": string;
  /**Metadata about device used to make backup */
  "iTunes Files": ItunesFiles;
  "iTunes Settings": unknown;
  "macOS Build Version"?: string;
  "macOS Version"?: string;
}

/**
 * Metadata associated with installed apps
 */
interface AppInfo {
  /**DRM (yuck) info from AppStore*/
  ApplicationSINF: number[];
  /**App Icon */
  PlaceholderIcon: number[];
  /**Embedded Binary Plist. Can be parsed with `parseAppItunesMetadata` to `AppMetadata` */
  iTunesMetadata: number[] | AppMetadata;
}

/**
 * Metadata about device used to make backup
 */
interface ItunesFiles {
  /**Unknown, seems to be related device account info? */
  "IC-Info.sidv": number[];
  /**XML Plist */
  "VoiceMemos.plist": number[];
  /**FRPD file. seems to be associated with the device that performed the backup */
  iTunesPrefs: number[];
  /**Plist containing iTune preferences. Also contains copy of FRPD file found in `iTunesPrefs` */
  "iTunesPrefs.plist": number[];
}

/**
 * Metadata about the status of the backup
 */
export interface StatusPlist {
  IsFullBackup: boolean;
  Version: string;
  UUID: string;
  /**YYYY-MM-DDTHH:mm:ss.SSS */
  Date: string;
  BackupState: string;
  SnapshotState: string;
}
