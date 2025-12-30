export interface SystemStats {
      /**Path stats file */
      source_path: string;
      /**Stats Filename */
      source_file: string
      /**Stats version */
      version: string;
      message: string;
      datetime: string;
      timestamp_desc: "Stats Event";
      artifact: "SystemStats";
      data_type: "macos:systemstats:entry";
      build_version: string;
}