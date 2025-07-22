/**
 * `ShellItems` are a complex undocumented Windows format.
 * Used by several artifacts notably: `Shortcut (lnk) files, shellbags`.
 *
 * This interface is used as a high level abstraction to show the most interesting data
 *
 * References:
 *  - https://github.com/libyal/libfwsi/blob/main/documentation/Windows%20Shell%20Item%20format.asciidoc
 */
export interface ShellItems {
  /**
   * Value of a shellitem
   * Ex: A file path, URL, Volume, GUID, etc
   */
  value: string;
  /**
   * Type of shellitem
   *
   * Can be:
   *   `Directory, URI, RootFolder, Network, Volume, ControlPanel, UserPropertyView, Delegate, Variable, MTP, Unknown, History`
   *
   *  Most common is `Directory`
   */
  shell_type: string;
  /**FAT created timestamp. Only applicable for Directory `shell_type` */
  created: string;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  modified: string;
  /**FAT modified timestamp. Only applicable for Directory `shell_type` */
  accessed: string;
  /**Entry number in MFT. Only applicable for Directory `shell_type` */
  mft_entry: number;
  /**Sequence number in MFT. Only applicable for Directory `shell_type` */
  mft_sequence: number;
  /**Array of Property Stores */
  stores: Record<string, string | number | boolean | null>;
}

export interface JsShellItem {
  item: ShellItems;
  /**Remaining bytes associated with the data */
  remaining: Uint8Array;
}
