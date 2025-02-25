import {
  GatekeeperEntries,
  GkType,
} from "../../../types/macos/sqlite/gatekeeper.ts";
import { ApplicationError } from "../../applications/errors.ts";
import { querySqlite } from "../../applications/sqlite.ts";
import { decode } from "../../encoding/base64.ts";
import { EncodingError } from "../../encoding/errors.ts";
import { bytesToHexString } from "../../encoding/strings.ts";
import { julianToUnixEpoch, unixEpochToISO } from "../../time/conversion.ts";
import { MacosError } from "../errors.ts";

/**
 * Function to extract Gatekeeper entries
 * @param db Optional path to the Gatekeeper SystemPolicy database
 * @returns Array of `GatekeeperEntries` or `MacosError`
 */
export function gatekeeperEntries(
  db = "/var/db/SystemPolicy",
): GatekeeperEntries[] | MacosError {
  const query =
    "select o_state.expiration, o_state.label as object_state_label, o_state.path, o_state.ctime as object_state_ctime, auth.id, o_state.requirement, auth.version, auth.type, auth.allow, auth.disabled, auth.expires, auth.label, auth.filter_unsigned, auth.ctime, auth.mtime, auth.user, auth.remarks, obj.hash, obj.expires as object_expires, obj.path as object_path, obj.ctime as object_ctime, obj.mtime as object_mtime from authority as auth left join  object_state as o_state on auth.id = o_state.authority left join object as obj on o_state.id = obj.id";
  const results = querySqlite(db, query);
  if (results instanceof ApplicationError) {
    return new MacosError(
      `GAKTKEEPER`,
      `failed to query ${db}: ${results}`,
    );
  }

  const entries: GatekeeperEntries[] = [];

  for (const value of results) {
    const entry: GatekeeperEntries = {
      id: value["id"] as number,
      version: value["version"] as number,
      type: getGkType(value["type"] as number),
      allow: !!(value["allow"] as number),
      disabled: !!(value["disabled"] as number),
      expires: unixEpochToISO(
        julianToUnixEpoch(value["expires"] as number),
      ),
      entry_created: unixEpochToISO(
        julianToUnixEpoch(value["ctime"] as number),
      ),
      entry_modified: unixEpochToISO(
        julianToUnixEpoch(value["mtime"] as number),
      ),
      user: value["user"] as string,
      remarks: value["remakrs"] as string,
      requirement: value["requirement"] as string,
      filter_unsigned: value["filter_unsigned"] as string,
      label: value["label"] as string,
      hash: extractHash(value["hash"] as string),
      path: value["path"] as string,
      object_ctime: value["object_ctime"]
        ? unixEpochToISO(
          julianToUnixEpoch(value["object_ctime"] as number),
        )
        : undefined,
      object_expires: value["object_expires"]
        ? unixEpochToISO(
          julianToUnixEpoch(value["object_expires"] as number),
        )
        : undefined,
      object_mtime: value["object_mtime"]
        ? unixEpochToISO(
          julianToUnixEpoch(value["object_mtime"] as number),
        )
        : undefined,
      object_path: value["object_path"] as string,
      object_state_ctime: value["object_state_ctime"]
        ? unixEpochToISO(
          julianToUnixEpoch(value["object_state_ctime"] as number),
        )
        : undefined,
      object_state_label: value["object_state_label"] as string,
      expiration: value["expiration"] as string,
    };

    entries.push(entry);
  }

  return entries;
}

/**
 * Function to determine Gatekeeper entry type
 * @param value Gatekeeper type as number
 * @returns `GkType` enum
 */
function getGkType(value: number): GkType {
  switch (value) {
    case 1:
      return GkType.EXECUTE;
    case 2:
      return GkType.INSTALL;
    case 3:
      return GkType.DOCUMENT;
    default:
      return GkType.UNKNOWN;
  }
}

/**
 * Function to decode hash from Gatekeeper entry
 * @param value Base64 hash
 * @returns hash string
 */
function extractHash(value: string): string {
  const data = decode(value);
  if (data instanceof EncodingError) {
    return value;
  }

  return bytesToHexString(data);
}
