import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { SingleRequirement } from "../../../types/macos/codesigning";
import { Authorizations } from "../../../types/macos/sqlite/authd";
import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { cocoatimeToIso } from "../../time/conversion";
import { parseRequirementBlob } from "../codesigning/blob";
import { SigningError } from "../codesigning/errors";
import { MacosError } from "../errors";

/**
 * Function to parse the macOS auth.db database
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param offset Offset for the auth.db sqlite database. Default is 0.
 * @param limit How many rows to return. Default is 100
 * @param alt_path Optional alternative path to the auth.db file
 * @returns Array of `Authorizations` or `MacosError`
 */
export function authorizations(protocol = AccessorProtocol.Host, offset = 0, limit = 100, alt_path?: string): Authorizations[] | MacosError {
    const path = alt_path ?? "/private/var/db/auth.db";
    const query = `SELECT id, name, type, class, 'group', kofn, timeout, flags, tries, version, created, modified, hash, identifier, requirement, comment FROM rules LIMIT ${limit} OFFSET ${offset}`;

    const accessor = new Accessor();
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new MacosError(`AUTHORIZATIONS`, `failed to glob for '${path}': ${matches}`);
    }
    const values: Authorizations[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        let results;
        if (protocol === AccessorProtocol.Host) {
            results = querySqlite(path, query);
        } else {
            const client = new Sqlite(entry.handle as FileHandle);
            results = client.query(query);
        }

        if (results instanceof ApplicationError) {
            continue;
        }

        for (const value of results) {
            const blob = value[ "requirement" ];
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
            const auth: Authorizations = {
                id: value[ "id" ] as number,
                name: value[ "name" ] as string,
                type: value[ "type" ] as number,
                class: value[ "class" ] as number ?? 0,
                group: value[ "name" ] as string ?? "",
                kofn: value[ "kofn" ] as number ?? 0,
                timeout: value[ "timeout" ] as number ?? 0,
                flags: value[ "flags" ] as number ?? 0,
                tries: value[ "tries" ] as number ?? 0,
                created: cocoatimeToIso(value[ "created" ] as number),
                modified: cocoatimeToIso(value[ "modified" ] as number),
                version: value[ "version" ] as number,
                hash: value[ "hash" ] as string ?? "",
                identifier: value[ "identifier" ] as string ?? "",
                requirement,
                comment: value[ "comment" ] as string ?? "",
                message: value[ "name" ] as string,
                datetime: cocoatimeToIso(value[ "created" ] as number),
                timestamp_desc: "Authorization Entry Created",
                artifact: "macOS Authorization Database",
                data_type: "macos:sqlite:authorization:entry",
                evidence: entry.meta.display_path,
            };

            if (value.created === value.modified) {
                value.timestamp_desc = "Authorization Entry Created Modified";
                values.push(auth);
                continue;
            }

            values.push(auth);
            const mod_value = Object.assign({}, auth);
            mod_value.timestamp_desc = "Authorization Entry Modified";
            mod_value.datetime = mod_value.modified;

            values.push(mod_value);
        }
    }

    return values;
}