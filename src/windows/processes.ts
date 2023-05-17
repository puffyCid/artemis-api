import { PeInfo } from "./pe.ts";

/**
 * `WindowsProcessInfo` is an interface containing metadata on Windows processes.
 * `artemis` uses the `sysinfo` crate to pull process information.
 */
export interface WindowsProcessInfo {
  /**Full path to the process binary */
  full_path: string;
  /**Name of process */
  name: string;
  /**Path to process binary */
  path: string;
  /** Process ID */
  pid: number;
  /** Parent Process ID */
  ppid: number;
  /**Environment variables associated with process */
  environment: string;
  /**Status of the process */
  status: string;
  /**Process arguments */
  arguments: string;
  /**Process memory usage */
  memory_usage: number;
  /**Process virtual memory usage */
  virtual_memory_usage: number;
  /**Process start time in UNIXEPOCH seconds*/
  start_time: number;
  /** User ID associated with process */
  uid: string;
  /**Group ID associated with process */
  gid: string;
  /**MD5 hash of process binary */
  md5: string;
  /**SHA1 hash of process binary */
  sha1: string;
  /**SHA256 hash of process binary */
  sha256: string;
  /**PE metadata asssociated with process binary */
  binary_info: PeInfo[];
}

/**
 * Function to pull a process listing from Windows
 * @param md5 MD5 hash the process binary
 * @param sha1 SHA1 hash the process binary
 * @param sha256 SHA256 hash the process binary
 * @param pe_info Parse PE metadata from the process binary
 * @returns Array of `WindowsProcessInfo`
 */
export function get_win_processes(
  md5: boolean,
  sha1: boolean,
  sha256: boolean,
  pe_info: boolean,
): WindowsProcessInfo[] {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  const data = Deno[ Deno.internal ].core.ops.get_processes(
    JSON.stringify(hashes),
    pe_info,
  );
  const proc_array: WindowsProcessInfo[] = JSON.parse(data);

  return proc_array;
}
