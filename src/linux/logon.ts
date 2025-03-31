import { Logon } from "../../types/linux/logon";
import { LinuxError } from "./errors";

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
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_get_logon(path);

    return data;
  } catch (err) {
    return new LinuxError(
      "LOGON",
      `failed to parse logon file ${path}: ${err}`,
    );
  }
}
