import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { Pkg } from "../../types/freebsd/packages";
import { ApplicationError } from "../applications/errors";
import { querySqlite, Sqlite } from "../applications/sqlite";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { unixEpochToISO } from "../time/conversion";
import { FreebsdError } from "./error";

/**
 * Function to get installed pkgs.
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param offset What offset to start the query at
 * @param limit How many packages to return
 * @param alt_path Optional path to the sqlite database. Will default to `/var/db/pkg/local.sqlite`
 * @returns Array of `Pkg` or `FreebsdError`
 */
export function getPkgs(protocol = AccessorProtocol.Host, offset: number, limit: number, alt_path?: string): Pkg[] | FreebsdError {
    const query = `SELECT * FROM packages LIMIT ${limit} OFFSET ${offset}`;
    const path = alt_path ?? "/var/db/pkg/local.sqlite";

    const accessor = new Accessor();
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new FreebsdError(`PKG`, `failed to glob for '${path}': ${matches}`);
    }

    const pkg_entries: Pkg[] = [];
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

        for (const values of results) {
            const pkg_entry: Pkg = {
                id: values[ "id" ] as number,
                origin: values[ "origin" ] as string,
                name: values[ "name" ] as string,
                version: values[ "version" ] as string,
                comment: values[ "comment" ] as string,
                desc: values[ "desc" ] as string,
                mtree_id: values[ "mtree_id" ] as number | null,
                pkg_message: values[ "message" ] as string | null,
                arch: values[ "arch" ] as string,
                maintainer: values[ "maintainer" ] as string,
                www: values[ "message" ] as string | null,
                prefix: values[ "prefix" ] as string,
                flatsize: values[ "flatsize" ] as number,
                automatic: Boolean(values[ "automatic" ]),
                locked: Boolean(values[ "locked" ]),
                licenselogic: Boolean(values[ "licenselogic" ]),
                installed: unixEpochToISO(values[ "time" ] as number ?? 0),
                pkg_format_version: values[ "pkg_format_version" ] as number | null,
                dep_formula: values[ "dep_formula" ] as string | null,
                vital: Boolean(values[ "vital" ]),
                manifest_digest: values[ "manifest_digest" ] as string | null,
                message: `Package ${values[ "name" ] as string} version ${values[ "version" ] as string} installed`,
                datetime: unixEpochToISO(values[ "time" ] as number ?? 0),
                timestamp_desc: "Package Installed",
                artifact: "FreeBSD PKG",
                data_type: "freebsd:pkg:entry",
                evidence: entry.meta.display_path,
            };
            pkg_entries.push(pkg_entry);
        }
    }

    return pkg_entries;
}