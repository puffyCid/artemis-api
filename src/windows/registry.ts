import { Registry, SecurityKey } from "../../types/windows/registry.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse a `Registry` file
 * @param path Full path to a `Registry` file
 * @returns Array of `Registry` entries or `WindowsError`
 */
export function getRegistry(path: string): Registry[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: string = Deno.core.ops.get_registry(path);

    const results: Registry[] = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError(
      "REGISTRY",
      `failed to parse registry file ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse Security Key information
 * @param path Path to the Registry file to parse
 * @param offset Offset to Security Key to lookupSecurityKey
 * @returns `SecurityKey` object data or `WindowsError`
 */
export function lookupSecurityKey(
  path: string,
  offset: number,
): SecurityKey | WindowsError {
  if (offset <= 0) {
    return new WindowsError("REGISTRY", "Cannot use negative offset or zero!");
  }
  try {
    //@ts-ignore: Custom Artemis function
    const data: string = Deno.core.ops.get_sk_info(path, offset);

    const results: SecurityKey = JSON.parse(data);
    return results;
  } catch (err) {
    return new WindowsError("REGISTRY", `failed to parse security key: ${err}`);
  }
}
