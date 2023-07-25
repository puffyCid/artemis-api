import { ElfInfo } from "./elf.ts";

/**
 * `LinuxProcessInfo` is an interface containing metadata on Linux processes.
 * `artemis` uses the `sysinfo` crate to pull process information
 */
export interface LinuxProcessInfo {
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
  /**ELF metadata asssociated with process binary */
  binary_info: ElfInfo[];
}

/**
 * Function to pull a process listing from Linux
 * @param md5 MD5 hash the process binary
 * @param sha1 SHA1 hash the process binary
 * @param sha256 SHA256 hash the process binary
 * @param elf_info Parse ELF metadata from the process binary
 * @returns Array of `LinuxProcessInfo`
 */
export function getLinuxProcesses(
  md5: boolean,
  sha1: boolean,
  sha256: boolean,
  elf_info: boolean,
): LinuxProcessInfo[] {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_processes(
    hashes,
    elf_info,
  );
  const proc_array: LinuxProcessInfo[] = JSON.parse(data);

  return proc_array;
}
