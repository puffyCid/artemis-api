import { ExecPolicy } from "../../types/macos/execpolicy.d.ts";
import { MacosError } from "./errors.ts";

/**
 * Function to parse the `ExecPolicy` on a macOS system
 * @param path Optional alternative path to exec policy file. If none provided will use default file
 * @returns Array of `ExecPolicy` records or `MacosError`
 */
export function getExecpolicy(path?: string): ExecPolicy[] | MacosError {
  let policy_path = "/var/db/SystemPolicyConfiguration/ExecPolicy";
  if (path != undefined) {
    policy_path = path;
  }

  try {
    //@ts-ignore: Custom Artemis function
    const data = Deno.core.ops.get_execpolicy(policy_path);

    const policy: ExecPolicy[] = JSON.parse(data);
    return policy;
  } catch (err) {
    return new MacosError("EXECPOLICY", `failed to parse execpolicy: ${err}`);
  }
}
