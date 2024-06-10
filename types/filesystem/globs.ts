/**
 * Results from parsing a Glob patter
 */
export interface GlobInfo {
  /**Full path to file or directory */
  full_path: string;
  /**Name of file or directory */
  filename: string;
  /**Is glob result a file */
  is_file: boolean;
  /**Is glob result a directory */
  is_directory: boolean;
  /**Is glob result a symlink */
  is_symlink: boolean;
}
