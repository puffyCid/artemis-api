import {
  Firewall,
  FirewallApplication,
  FirewallExceptions,
  Services,
} from "../../../types/macos/plist/firewall.d.ts";
import { parseAlias } from "../alias.ts";
import { parseRequirementBlob } from "../codesigning/blob.ts";
import { MacosError } from "../errors.ts";
import { getPlist } from "../plist.ts";

/**
 * Function to get the macOS Firewall status and metadata
 * @returns `Firewall` status or `MacosError`
 */
export function firewallStatus(): Firewall | MacosError {
  const path = "/Library/Preferences/com.apple.alf.plist";

  const plist_results = getPlist(path);
  if (plist_results instanceof Error) {
    return new MacosError("FIREWALL", `failed to parse plist ${plist_results}`);
  } else if (plist_results instanceof Array) {
    return new MacosError("FIREWALL", `Got array of bytes for plist`);
  }

  const results = plist_results as Record<string, string>;

  const firewall: Firewall = {
    allow_signed_enabled: !!results["allowsignedenabled"],
    firewall_unload: !!results["firewallunload"],
    logging_enabled: !!results["loggingenabled"],
    global_state: !!results["globalstate"],
    logging_option: !!results["loggingoption"],
    stealth_enabled: !!results["stealthenabled"],
    version: results["version"],
    applications: [],
    exceptions: [],
    explict_auths: [],
    services: [],
  };

  const applications: Record<string, string | Uint8Array | number>[] =
    results["applications"] as unknown as Record<
      string,
      string | Uint8Array | number
    >[];
  for (const app of applications) {
    const entry = parseApplications(app);
    firewall.applications.push(entry);
  }

  const exceptions: Record<string, string | number>[] =
    results["exceptions"] as unknown as Record<string, string | number>[];
  firewall.exceptions = getExceptions(exceptions);

  const services: Record<string, object> =
    results["firewall"] as unknown as Record<
      string,
      object
    >;
  firewall.services = getServices(services);

  const auths: Record<string, string>[] =
    results["explicitauths"] as unknown as Record<
      string,
      string
    >[];
  firewall.explict_auths = getAuths(auths);

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

/**
 * Grab macOS services associated with Firewall
 * @param services Array of service objects
 * @returns Array of `Services`
 */
function getServices(services: Record<string, object>): Services[] {
  const service_entires = [];
  for (const entry in services) {
    const state = services[entry] as Record<string, string>;

    const service: Services = {
      name: entry,
      allowed: !!state["state"],
    };

    service_entires.push(service);
  }

  return service_entires;
}

/**
 * List of applications that require explicit auths (typically native code tools)
 * @param auths List of explicit auth entries
 * @returns Array of strings
 */
function getAuths(auths: Record<string, string>[]): string[] {
  const entries = [];
  for (const auth of auths) {
    entries.push(auth["id"]);
  }
  return entries;
}
