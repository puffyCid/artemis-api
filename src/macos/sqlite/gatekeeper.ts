import {
  GatekeeperEntries,
  GkType,
} from "../../../types/macos/sqlite/gatekeeper";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { bytesToHexString } from "../../encoding/strings";
import { julianToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { MacosError } from "../errors";

/**
 * Function to extract Gatekeeper entries
 * @param db Optional path to the Gatekeeper SystemPolicy database
 * @returns Array of `GatekeeperEntries` or `MacosError`
 */
export function gatekeeperEntries(
  db?: string,
): GatekeeperEntries[] | MacosError {
  let db_paths = ["/var/db/SystemPolicyConfiguration/SystemPolicy", "/var/db/SystemPolicy"];
  if (db !== undefined) {
    db_paths = [db];
  }
  const query =
    "SELECT o_state.expiration, o_state.label AS object_state_label, o_state.path, o_state.ctime AS object_state_ctime, auth.id, o_state.requirement, auth.version, auth.type, auth.allow, auth.disabled, auth.expires, auth.label, auth.filter_unsigned, auth.ctime, auth.mtime, auth.user, auth.remarks, obj.hash, obj.expires AS object_expires, obj.path AS object_path, obj.ctime AS object_ctime, obj.mtime AS object_mtime FROM authority AS auth left join  object_state AS o_state on auth.id = o_state.authority LEFT JOIN object AS obj ON o_state.id = obj.id";
  const entries: GatekeeperEntries[] = [];

  for (const db_path of db_paths) {
    const results = querySqlite(db_path, query);
    if (results instanceof ApplicationError) {
      console.warn(`Could not query gatekeeper db at ${db_path}: ${results}`)
      continue;
    }


    for (const value of results) {
      const entry: GatekeeperEntries = {
        id: value["id"] as number,
        version: value["version"] as number,
        type: getGkType(value["type"] as number),
        allow: !!(value["allow"] as number),
        disabled: !!(value["disabled"] as number),
        expires: unixEpochToISO(
          julianToUnixEpoch(value["expires"] as number)
        ),
        entry_created: unixEpochToISO(
          julianToUnixEpoch(value["ctime"] as number)
        ),
        entry_modified: unixEpochToISO(
          julianToUnixEpoch(value["mtime"] as number)
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
            julianToUnixEpoch(value["object_ctime"] as number)
          )
          : undefined,
        object_expires: value["object_expires"]
          ? unixEpochToISO(
            julianToUnixEpoch(value["object_expires"] as number)
          )
          : undefined,
        object_mtime: value["object_mtime"]
          ? unixEpochToISO(
            julianToUnixEpoch(value["object_mtime"] as number)
          )
          : undefined,
        object_path: value["object_path"] as string,
        object_state_ctime: value["object_state_ctime"]
          ? unixEpochToISO(
            julianToUnixEpoch(value["object_state_ctime"] as number)
          )
          : undefined,
        object_state_label: value["object_state_label"] as string,
        expiration: value["expiration"] as string,
        message: `Gatekeeper entry type '${getGkType(value["type"] as number)}'`,
        datetime: unixEpochToISO(
          julianToUnixEpoch(value["ctime"] as number)
        ),
        timestamp_desc: "Entry Created",
        artifact: "Gatekeeper",
        data_type: "macos:gatekeeper:entry",
        source: db_path,
      };

      entries.push(entry);
    }
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
