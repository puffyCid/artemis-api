import { Emond } from "../../types/macos/emond.d.ts";

/**
 * Function to parse the `Emond` rules on a macOS system
 * @returns Array of `Emond` rules
 */
export function getEmond(): Emond[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_emond();

  const emond: Emond[] = JSON.parse(data);
  return emond;
}
