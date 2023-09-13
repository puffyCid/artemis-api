import { ElfInfo } from "../../types/linux/elf.d.ts";

/**
 * Function to parse an `elf` executable.
 * @param path Full path to a `elf` file
 * @returns Basic `ElfInfo` interface or null
 */
export function getElf(path: string): ElfInfo | null {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_elf(path);
  if (data === "") {
    return null;
  }

  const elf: ElfInfo = JSON.parse(data);
  return elf;
}
