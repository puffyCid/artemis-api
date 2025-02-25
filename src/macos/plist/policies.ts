import { PasswordPolicy } from "../../../types/macos/plist/policies.ts";
import { MacosError } from "../errors.ts";
import { getPlist } from "../plist.ts";

/**
 * Get Password Policies on macOS. Will parse plist file at `/var/db/dslocal/nodes/Default/config/shadowhash.plist`
 * @returns Array of `PasswordPolicy` or `MacosError`
 */
export function passwordPolicy(
  alt_path?: string,
): PasswordPolicy[] | MacosError {
  let path = "/var/db/dslocal/nodes/Default/config/shadowhash.plist";
  if (alt_path != undefined) {
    path = alt_path;
  }

  const policy_data = getPlist(path);
  if (policy_data instanceof MacosError) {
    return policy_data;
  } else if (policy_data instanceof Array) {
    return new MacosError(
      "POLICY",
      "Got raw bytes at root of PasswordPolicy this is unexpected",
    );
  }
  const policies: PasswordPolicy[] = [];
  const policy = policy_data as Record<string, object>;

  // An array of embedded plist files
  const policy_entries = policy["accountPolicyData"] as number[][];
  for (const entry of policy_entries) {
    const result = getPlist(Uint8Array.from(entry));
    if (
      policy_data instanceof MacosError || policy_data instanceof Uint8Array
    ) {
      console.error(`Could not get embedded policy ${policy_data}`);
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
        policy_description: policy_description["en"],
      };
      policies.push(pass_policy);
    }
  }

  return policies;
}
