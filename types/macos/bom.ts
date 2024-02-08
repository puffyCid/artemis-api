export interface Bom {
  package_name: string;
  install_data: string;
  package_id: string;
  package_version: string;
  install_process_name: string;
  install_prefix_path: string;
  path: string;
  /**Path to BOM file */
  bom_path: string;
  files: BomFiles[];
}

/**
 * Bill of Materials (BOM) data
 */
export interface BomFiles {
  /**User ID. Often blank */
  uid: number;
  /**Group ID. Often blank */
  gid: number;
  /**File permissions as decimal value */
  mode: number;
  /**File size */
  size: number;
  /**Path to file */
  path: string;
  /**Modified timestamp of file in UNIXEPOCH seconds */
  modified: number;
  /**CRC-32 checksum for file */
  checksum: string;
}
