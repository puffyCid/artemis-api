import { WindowsError } from "./errors.ts";

/**
 * Function to read a file by accessing the raw `NTFS` filesystem.
 * This function can be used to read locked files.
 * It currently reads the whole file into memory!
 * Use with **CAUTION**
 * @param path Full path to file to read
 * @returns Bytes read or `WindowsError`
 */
export function readRawFile(path: string): Uint8Array | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: Uint8Array = Deno.core.ops.read_raw_file(path);
    return data;
  } catch (err) {
    return new WindowsError("NTFS", `failed to read file ${path}: ${err}`);
  }
}

/**
 * Function to read an `Alternative data stream (ADS)`.
 * This function has a data size limit of 2GB. It will not read ADS data greater than 2GBs.
 * It will skip sparse data when reading the ADS data
 * Supports resident and non-resident ADS data
 * @param path Full path to file
 * @param ads_name Name of `Alternative data stream (ADS)` to read
 * @returns Bytes read or `WindowsError`
 */
export function readAdsData(
  path: string,
  ads_name: string,
): Uint8Array | WindowsError {
  try {
    //@ts-ignore: Custom Artemis function
    const data: Uint8Array = Deno.core.ops.read_ads_data(
      path,
      ads_name,
    );

    return data;
  } catch (err) {
    return new WindowsError(
      "NTFS",
      `failed to read ADS ${ads_name} at file ${path}: ${err}`,
    );
  }
}
