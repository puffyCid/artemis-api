/**
 * Basic file details from a file listing
 */
export interface FileInfo {
  /**Full path to file */
  full_path: string;
  /**Directory for file */
  directory: string;
  /**Name of file */
  filename: string;
  /**Extension of file if any */
  extension: string;
  /**Standard created timestamp of file. Its not available on Linux */
  created: string;
  /**Standard modified timestamp of file */
  modified: string;
  /**Standard changed timestamp of file. Is not available on Windows */
  changed: string;
  /**Standard accessed timestamp of file */
  accessed: string;
  /**Size of file */
  size: number;
  /**Index node associated with file. Only available on Unix like systems */
  inode: number;
  /**Mode associated with file. Only available on Unix like systems */
  mode: number;
  /**User ID associated with file. Only available on Unix like systems */
  uid: number;
  /**Group ID associated with file. Only available on Unix like systems */
  gid: number;
  /**Is a file */
  is_file: boolean;
  /**Is a directory */
  is_directory: boolean;
  /**Is a symbolic link */
  is_symlink: boolean;
}
