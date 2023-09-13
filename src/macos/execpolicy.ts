import { ExecPolicy } from "../../types/macos/execpolicy.d.ts";

/**
 * Function to parse the `ExecPolicy` on a macOS system
 * @returns Array of `ExecPolicy` records
 */
export function getExecpolicy(): ExecPolicy[] {
  //@ts-ignore: Custom Artemis function
  const data = Deno.core.ops.get_execpolicy();

  const policy: ExecPolicy[] = JSON.parse(data);
  return policy;
}
