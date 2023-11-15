import { Services } from "../../types/windows/services.d.ts";

/**
 * Parse Windows Services using the default systemdrive (typically C).
 * @returns Array of `Services` or `WindowsError`
 */
export function getServices(): Services[] | Error {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_services();
  const services: Services[] | Error = JSON.parse(data);

  return services;
}

/**
 * Parse Windows Services using an alternative dive letter
 * @param drive Alternative drive letter to use
 * @returns Array of `Services` or `WindowsError`
 */
export function getAltServices(drive: string): Services[] | Error {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_services(drive);
  const services: Services[] | Error = JSON.parse(data);

  return services;
}

/**
 * Parse Windows Services at provided path.
 * @param path Path to SYSTEM file
 * @returns Array of `Services` or `WindowsError`
 */
export function getServiceFile(path: string): Services[] | Error {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_alt_services(path);
  const services: Services[] | Error = JSON.parse(data);

  return services;
}
