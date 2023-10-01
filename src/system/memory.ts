import { Memory } from "../../types/systeminfo/systeminfo.d.ts";

/**
 * Function to get memory information
 * @returns `Memory` information on the system
 */
export function memory(): Memory {
  //@ts-ignore: Custom Artemis function
  const data: string = systemInfo.memory();
  const mem: Memory = JSON.parse(data);
  return mem;
}

import { LinuxProcessInfo } from "../../types/linux/processes.d.ts";
import { MacosProcessInfo } from "../../types/macos/processes.d.ts";
import { WindowsProcessInfo } from "../../types/windows/processes.d.ts";

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
): LinuxProcessInfo[] | WindowsProcessInfo[] | MacosProcessInfo[] {
  const hashes = {
    md5,
    sha1,
    sha256,
  };
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_processes(
    JSON.stringify(hashes),
    binary,
  );
  const proc_array = JSON.parse(data);

  return proc_array;
}
