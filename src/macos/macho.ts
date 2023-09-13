import { MachoInfo } from "../../types/macos/macho.d.ts";

/**
 * Function to parse a `macho` executable.
 * @param path Full path to a `macho` file
 * @returns Basic `MachoInfo` interface array or null
 */
export function getMacho(path: string): MachoInfo[] | null {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_macho(path);
  if (data === "") {
    return null;
  }

  const macho: MachoInfo[] = JSON.parse(data);
  return macho;
}
