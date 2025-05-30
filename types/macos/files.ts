import { MachoInfo } from "./macho";

/**
 * `MacosFileInfo` is an interface containing metadata on macOS files and directories.
 * `artemis` uses the `walkdir` crate to walk the file system.
 * It does not parse the raw APFS.
 */
export interface MacosFileInfo {
  /**Full path to file or directory */
  full_path: string;
  /**Directory path */
  directory: string;
  /**Filename */
  filename: string;
  /**Extension of file if any */
  extension: string;
  /**Created timestamp */
  created: string;
  /**Modified timestamp */
  modified: string;
  /**Changed timestamp */
  changed: string;
  /**Accessed timestamp */
  accessed: string;
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
  /**MACHO binary metadata */
  binary_info: MachoInfo[];
}
