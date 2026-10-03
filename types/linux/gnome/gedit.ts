/**
 * Recent Files opened by gedit
 */
export interface RecentFiles {
  /**Path to file */
  path: string;
  /**Last accessed */
  accessed: string;
  /**Path to `gedit-metadata.xml` */
  evidence: string;
  message: string;
  datetime: string;
  timestamp_desc: "Last Accessed";
  artifact: "Gedit";
  data_type: "linux:gedit:entry",
}

export interface RawGeditRecentFiles {
  metadata: {
    document: RawGeditRecentFilesDocument | RawGeditRecentFilesDocument[];
  };
}

interface RawGeditRecentFilesDocument {
  "@uri": string;
  "@atime": string;
}