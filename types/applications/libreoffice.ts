/**
 * List of files opened by LibreOffice
 */
export interface RecentFilesLibreOffice {
  /**Path to file */
  path: string;
  /**Document title */
  title: string;
  /**Filter for file */
  filter: string;
  /**If file is pinned */
  pinned: boolean;
  /**If file is password protected */
  password: string;
  /**If file is marked readonly */
  readonly: boolean;
  /**Base64 encoded thumbnail of file */
  thumbnail: string;
  /**Path to registrymodifications.xcu */
  source: string;
}
