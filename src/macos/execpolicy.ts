import { ExecPolicy } from "../../types/macos/execpolicy.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `ExecPolicy` on a macOS system
 * @returns Array of `ExecPolicy` records or `MacosError`
 */
export function getExecpolicy(): ExecPolicy[] | MacosError {
  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_execpolicy();

    const policy: ExecPolicy[] = JSON.parse(data);
    return policy;
  } catch (err) {
    return new MacosError("EXECPOLICY", `failed to parse execpolicy: ${err}`);
  }
}
