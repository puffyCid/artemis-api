import { MacosError } from "./errors.ts";

/**
 * Function to parse a `plist` file. This function either returns a `plist` as a JSON struct
 * or MacosError
 * @param path Full path to a `plist` file or the raw bytes of `plist`
 * @returns `plist` data represented as a JSON object or raw bytes or `MacosError`
 */
export function getPlist(
  path: string | Uint8Array,
): Record<string, unknown> | Uint8Array | MacosError {
  // Parse bytes containing plist data
  if (path instanceof Uint8Array) {
    try {
      //@ts-ignore: Custom Artemis function
      const data = Deno.core.ops.get_plist_data(path);
      const plist_data: Record<string, unknown> | Uint8Array = JSON.parse(data);
      return plist_data;
    } catch (err) {
      return new MacosError("PLIST", `failed to parse plist bytes: ${err}`);
    }
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_plist(path);
    const plist_data: Record<string, unknown> | Uint8Array = JSON.parse(data);
    return plist_data;
  } catch (err) {
    return new MacosError("PLIST", `failed to parse plist ${path}: ${err}`);
  }
}
