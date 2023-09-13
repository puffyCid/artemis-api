import {
  ApplicationInfo,
  ApplicationTimeline,
  AppVfu,
  EnergyInfo,
  EnergyUsage,
  NetworkConnectivityInfo,
  NetworkInfo,
  NotificationInfo,
} from "../../types/windows/srum.d.ts";

/**
 * Function to parse and get Application info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `ApplicationInfo` entries
 */
export function getSrumApplicationInfo(path: string): ApplicationInfo[] {
  const name = "{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  const results: ApplicationInfo[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse and get Application timeline info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `ApplicationTimeline` entries
 */
export function getSrumApplicationTimeline(
  path: string,
): ApplicationTimeline[] {
  const name = "{5C8CF1C7-7257-4F13-B223-970EF5939312}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  const results: ApplicationTimeline[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse and get `AppVFU` info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `AppVfu` entries
 */
export function getSrumApplicationVfu(path: string): AppVfu[] {
  const name = "{7ACBBAA3-D029-4BE4-9A7A-0885927F1D8F}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  const results: AppVfu[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse and get `EnergyInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `EnergyInfo`
 */
export function getSrumEnergyInfo(path: string): EnergyInfo[] {
  const name = "{DA73FB89-2BEA-4DDC-86B8-6E048C6DA477}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  const results: EnergyInfo[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse `EnergyUsage` info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `EnergyUsage`
 */
export function getSrumEnergyUsage(path: string): EnergyUsage[] {
  let name = "{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  name = "{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}LT";
  //@ts-ignore: Custom Artemis function
  const data_lt: string = Deno.core.ops.get_srum(path, name);

  const results: EnergyUsage[] = JSON.parse(data);
  const srum_all = results.concat(JSON.parse(data_lt));
  return srum_all;
}

/**
 * Function to parse `NetworkInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NetworkInfo`
 */
export function getSrumNetworkInfo(path: string): NetworkInfo[] {
  const name = "{973F5D5C-1D90-4944-BE8E-24B94231A174}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  const results: NetworkInfo[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse `NetworkConnectivityInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NetworkConnectivityInfo`
 */
export function getSrumNetworkConnectivity(
  path: string,
): NetworkConnectivityInfo[] {
  const name = "{DD6636C4-8929-4683-974E-22C046A43763}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  const results: NetworkConnectivityInfo[] = JSON.parse(data);
  return results;
}

/**
 * Function to parse `NotificationInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NotificationInfo`
 */
export function getSrumNotifications(path: string): NotificationInfo[] {
  const name = "{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}";
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_srum(path, name);

  const results: NotificationInfo[] = JSON.parse(data);
  return results;
}
