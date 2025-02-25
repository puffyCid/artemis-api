import { ElfInfo } from "../linux/elf.ts";
import { MachoInfo } from "../macos/macho.ts";
import { PeInfo } from "../windows/pe.ts";

/**
 * `ProcessInfo` is an interface containing metadata on system processes.
 */
export interface ProcessInfo {
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
  start_time: string;
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
  /**Binary metadata associated with process binary */
  binary_info: PeInfo | MachoInfo[] | ElfInfo | null;
}
