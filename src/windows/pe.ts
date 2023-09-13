import { PeInfo } from "../../types/windows/pe.d.ts";

/**
 * Function to parse a `pe` executable.
 * @param path Full path to a `pe` file
 * @returns Basic `PeInfo` interface or null
 */
export function getPe(path: string): PeInfo | null {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_pe(path);
  if (data === "") {
    return null;
  }

  const result: PeInfo = JSON.parse(data);
  return result;
}
