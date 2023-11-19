import { Logon } from "../../types/linux/logon.d.ts";
import { LinuxError } from "./errors.ts";

/**
 * Function to get parse a logon file
 * @param path Path to a logon file (`wtmp`, `btmp`, `utmp`)
 * @returns Array of `Logon` entries
 */
export function getLogon(path: string): Logon[] | LinuxError {
  if (
    !path.endsWith("btmp") && !path.endsWith("wtmp") && !path.endsWith("utmp")
  ) {
    return new LinuxError("LOGON", `provided non-logon file ${path}`);
  }
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_logon(path);

  const journal: Logon[] = JSON.parse(data);
  return journal;
}
