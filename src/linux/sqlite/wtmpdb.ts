import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { LastLogons } from "../../../types/linux/sqlite/wtmpdb";
import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to query the wtmp sqlite database
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to wtmp.db
 * @returns Array of `LastLogons` or `LinuxError`
 */
export function queryLogons(protocol = AccessorProtocol.Host, alt_path?: string): LastLogons[] | LinuxError {
    let path = "/var/lib/wtmpdb/wtmp.db";
    if (alt_path !== undefined) {
        path = alt_path;
    }

    const accessor = new Accessor();
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new LinuxError(`WTMPDB`, `failed to glob for '${path}': ${matches}`);
    }

    const query = "SELECT id, type, user, login, logout, tty, remotehost, service from wtmp";
    const logons: LastLogons[] = [];

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
            const logon: LastLogons = {
                id: values[ "ID" ] as number,
                type: values[ "Type" ] as number ?? 0,
                user: values[ "User" ] as string,
                login: unixEpochToISO(values[ "Login" ] as number ?? 0),
                logout: unixEpochToISO(values[ "Logout" ] as number ?? 0),
                tty: values[ "TTY" ] as string ?? "",
                remote: values[ "RemoteHost" ] as string ?? "",
                service: values[ "Service" ] as string ?? "",
                message: `Logon by ${values[ "User" ] as string}`,
                datetime: unixEpochToISO(values[ "Login" ] as number ?? 0),
                timestamp_desc: "User Logon",
                artifact: "wtmpdb Logons",
                data_type: "linux:wtmpdb:entry",
                evidence: entry.meta.display_path,
            };
            logons.push(logon);
        }
    }

    return logons;
}

/**
 * Function to test WTMPDB parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the WTMPDB parsing
 */
export function testQueryLogons(): void {
    const test = "../../test_data/linux/wtmp/wtmp.db";
    const result = queryLogons(AccessorProtocol.Host, test);
    if (result instanceof LinuxError) {
        throw result;
    }

    if (result[ 0 ] === undefined) {
        throw `Got logon undefined.......testQueryLogons ❌`;
    }

    if (result[ 0 ].user != "reboot") {
        throw `Got extension name ${result[ 0 ].user} expected reboot.......testQueryLogons ❌`;
    }

    console.info(`  Function testQueryLogons ✅`);
}