import { Jumplists } from "../../types/windows/jumplists.d.ts";

/**
 * Function to parse all Jumplists for all users using `Systemdrive` (typically C)
 * @returns Array of `Jumplists`
 */
export function getJumplists(): Jumplists[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_jumplists();
  const jump: Jumplists[] = JSON.parse(data);

  return jump;
}

/**
 * Function to parse all Jumplists for all users on alternative drive
 * @param drive Alternative drive letter to use
 * @returns Array of `Jumplists`
 */
export function getAltJumplists(drive: string): Jumplists[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_alt_jumplists(drive);
  const jump: Jumplists[] = JSON.parse(data);

  return jump;
}

/**
 * Function to parse a single `Jumplist` file. Supports both Automatic and Custom `Jumplist` files
 * @param path Path to a single `Jumplist` file
 * @returns `Jumplists` data
 */
export function getJumplistPath(path: string): Jumplists {
  //@ts-ignore: Custom Artemis function
  const data: string = Deno.core.ops.get_jumplist_file(path);
  const jump: Jumplists = JSON.parse(data);

  return jump;
}
