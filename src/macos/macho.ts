import { MachoInfo } from "../../types/macos/macho.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse a `macho` executable.
 * @param path Full path to a `macho` file
 * @returns Basic `MachoInfo` interface array or MacosError
 */
export function getMacho(path: string): MachoInfo[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_macho(path);
    const macho: MachoInfo[] = JSON.parse(data);
    return macho;
  } catch (err) {
    return new MacosError("MACHO", `filed to parse macho file ${path}: ${err}`);
  }
}
