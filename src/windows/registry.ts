import { Registry, SecurityKey } from "../../types/windows/registry.d.ts";

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

/**
 * Function to parse Security Key information
 * @param path Path to the Registry file to parse
 * @param offset Offset to Security Key to lookupSecurityKey
 * @returns `SecurityKey` object data
 */
export function lookupSecurityKey(
  path: string,
  offset: number,
): SecurityKey | Error {
  if (offset <= 0) {
    return new Error("Cannot use negative offset or zero!");
  }
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_sk_info(path, offset);

  const results: SecurityKey = JSON.parse(data);
  return results;
}
