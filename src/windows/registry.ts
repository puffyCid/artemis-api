import { Registry } from "../../types/windows/registry.d.ts";

/**
 * Function to parse a `Registry` file
 * @param path Full path to a `Registry` file
 * @returns Array of `Registry` entries
 */
export function getRegistry(path: string): Registry[] {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_registry(path);

  const results: Registry[] = JSON.parse(data);
  return results;
}
