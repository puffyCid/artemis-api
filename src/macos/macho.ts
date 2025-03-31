import { MachoInfo } from "../../types/macos/macho";
import { MacosError } from "./errors";

/**
 * Function to parse a `macho` executable.
 * @param path Full path to a `macho` file
 * @returns Basic `MachoInfo` interface array or MacosError
 */
export function getMacho(path: string): MachoInfo[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_macho(path);
    return data;
  } catch (err) {
    return new MacosError("MACHO", `filed to parse macho file ${path}: ${err}`);
  }
}
