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
  /**Standard created timestamp of file in UNIXEPOCH seconds. Its not available on Linux */
  created: number;
  /**Standard modified timestamp of file in UNIXEPOCH seconds */
  modified: number;
  /**Standard changed timestamp of file in UNIXEPOCH seconds. Is not available on Windows */
  changed: number;
  /**Standard accessed timestamp of file in UNIXEPOCH seconds */
  accessed: number;
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

/**
 * Read a provided directory and get list of files
 * @param path Directory to read
 * @returns An array of files with basic metadata
 */
export async function readDir(path: string): Promise<FileInfo[]> {
  //@ts-ignore: Custom Artemis function
  const data: FileInfo[] = await fs.readDir(path);

  return data;
}
