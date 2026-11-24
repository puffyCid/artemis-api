import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { PasswordPolicy } from "../../../types/macos/plist/policies";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Get Password Policies on macOS. Will parse plist file at `/var/db/dslocal/nodes/Default/config/shadowhash.plist`
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`
 * @param alt_path Optional alternative path to `shadowhash.plist` file
 * @returns Array of `PasswordPolicy` or `MacosError`
 */
export function passwordPolicy(
  protocol = AccessorProtocol.Host,
  alt_path?: string,
): PasswordPolicy[] | MacosError {
  const path = alt_path ?? "/var/db/dslocal/nodes/Default/config/shadowhash.plist";
  const accessor = new Accessor();

  const matches = accessor.globfs(path, protocol);
  if (matches instanceof FileError) {
    return new MacosError(`POLICY`, `failed to glob for ${path}: ${matches}`);
  }
  const policies: PasswordPolicy[] = [];
  for (const entry of matches) {
    if (entry.meta.kind !== EntryKind.File) {
      continue;
    }

    const bytes = accessor.readFileHandle(entry.handle as FileHandle);
    if (bytes instanceof FileError) {
      console.warn(`Failed to read ${entry.meta.display_path}: ${bytes}`);
      continue;
    }

    const data = getPlist(bytes);
    if (data instanceof MacosError) {
      console.warn(`Failed to parse ${entry.meta.display_path}: ${data}`);
      continue;
    }

    const policy = data as Record<string, object>;

    // An array of embedded plist files
    const policy_entries = policy["accountPolicyData"] as number[][];
    for (const entry of policy_entries) {
      const result = getPlist(Uint8Array.from(entry));
      if (
        result instanceof MacosError || result instanceof Uint8Array
      ) {
        console.error(`Could not get embedded policy ${result}`);
        continue;
      }

      const pass_data = result as Record<string, object>;
      const pass_policies = pass_data["policies"] as Record<string, object>;
      for (
        const policy_entry
        of pass_policies["policyCategoryPasswordContent"] as Record<
          string,
          object | string
        >[]
      ) {
        const policy_description =
          policy_entry["policyContentDescription"] as Record<string, string>;
          
        const pass_policy: PasswordPolicy = {
          policy_id: policy_entry["policyIdentifier"] as string,
          policy_content: policy_entry["policyContent"] as string,
          policy_description: policy_description["en"] ?? "",
        };

        policies.push(pass_policy);
      }
    }
  }
  return policies;
}
