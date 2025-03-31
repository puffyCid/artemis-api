import { Pkg } from "../../types/freebsd/packages";
import { ApplicationError } from "../applications/errors";
import { querySqlite } from "../applications/sqlite";
import { unixEpochToISO } from "../time/conversion";
import { FreebsdError } from "./error";

/**
 * Function to get installed pkgs.
 * @param offset What offset to start the query at
 * @param limit How many packages to return
 * @param alt_path Optional path to the sqlite database. Will default to `/var/db/pkg/local.sqlite`
 * @returns Array of `Pkg` or `FreebsdError`
 */
export function getPkgs(offset: number, limit: number, alt_path?: string): Pkg[] | FreebsdError {
    const query = `SELECT * FROM packages LIMIT ${limit} OFFSET ${offset}`;
    let path = "/var/db/pkg/local.sqlite";
    if (alt_path != undefined) {
        path = alt_path;
    }

    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new FreebsdError(
            `PKG`,
            `failed to query pkg DB ${results}`,
        );
    }

    const pkg_entries: Pkg[] = [];
    for (const entry of results) {
        console.log(JSON.stringify(entry));
        const pkg_entry: Pkg = {
            id: entry[ "id" ] as number,
            origin: entry[ "origin" ] as string,
            name: entry[ "name" ] as string,
            version: entry[ "version" ] as string,
            comment: entry[ "comment" ] as string,
            desc: entry[ "desc" ] as string,
            mtree_id: entry[ "mtree_id" ] as number | null,
            message: entry[ "message" ] as string | null,
            arch: entry[ "arch" ] as string,
            maintainer: entry[ "maintainer" ] as string,
            www: entry[ "message" ] as string | null,
            prefix: entry[ "prefix" ] as string,
            flatsize: entry[ "flatsize" ] as number,
            automatic: Boolean(entry[ "automatic" ]),
            locked: Boolean(entry[ "locked" ]),
            licenselogic: Boolean(entry[ "licenselogic" ]),
            installed: unixEpochToISO(entry[ "time" ] as number ?? 0),
            pkg_format_version: entry[ "pkg_format_version" ] as number | null,
            dep_formula: entry[ "dep_formula" ] as string | null,
            vital: Boolean(entry[ "vital" ]),
            manifest_digest: entry[ "manifest_digest" ] as string | null,
        };
        pkg_entries.push(pkg_entry);
    }

    return pkg_entries;
}