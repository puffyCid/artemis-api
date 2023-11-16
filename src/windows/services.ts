import { Services } from "../../types/windows/services.d.ts";
import { WindowsError } from "./errors.ts";

/**
 * Parse Windows Services using the default systemdrive (typically C).
 * @returns Array of `Services` or `WindowsError`
 */
export function getServices(): Services[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_services();
    const services: Services[] = JSON.parse(data);
    return services;
  } catch (err) {
    return new WindowsError("SERVICES", `failed to parse services: ${err}`);
  }
}

/**
 * Parse Windows Services using an alternative dive letter
 * @param drive Alternative drive letter to use
 * @returns Array of `Services` or `WindowsError`
 */
export function getAltServices(drive: string): Services[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_services(drive);
    const services: Services[] = JSON.parse(data);
    return services;
  } catch (err) {
    return new WindowsError(
      "SERVICES",
      `failed to parse services with drive ${drive}: ${err}`,
    );
  }
}

/**
 * Parse Windows Services at provided path.
 * @param path Path to SYSTEM file
 * @returns Array of `Services` or `WindowsError`
 */
export function getServiceFile(path: string): Services[] | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_alt_services(path);
    const services: Services[] = JSON.parse(data);
    return services;
  } catch (err) {
    return new WindowsError(
      "SERVICES",
      `failed to parse services ${path}: ${err}`,
    );
  }
}
