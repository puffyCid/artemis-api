/**
 * macOS `Alias` is data that points to a file on the system.
 * They are similar to Windows Shortcut (LNK) files. This data is often found in plist files
 *
 * The `Alias` format has been replaced with `Bookmark` format for most macOS software.
 * But some older plist files may still use it. Ex: Firewall plist
 *
 * References:
 *  - https://mac-alias.readthedocs.io/en/latest/alias_fmt.html
 */
export interface Alias {
  kind: string;
  volume_name: string;
  volume_created: number;
  filesystem_type: number;
  disk_type: number;
  cnid: number;
  target_name: string;
  target_cnid: number;
  target_created: number;
  target_creator_code: number;
  target_type_code: number;
  number_directory_levels_from_alias_to_root: number;
  number_directory_levels_from_root_to_target: number;
  volume_attributes: number;
  volume_filesystem_id: number;
  tags: AliasTags;
}

export interface AliasTags {
  carbon_paths: string[];
  paths: string[];
}
