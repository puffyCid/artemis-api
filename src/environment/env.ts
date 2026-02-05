import { platform } from "../system/systeminfo";

/**
 * Get all Environment variables associated with artemis process
 * @returns Record<string,string> list of Environment variable values
 */
export function listEnv(): Record<string, string> {
  // @ts-expect-error: Custom Artemis function
  const data: Record<string, string> = js_env();
  return data;
}

/**
 * Get a single Environment variable value. Returns empty string if variable does not exist
 * @param key Environment variable name
 * @returns Value of the provided Environment variable name
 */
export function getEnvValue(key: string): string {
  // @ts-expect-error: Custom Artemis function
  const data: string = js_env_value(key);
  return data;
}

/**
 * Function to get the Windows SystemDrive letter
 * @returns The SystemDrive letter for Windows or empty string if called on non-Windows platforms
 */
export function getSystemDrive(): string {
  if (platform().toLowerCase().includes("windows")) {
    return "";
  }
  let drive = getEnvValue("SystemDrive");
  if (drive === "") {
    drive = "C:";
  }
  return drive;
}