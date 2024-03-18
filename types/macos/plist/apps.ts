export interface Applications {
  filename: string;
  full_path: string;
  bundle_executable: string;
  bundle_id: string;
  bundle_name: string;
  bundle_short_version: string;
  bundle_version: string;
  display_name: string;
  copyright: string;
  /**Base64 encoded PNG file */
  icon: string;
  info: string;
}
