/**
 * Windows `Recycle Bin` files contain metadata about "deleted" files
 * Currently artemis parses the `$I Recycle Bin` files using the std API
 *
 * References:
 *   - https://github.com/libyal/dtformats/blob/main/documentation/Windows%20Recycle.Bin%20file%20formats.asciidoc
 *   - https://cybersecurity.att.com/blogs/security-essentials/digital-dumpster-diving-exploring-the-intricacies-of-recycle-bin-forensics
 */
export interface RecycleBin {
  /**Size of deleted file */
  size: number;
  /**Deleted timestamp of file in UNIXEPOCH seconds */
  deleted: number;
  /**Name of deleted file */
  filename: string;
  /**Full path to the deleted file */
  full_path: string;
  /**Directory associated with deleted file */
  directory: string;
  /**SID associated with the deleted file */
  sid: string;
  /**Path to the file in the Recycle Bin */
  recycle_path: string;
}
