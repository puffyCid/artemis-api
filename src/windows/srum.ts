import {
  ApplicationInfo,
  ApplicationTimeline,
  AppVfu,
  EnergyInfo,
  EnergyUsage,
  NetworkConnectivityInfo,
  NetworkInfo,
  NotificationInfo,
} from "../../types/windows/srum";
import { WindowsError } from "./errors";

/**
 * Function to parse and get Application info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `ApplicationInfo` entries or `WindowsError`
 */
export function getSrumApplicationInfo(
  path: string,
): ApplicationInfo[] | WindowsError {
  try {
    const name = "{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    return data;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum application info ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse and get Application timeline info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `ApplicationTimeline` entries or `WindowsError`
 */
export function getSrumApplicationTimeline(
  path: string,
): ApplicationTimeline[] | WindowsError {
  try {
    const name = "{5C8CF1C7-7257-4F13-B223-970EF5939312}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    return data;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum application timeline ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse and get `AppVFU` info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `AppVfu` entries or `WindowsError`
 */
export function getSrumApplicationVfu(path: string): AppVfu[] | WindowsError {
  try {
    const name = "{7ACBBAA3-D029-4BE4-9A7A-0885927F1D8F}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    return data;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum application vfu ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse and get `EnergyInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `EnergyInfo` or `WindowsError`
 */
export function getSrumEnergyInfo(path: string): EnergyInfo[] | WindowsError {
  try {
    const name = "{DA73FB89-2BEA-4DDC-86B8-6E048C6DA477}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    return data;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum energy info ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse `EnergyUsage` info from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `EnergyUsage` or `WindowsError`
 */
export function getSrumEnergyUsage(path: string): EnergyUsage[] | WindowsError {
  try {
    let name = "{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    name = "{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}LT";
    //@ts-ignore: Custom Artemis function
    const data_lt: string = js_srum(path, name);

    const srum_all = data.concat(data_lt);
    return srum_all;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum energy usage ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse `NetworkInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NetworkInfo` or `WindowsError`
 */
export function getSrumNetworkInfo(path: string): NetworkInfo[] | WindowsError {
  try {
    const name = "{973F5D5C-1D90-4944-BE8E-24B94231A174}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    return data;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum network info ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse `NetworkConnectivityInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NetworkConnectivityInfo` or `WindowsError`
 */
export function getSrumNetworkConnectivity(
  path: string,
): NetworkConnectivityInfo[] | WindowsError {
  try {
    const name = "{DD6636C4-8929-4683-974E-22C046A43763}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    return data;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum network connectivity ${path}: ${err}`,
    );
  }
}

/**
 * Function to parse `NotificationInfo` from SRUM file
 * @param path Path to `SRUDB.dat` file
 * @returns Array of `NotificationInfo` or `WindowsError`
 */
export function getSrumNotifications(
  path: string,
): NotificationInfo[] | WindowsError {
  try {
    const name = "{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}";
    //@ts-ignore: Custom Artemis function
    const data = js_srum(path, name);

    return data;
  } catch (err) {
    return new WindowsError(
      "SRUM",
      `failed to parse srum notification ${path}: ${err}`,
    );
  }
}
