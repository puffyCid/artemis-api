import { Jumplists } from "../../types/windows/jumplists.ts";
import { WindowsError } from "./errors.ts";

/**
 * Function to parse all Jumplists for all users using `Systemdrive` (typically C)
 * @returns Array of `Jumplists` or `WindowsError`
 */
export function getJumplists(): Jumplists[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_jumplists();
    return data;
  } catch (err) {
    return new WindowsError("JUMPLIST", `failed to parse jumplists: ${err}`);
  }
}
