import { Fsevents } from "../../types/macos/fsevents.d.ts";

/**
 * Function to parse the `FsEvents` on a macOS system
 * @param path Full path to a `fsevents` file
 * @returns Array of `FsEvent` records
 */
export function getFsevents(path: string): Fsevents[] | null {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_fsevents(path);
  if (data === "") {
    return null;
  }

  const fsevents: Fsevents[] = JSON.parse(data);
  return fsevents;
}
