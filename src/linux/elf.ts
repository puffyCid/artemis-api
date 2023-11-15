import { ElfInfo } from "../../types/linux/elf.d.ts";
import { LinuxError } from "./errors.ts";

/**
 * Function to parse an `elf` executable.
 * @param path Full path to a `elf` file
 * @returns Basic `ElfInfo` interface or LinuxError
 */
export function getElf(path: string): ElfInfo | LinuxError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_elf(path);
    const elf: ElfInfo = JSON.parse(data);
    return elf;
  } catch (err) {
    return new LinuxError("ELF", `failed to parse elf ${path}: ${err}`);
  }
}
