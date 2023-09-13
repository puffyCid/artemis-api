import { PeInfo } from "./pe.d.ts";

/**
 * `WindowsFileInfo` is an interface containing metadata on Windows files and directories.
 * `Artemis` uses the `walkdir` crate to walk the file system.
 * It does not parse the raw NTFS
 */
export interface WindowsFileInfo {
  /**Full path to file or directory */
  full_path: string;
  /**Directory path */
  directory: string;
  /**Filename */
  filename: string;
  /**Extension of file if any */
  extension: string;
  /**Created timestamp in UNIXEPOCH seconds */
  created: number;
  /**Modified timestamp in UNIXEPOCH seconds */
  modified: number;
  /**Changed timestamp in UNIXEPOCH seconds */
  changed: number;
  /**Accessed timestamp in UNIXEPOCH seconds */
  accessed: number;
  /**Size of file in bytes */
  size: number;
  /**Inode associated with entry */
  inode: number;
  /**Mode of file entry */
  mode: number;
  /**User ID associated with file */
  uid: number;
  /**Group ID associated with file */
  gid: number;
  /**MD5 of file */
  md5: string;
  /**SHA1 of file */
  sha1: string;
  /**SHA256 of file */
  sha256: string;
  /**Is the entry a file */
  is_file: boolean;
  /**Is the entry a directory */
  is_directory: boolean;
  /**Is the entry a symbolic links */
  is_symlink: boolean;
  /**Depth the file from provided start point */
  depth: number;
  /**PE binary metadata */
  binary_info: PeInfo[];
}
