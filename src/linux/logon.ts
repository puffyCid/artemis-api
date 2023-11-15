import { Logon } from "../../types/linux/logon.d.ts";

/**
 * Function to get parse a logon file
 * @param path Path to a logon file (`wtmp`, `btmp`, `utmp`)
 * @returns Array of `Logon` entries
 */
export function getLogon(path: string): Logon[] {
  if (
    !path.endsWith("btmp") && !path.endsWith("wtmp") && !path.endsWith("utmp")
  ) {
    console.error(`Provided non-logon file ${path}`);
    return [];
  }
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_logon(path);

  const journal: Logon[] = JSON.parse(data);
  return journal;
}
