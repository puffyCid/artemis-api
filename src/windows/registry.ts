import { Registry, SecurityKey } from "../../types/windows/registry";
import { WindowsError } from "./errors";

/**
 * Function to parse a `Registry` file
 * @param path Full path to a `Registry` file
 * @returns `Registry` array or `WindowsError`
 */
export function getRegistry(path: string): Registry[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_registry(path);

    return data;
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
    const data = js_sk_info(path, offset);

    return data;
  } catch (err) {
    return new WindowsError("REGISTRY", `failed to parse security key: ${err}`);
  }
}
