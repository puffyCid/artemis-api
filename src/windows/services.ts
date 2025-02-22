import { Services } from "../../types/windows/services.ts";
import { WindowsError } from "./errors.ts";

/**
 * Parse Windows Services using the default systemdrive (typically C).
 * @param path Optional path to Registry file
 * @returns Array of `Services` or `WindowsError`
 */
export function getServices(path?: string): Services[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_services(path);
    return data;
  } catch (err) {
    return new WindowsError("SERVICES", `failed to parse services: ${err}`);
  }
}
