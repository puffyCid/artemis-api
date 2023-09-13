/**
 * Windows `Prefetch` data tracks execution of applications on Windows Workstations.
 * `Prefetch` is disabled on Windows Servers and may be disabled on systems with SSDs.
 *
 * Referencs:
 *  - https://github.com/libyal/libscca/blob/main/documentation/Windows%20Prefetch%20File%20(PF)%20format.asciidoc
 */
export interface Prefetch {
  /**Path to prefetch file */
  path: string;
  /**Name of executed file */
  filename: string;
  /**Prefetch hash */
  hash: string;
  /**Most recent execution timestamp in UNIXEPOCH seconds */
  last_run_time: number;
  /**Array of up to eight (8) execution timestamps in UNIXEPOCH seconds */
  all_run_times: number[];
  /**Number of executions */
  run_count: number;
  /**Size of executed file */
  size: number;
  /**Array of volume serial numbers associated with accessed files/directories */
  volume_serial: string[];
  /**Array of volume creation timestamps in UNIXEPOCH seconds associated with accessed files/directories */
  volume_creation: number[];
  /**Array of volumes associated accessed files/directories */
  volume_path: string[];
  /**Number of files accessed by executed file */
  accessed_file_count: number;
  /**Number of directories accessed by executed file */
  accessed_directories_count: number;
  /**Array of accessed files by executed file */
  accessed_files: string[];
  /**Array of accessed directories by executed file */
  accessed_directories: string[];
}
