import { Memory } from "../../types/system/systeminfo";
import { ProcessInfo } from "../../types/system/processes";
import { Connection } from "../../types/system/connections";

/**
 * Function to get memory information
 * @returns `Memory` information on the system
 */
export function memory(): Memory {
  // @ts-expect-error: Custom Artemis function
  const data: Memory = js_memory();
  return data;
}

/**
 * Function to pull a process listing from system
 * @param md5 MD5 hash the process binary. Default is false
 * @param sha1 SHA1 hash the process binary. Default is false
 * @param sha256 SHA256 hash the process binary. Default is false
 * @param binary Parse binary metadata from the process. Default is false
 * @returns Array of `LinuxProcessInfo` or `WindowsProcessInfo` or `MacosProcessInfo`
 */
export function processListing(
  md5 = false,
  sha1 = false,
  sha256 = false,
  binary = false,
): ProcessInfo[] {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  // @ts-expect-error: Custom Artemis function
  const data: ProcessInfo[] = js_get_processes(
    hashes,
    binary,
  );

  return data;
}

/**
 * Function to get list of network connections from system
 * @returns Array of `Connection`
 */
export function connections(): Connection[] {
  // @ts-expect-error: Custom Artemis function
  const data: Connection[] = js_connections();

  return data;
}