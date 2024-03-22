import { Emond } from "../../types/macos/emond.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `Emond` rules on a macOS system
 * @param path Optional alternative path to emond directory. If none provided will use default path
 * @returns Array of `Emond` rules or `MacosError`
 */
export function getEmond(path?: string): Emond[] | MacosError {
  let emond_path = "";
  if (path != undefined) {
    emond_path = path;
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_emond(emond_path);

    const emond: Emond[] = JSON.parse(data);
    return emond;
  } catch (err) {
    return new MacosError("EMOND", `failed to parse emond: ${err}`);
  }
}
