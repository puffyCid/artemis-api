import { Shortcut } from "../../types/windows/shortcuts.d.ts";

/**
 * Function to parse a `Shortcut (lnk)` file
 * @param path Full path to `lnk` file
 * @returns `Shortcut (lnk) info`
 */
export function getLnkFile(path: string): Shortcut {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_lnk_file(path);

  const results: Shortcut = JSON.parse(data);

  return results;
}
