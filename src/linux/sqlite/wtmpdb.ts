import { LastLogons } from "../../../types/linux/sqlite/wtmpdb";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { unixEpochToISO } from "../../time/conversion";
import { LinuxError } from "../errors";

/**
 * Function to query the wtmp sqlite database
 * @param alt_path Optional alternative path to wtmp.db
 * @returns Array of `LastLogons` or `LinuxError`
 */
export function queryLogons(alt_path?: string): LastLogons[] | LinuxError {
    let path = "/var/lib/wtmpdb/wtmp.db";
    if (alt_path !== undefined) {
        path = alt_path;
    }

    const query = "SELECT id, type, user, login, logout, tty, remotehost, service from wtmp";
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new LinuxError(`WTMPDB`, `Could not query ${path}: ${results}`);
    }

    const values: LastLogons[] = [];
    for (const entry of results) {
        const logon: LastLogons = {
            id: entry[ "ID" ] as number,
            type: entry[ "Type" ] as number ?? 0,
            user: entry[ "User" ] as string,
            login: unixEpochToISO(entry[ "Login" ] as number ?? 0),
            logout: unixEpochToISO(entry[ "Logout" ] as number ?? 0),
            tty: entry[ "TTY" ] as string ?? "",
            remote: entry[ "RemoteHost" ] as string ?? "",
            service: entry[ "Service" ] as string ?? "",
            message: `Logon by ${entry[ "User" ] as string}`,
            datetime: unixEpochToISO(entry[ "Login" ] as number ?? 0),
            timestamp_desc: "User Logon",
            artifact: "wtmpdb Logons",
            data_type: "linux:wtmpdb:entry"
        };
        values.push(logon);
    }

    return values;
}

/**
 * Function to test WTMPDB parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the WTMPDB parsing
 */
export function testQueryLogons(): void {
    const test = "../../test_data/linux/wtmp/wtmp.db";
    const result = queryLogons(test);
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