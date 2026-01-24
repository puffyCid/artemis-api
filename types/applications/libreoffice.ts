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
  message: string;
  datetime: "1970-01-01T00:00:00.000Z";
  timestamp_desc: "N/A";
  artifact: "LibreOffice Recent Files",
  data_type: "application:libreoffice:recentfiles:entry",
}
