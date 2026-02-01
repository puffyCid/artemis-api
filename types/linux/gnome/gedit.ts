/**
 * Recent Files opened by gedit
 */
export interface RecentFiles {
  /**Path to file */
  path: string;
  /**Last accessed */
  accessed: string;
  /**Path to `gedit-metdata.xml` */
  gedit_source: string;
  message: string;
  datetime: string;
  timestamp_desc: "Last Accessed";
  artifact: "Gedit";
  data_type: "linux:gedit:entry",
}
