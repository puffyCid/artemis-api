import { Jumplists } from "../../types/windows/jumplists";
import { WindowsError } from "./errors";

/**
 * Function to parse all Jumplists for all users using the `Systemdrive` (typically C)
 * @param path Optional path to a Jumplist file
 * @returns Array of `Jumplists` or `WindowsError`
 */
export function getJumplists(path?: string): Jumplists[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_jumplists(path);
    return data;
  } catch (err) {
    return new WindowsError("JUMPLIST", `failed to parse jumplists: ${err}`);
  }
}
