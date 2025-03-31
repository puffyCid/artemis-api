import { Spotlight, StoreMeta } from "../../types/macos/spotlight";
import { MacosError } from "./errors";

/**
 * Function to obtain the metadata to start parsing the Spotlight database.
 * @param glob_path A glob path to the directory containing the Spotlight files (ex: `/tmp/*`)
 * @returns `StoreMeta` or `MacosError`
 */
export function setupSpotlightParser(
  glob_path: string,
): StoreMeta | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_setup_spotlight_parser(glob_path);
    return data;
  } catch (err) {
    return new MacosError(
      "SPOTLIGHT",
      `failed to setup spotlight parser for ${glob_path}: ${err}`,
    );
  }
}

/**
 * Function to parse the Spotlight database. Since the database can potentially return GBs of data, we must parse the database in chunks (blocks).
 *
 * This function will parse ten (10) blocks at a time before returning the data.
 * These blocks are found in the `StoreMeta.blocks` array. The `offset` parameter can be used to tell artemis what block to start parsing.
 *
 * An `offset` value of zero (0) means to start at the first block. An `offset` value of ten (10) means to start at the tenth block
 * @param meta The `StoreMeta` data obtained from `setup_spotlight_parser`
 * @param store_file Full path to the `store.db` file. This is typically in the directory provided to `setup_spotlight_parser`
 * @param offset Offset to start parsing the Spotlight database blocks in the `StoreMeta`
 * @returns Array of `Spotlight` entries or `MacosError`
 */
export function getSpotlight(
  meta: StoreMeta,
  store_file: string,
  offset: number,
): Spotlight[] | MacosError {
  if (offset < 0) {
    return new MacosError(`SPOTLIGHT`, `provided negative offset.`);
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data = js_spotlight(
      store_file,
      meta,
      offset,
    );
    return data;
  } catch (err) {
    return new MacosError(
      "SPOTLIGHT",
      `failed to get spotlight entries for ${store_file}: ${err}`,
    );
  }
}
