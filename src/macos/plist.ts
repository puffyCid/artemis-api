/**
 * Function to parse a `plist` file. This function either returns a `plist` as a JSON struct
 * or null
 * @param path Full path to a `plist` file
 * @returns `plist` data represented as a JSON object or an object representing an error
 */
export function getPlist(path: string): Record<string, unknown> | null {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_plist(path);
  if (data === "") {
    return null;
  }

  const plist_data: Record<string, unknown> = JSON.parse(data);
  return plist_data;
}
