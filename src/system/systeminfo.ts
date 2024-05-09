import { SystemInfo } from "../../types/system/systeminfo.ts";

/**
 * Function to pull systeminfo
 * @returns `SystemInfo` object
 */
export function getSysteminfo(): SystemInfo {
  //@ts-ignore: Custom Artemis function
  const data: SystemInfo = Deno.core.ops.get_systeminfo();

  return data;
}

/**
 * Function to get system uptime
 * @returns Uptime of system in seconds
 */
export function uptime(): number {
  //@ts-ignore: Custom Artemis function
  const data: number = system.uptime();
  return data;
}

/**
 * Function to get hostname of system
 * @returns Hostname of system
 */
export function hostname(): string {
  //@ts-ignore: Custom Artemis function
  const data: string = system.hostname();
  return data;
}

/**
 * Function to get OS version
 * @returns OS version of the system
 */
export function osVersion(): string {
  //@ts-ignore: Custom Artemis function
  const data: string = system.osVersion();
  return data;
}

/**
 * Function to get kernel version information
 * @returns Kernel version of the system
 */
export function kernelVersion(): string {
  //@ts-ignore: Custom Artemis function
  const data: string = system.kernelVersion();
  return data;
}

export enum PlatformType {
  Darwin,
  Windows,
  Linux,
}

/**
 * Function to get platform type of the system. Ex: `Darwin`
 * @returns Platform type of the system
 */
export function platform(): string {
  //@ts-ignore: Custom Artemis function
  const data: string = system.platform();
  return data;
}
