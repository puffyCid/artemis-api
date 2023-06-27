import { MachoInfo } from "./macho.ts";

/**
 * `MacosProcessInfo` is an interface containing metadata on Windows processes.
 * `artemis` uses the `sysinfo` crate to pull process information
 */
export interface MacosProcessInfo {
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
  /**Process start time */
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
  /**MACHO metadata asssociated with process binary */
  binary_info: MachoInfo[];
}

/**
 * Function to pull a process listing from Windows
 * @param md5 MD5 hash the process binary
 * @param sha1 SHA1 hash the process binary
 * @param sha256 SHA256 hash the process binary
 * @param macho_info Parse MACHO metadata from the process binary
 * @returns Array of `MacosProcessInfo`
 */
export function get_mac_processes(
  md5: boolean,
  sha1: boolean,
  sha256: boolean,
  macho_info: boolean,
): MacosProcessInfo[] {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  const data = Deno[Deno.internal].core.ops.get_processes(
    hashes,
    macho_info,
  );
  const proc_array: MacosProcessInfo[] = JSON.parse(data);

  return proc_array;
}
