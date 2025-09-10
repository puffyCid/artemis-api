import { SingleRequirement } from "../../../types/macos/codesigning";
import { Authorizations } from "../../../types/macos/sqlite/authd";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { cocoatimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { parseRequirementBlob } from "../codesigning/blob";
import { SigningError } from "../codesigning/errors";
import { MacosError } from "../errors";

/**
 * Function to parse the macOS auth.db database
 * @param offset Offset for the auth.db sqlite database. Default is 0.
 * @param limit How many rows to return. Default is 100
 * @param alt_path Optional alternative path to the auth.db file
 * @returns Array of `Authorizations` or `MacosError`
 */
export function authorizations(offset = 0, limit = 100, alt_path?: string): Authorizations[] | MacosError {
    let path = "/private/var/db/auth.db";
    if (alt_path !== undefined) {
        path = alt_path;
    }
    const query = `SELECT id, name, type, class, 'group', kofn, timeout, flags, tries, version, created, modified, hash, identifier, requirement, comment FROM rules LIMIT ${limit} OFFSET ${offset};`
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new MacosError(`AUTHORIZATIONS`, `failed to query ${path}: ${results}`);
    }

    const values: Authorizations[] = [];
    for (const entry of results) {
        const blob = entry["requirement"];
        let requirement: string | SingleRequirement = "";
        if (typeof blob === 'string') {
            const bytes = decode(blob);
            if (!(bytes instanceof EncodingError)) {
                const result = parseRequirementBlob(bytes);
                if (!(result instanceof SigningError)) {
                    requirement = result;
                }

            }
        }
        const value: Authorizations = {
            id: entry["id"] as number,
            name: entry["name"] as string,
            type: entry["type"] as number,
            class: entry["class"] as number ?? 0,
            group: entry["name"] as string ?? "",
            kofn: entry["kofn"] as number ?? 0,
            timeout: entry["timeout"] as number ?? 0,
            flags: entry["flags"] as number ?? 0,
            tries: entry["tries"] as number ?? 0,
            created: unixEpochToISO(cocoatimeToUnixEpoch(entry["created"] as number)),
            modified: unixEpochToISO(cocoatimeToUnixEpoch(entry["modified"] as number)),
            version: entry["version"] as number,
            hash: entry["hash"] as string ?? "",
            identifier: entry["identifier"] as string ?? "",
            requirement,
            comment: entry["comment"] as string ?? "",
            message: entry["name"] as string,
            datetime: unixEpochToISO(cocoatimeToUnixEpoch(entry["created"] as number)),
            timestamp_desc: "Authorization Entry Created",
            artifact: "macOS Authorization Database",
            data_type: "macos:sqlite:authorization:entry"
        };
        if (value.created === value.modified) {
            value.timestamp_desc = "Authorization Entry Created Modified";
            values.push(value);
            continue;
        }
        values.push(value);
        const mod_value = Object.assign({}, value);
        mod_value.timestamp_desc = "Authorization Entry Modified";
        mod_value.datetime = mod_value.modified;
        values.push(mod_value);
    }

    return values;
}