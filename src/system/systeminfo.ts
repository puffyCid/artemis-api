import { SystemInfo } from "../../types/system/systeminfo";

/**
 * Function to pull systeminfo
 * @returns `SystemInfo` object
 */
export function getSysteminfo(): SystemInfo {
  // @ts-expect-error: Custom Artemis function
  const data: SystemInfo = js_get_systeminfo();

  return data;
}

/**
 * Function to get system uptime
 * @returns Uptime of system in seconds
 */
export function uptime(): number {
  // @ts-expect-error: Custom Artemis function
  const data: number = js_uptime();
  return data;
}

/**
 * Function to get hostname of system
 * @returns Hostname of system
 */
export function hostname(): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_hostname();
  return data;
}

/**
 * Function to get OS version
 * @returns OS version of the system
 */
export function osVersion(): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_osVersion();
  return data;
}

/**
 * Function to get kernel version information
 * @returns Kernel version of the system
 */
export function kernelVersion(): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_kernelVersion();
  return data;
}

export enum PlatformType {
  Darwin,
  Windows,
  Linux,
  Unknown,
}

/**
 * Function to get platform type of the js_ Ex: `Darwin`
 * @returns Platform type of the system
 */
export function platform(): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_platform();
  return data;
}

/**
 * Function to detect platform. This just calls `platform()` and maps results to 
 * `PlatformType`
 * @returns `PlatformType`
 */
export function detectPlatform(): PlatformType {
  const plat = platform().toLowerCase();
  switch (plat){
    case "windows": return PlatformType.Windows;
    case "darwin": return PlatformType.Darwin;
    case "linux": return PlatformType.Linux;
    default: return PlatformType.Unknown
  }
}