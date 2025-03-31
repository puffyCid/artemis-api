import { ExecPolicy } from "../../types/macos/execpolicy";
import { MacosError } from "./errors";

/**
 * Function to parse the `ExecPolicy` on a macOS system
 * @param path Optional alternative path to exec policy file. If none provided will use default file
 * @returns Array of `ExecPolicy` records or `MacosError`
 */
export function getExecpolicy(path?: string): ExecPolicy[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = js_execpolicy(path);

    return data;
  } catch (err) {
    return new MacosError("EXECPOLICY", `failed to parse execpolicy: ${err}`);
  }
}
