import { Emond } from "../../types/macos/emond.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `Emond` rules on a macOS system
 * @returns Array of `Emond` rules or `MacosError`
 */
export function getEmond(): Emond[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_emond();

    const emond: Emond[] = JSON.parse(data);
    return emond;
  } catch (err) {
    return new MacosError("EMOND", `failed to parse emond: ${err}`);
  }
}
