import { MacosError } from "../errors.ts";
import {
  AuthValue,
  ClientType,
  Reason,
  TccData,
  TccValues,
} from "../../../types/macos/sqlite/tcc.ts";
import { glob } from "../../filesystem/files.ts";
import { FileError } from "../../filesystem/errors.ts";
import { querySqlite } from "../../applications/sqlite.ts";
import { ApplicationError } from "../../applications/errors.ts";
import { SingleRequirement } from "../../../types/macos/codesigning.ts";
import { decode } from "../../encoding/base64.ts";
import { EncodingError } from "../../encoding/errors.ts";
import { parseRequirementBlob } from "../codesigning/blob.ts";
import { SigningError } from "../codesigning/errors.ts";
import { unixEpochToISO } from "../../time/conversion.ts";

/**
 * Query all `TCC.db` files on the system. `TCC.db` contains granted permissions for applications.
 * An optional path to the `TCC.db` can be provided.
 * Otherwise will parse all user and System `TCC.db` files.
 * @param alt_db Optional alternative path to TCC.db files
 * @returns Array of `TccValues` or `MacosError`
 */
export function queryTccDb(alt_db?: string): TccValues[] | MacosError {
  let dbs: string[] = [];
  if (alt_db != undefined) {
    dbs = [alt_db];
  } else {
    // Glob for all users TCC.db files
    const user_tcc = glob(
      "/Users/*/Library/Application Support/com.apple.TCC/TCC.db",
    );
    if (user_tcc instanceof FileError) {
      return new MacosError(
        "TCC",
        `failed to glob user TCC.db files ${user_tcc}`,
      );
    }
    // Only one (1) System TCC.db file
    dbs.push("/Library/Application Support/com.apple.TCC/TCC.db");
    for (const entry of user_tcc) {
      dbs.push(entry.full_path);
    }
  }

  const query = "select * from access";
  const tcc_data: TccValues[] = [];
  for (const entry of dbs) {
    const results = querySqlite(entry, query);
    if (results instanceof ApplicationError) {
      return new MacosError("TCC", `failed to query ${entry}: ${results}`);
    }

    tcc_data.push(getTccData(results, entry));
  }

  return tcc_data;
}

/**
 * Extract the data from the `TCC.db` file
 * @param data Array of sqlite data from `TCC.db` file
 * @param path path to the `TCC.db` file
 * @returns `TccValues` data from `TCC.db` file
 */
function getTccData(data: Record<string, unknown>[], path: string): TccValues {
  const tcc_array: TccData[] = [];
  for (const entry of data) {
    const tcc_data: TccData = {
      service: entry["service"] as string,
      client: entry["client"] as string,
      client_type: clientType(entry["client_type"] as number),
      auth_value: authValue(entry["auth_value"] as number),
      auth_reason: authReason(entry["auth_reason"] as number),
      auth_version: entry["auth_version"] as number,
      cert: undefined,
      policy_id: entry["policy_id"] as number | undefined,
      indirect_object_identifier_type:
        entry["indirect_object_identifier_type"] as number | undefined,
      indirect_object_identifier: entry["indirect_object_identifier"] as string,
      indirect_object_code_identity: undefined,
      flags: entry["flags"] as number | undefined,
      last_modified: unixEpochToISO(entry["last_modified"] as number),
      pid: entry["pid"] as number | null,
      pid_version: entry["pid_version"] as number | null,
      boot_uuid: entry["boot_uuid"] as string,
      last_reminded: unixEpochToISO(entry["last_reminded"] as number),
    };

    if (entry["csreq"] != undefined) {
      const cert_info = extractCertBlob(entry["csreq"] as string);
      if (!(cert_info instanceof MacosError)) {
        tcc_data.cert = cert_info;
      }
    }
    if (entry["indirect_object_code_identity"] != undefined) {
      const id_info = extractCertBlob(
        entry["indirect_object_code_identity"] as string,
      );
      if (!(id_info instanceof MacosError)) {
        tcc_data.indirect_object_code_identity = id_info;
      }
    }

    tcc_array.push(tcc_data);
  }

  const tcc_value: TccValues = {
    db_path: path,
    data: tcc_array,
  };

  return tcc_value;
}

/**
 * Parse cert data
 * @param data Base64 Requirement blob
 * @returns `SingleRequirement` data or `MacosError`
 */
function extractCertBlob(data: string): SingleRequirement | MacosError {
  const cert_bytes = decode(data);
  if (cert_bytes instanceof EncodingError) {
    console.error(`Could not decode cert info ${cert_bytes}`);
    return new MacosError("TCC", `failed to decode cert info: ${cert_bytes}`);
  }

  const cert = parseRequirementBlob(cert_bytes);
  if (cert instanceof SigningError) {
    console.error(`Could not parse cert info: ${cert}`);
    return new MacosError("TCC", `failed to parse cert info: ${cert}`);
  }

  return cert;
}

/**
 * Determine reason for permission granted
 * @param reason Reason integer data
 * @returns `Reason` enum value
 */
function authReason(reason: number): Reason {
  switch (reason) {
    case 1:
      return Reason.Entitled;
    case 2:
      return Reason.UserConsent;
    case 3:
      return Reason.UserSet;
    case 4:
      return Reason.SystemSet;
    case 5:
      return Reason.ServicePolicy;
    case 6:
      return Reason.MDMPolicy;
    case 7:
      return Reason.OverridePolicy;
    case 8:
      return Reason.MissingUsageString;
    case 9:
      return Reason.PromptTimeout;
    case 10:
      return Reason.PreflightUnknown;
    case 11:
      return Reason.Entitled;
    case 12:
      return Reason.AppTypePolicy;
    default:
      return Reason.Unknown;
  }
}

/**
 * Determine client type for application
 * @param client Client integer data
 * @returns `ClientType` enum value
 */
function clientType(client: number): ClientType {
  switch (client) {
    case 0:
      return ClientType.BundleId;
    case 1:
      return ClientType.AbsolutePath;
    default:
      return ClientType.Unknown;
  }
}

/**
 * Determine response to permission request
 * @param value Value integer data
 * @returns `AuthValue` enum value
 */
function authValue(value: number): AuthValue {
  switch (value) {
    case 0:
      return AuthValue.Denied;
    case 2:
      return AuthValue.Allowed;
    case 3:
      return AuthValue.Limited;
    default:
      return AuthValue.Unknown;
  }
}
