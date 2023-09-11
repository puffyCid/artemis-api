import {
  Firewall,
  FirewallApplication,
  FirewallExceptions,
} from "../../types/macos/firewall.d.ts";
import { parseAlias } from "./alias.ts";
import { parseRequirementBlob } from "./codesigning/blob.ts";
import { getPlist } from "./plist.ts";

/**
 * Function to get the macOS Firewall status and metadata
 * @returns Firewall status or error
 */
export function firewallStatus(): Firewall | Error {
  const path = "/Library/Preferences/com.apple.alf.plist";

  const results = getPlist(path);
  if (results instanceof Error) {
    return results;
  } else if (results instanceof Array) {
    return new Error("Got raw bytes at root of Firewall this is unexpected");
  }

  const firewall: Firewall = {
    allow_signed_enabled: !!results["allowsignedenabled"],
    firewall_unload: !!results["firewallunload"],
    logging_enabled: !!results["loggingenabled"],
    global_state: !!results["globalstate"],
    logging_option: !!results["loggingoption"],
    stealth_enabled: !!results["stealthenabled"],
    version: results["version"] as string,
    applications: [],
    exceptions: [],
    explict_auths: results["explicitauths"] as string[],
  };

  const applications: Record<string, string | Uint8Array | number>[] =
    results["applications"] as Record<string, string | Uint8Array | number>[];
  for (const app of applications) {
    const entry = parseApplications(app);
    firewall.applications.push(entry);
  }

  const exceptions: Record<string, string | number>[] =
    results["exceptions"] as Record<string, string | number>[];
  firewall.exceptions = getExceptions(exceptions);

  return firewall;
}

/**
 * Parse the application metadata in the Firewall plist
 * @param app JSON object representing application info related to the Firewall
 * @returns Firewall metadata related to the application
 */
function parseApplications(
  app: Record<string, string | Uint8Array | number>,
): FirewallApplication {
  const firewall: FirewallApplication = {
    code_signing: {
      identifier: "",
      team_id: "",
      cdhash: "",
    },
    application_info: {
      kind: "",
      volume_name: "",
      volume_created: 0,
      filesystem_type: 0,
      disk_type: 0,
      cnid: 0,
      target_name: "",
      target_cnid: 0,
      target_created: 0,
      target_creator_code: 0,
      target_type_code: 0,
      number_directory_levels_from_alias_to_root: 0,
      number_directory_levels_from_root_to_target: 0,
      volume_attributes: 0,
      volume_filesystem_id: 0,
      tags: {
        carbon_paths: [],
        paths: [],
      },
    },
    block_incoming: false,
  };

  // First get code signing data
  if (typeof (app["reqdata"]) === "object") {
    const app_data = Uint8Array.from(app["reqdata"]);
    const single_requirement = parseRequirementBlob(app_data);

    if (single_requirement instanceof Error) {
      console.error(
        `Failed to get CodeSigning info for Firewall Application ${single_requirement}`,
      );
    } else {
      firewall.code_signing = single_requirement;
    }
  }

  // Now get Application info which is an embedded plist
  if (typeof (app["alias"]) === "object") {
    const raw_plist = Uint8Array.from(app["alias"]);
    // Parse the embedded plist
    const embedded_plist = getPlist(raw_plist);
    if (embedded_plist instanceof Error) {
      return firewall;
    }

    // If we have the raw bytes, now parse the `alias` info
    if (embedded_plist instanceof Array) {
      const raw_bytes = Uint8Array.from(embedded_plist);
      const alias_result = parseAlias(raw_bytes);
      if (alias_result instanceof Error) {
        console.error(
          `Failed to get alias application info for Firewall Application ${alias_result}`,
        );
      } else {
        firewall.application_info = alias_result;
      }
    }
  }

  // Last part is state of Firewall for application
  if (typeof (app["state"]) === "number") {
    firewall.block_incoming = !!app["state"];
  }

  return firewall;
}

/**
 * Grab the firewall exceptions. Typically macOS builtin apps
 * @param exceptions Array of exceptions JSON objects
 * @returns Array of Firewall exceptions
 */
function getExceptions(
  exceptions: Record<string, string | number>[],
): FirewallExceptions[] {
  const results = [];

  for (const entry of exceptions) {
    const path = entry["path"] as string;
    const state = entry["state"] as number;

    const except: FirewallExceptions = {
      path,
      state,
    };

    results.push(except);
  }

  return results;
}
