/**
 * Get all Environment variables associated with artemis process
 * @returns Record<string,string> list of Environment variable values
 */
export function listEnv(): Record<string, string> {
  //@ts-ignore: Custom Artemis function
  const data: Record<string, string> = js_env();
  return data;
}

/**
 * Get a single Environment variable value. Returns empty string if variable does not exist
 * @param key Environnment variable name
 * @returns Value of the provided Environment variable name
 */
export function getEnvValue(key: string): string {
  //@ts-ignore: Custom Artemis function
  const data: string = js_env_value(key);
  return data;
}
