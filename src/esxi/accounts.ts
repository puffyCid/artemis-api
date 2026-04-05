import { readLines, stat } from "../../mod";
import { Accounts } from "../../types/esxi/accounts";
import { FileError } from "../filesystem/errors";
import { EsxiError } from "./error";

/**
 * Parse user accounts
 * @param alt_path Optional path to /etc/passwd
 * @returns Array of `Accounts` or `EsxiError`
 */
export function esxiAccounts(alt_path?: string): Accounts[] | EsxiError {
    let user_passwd = "/etc/passwd";
    if (alt_path !== undefined) {
        user_passwd = alt_path;
    }

    const users: Accounts[] = [];
    // 1 line per account. Unlikely to see over 100 accounts on ESXi?
    const lines = readLines(user_passwd, 0, 100);
    if (lines instanceof FileError) {
        return new EsxiError(`ACCOUNTS`, `failed to read ${user_passwd}: ${lines}`);
    }


    let datetime = "1970-01-01T00:00:00.000Z";
    // Get las modified time of /etc/passwd file
    const meta = stat(user_passwd);
    if (!(meta instanceof FileError)) {
        datetime = meta.modified;
    }

    for (const entry of lines) {
        // Semicolons should not be allowed in user name or description fields
        const entries = entry.split(":");

        const value: Accounts = {
            message: `ESXi account '${entries.at(0) ?? "Unknown"}'`,
            datetime,
            timestamp_desc: "Passwd File Modified",
            artifact: "ESXi User Account",
            data_type: "esxi:accounts:entry",
            evidence: user_passwd,
            uid: Number(entries.at(2) ?? 0),
            gid: Number(entries.at(3) ?? 0),
            info: entries.at(4) ?? "Unknown",
            shell: entries.at(6) ?? "Unknown",
            home: entries.at(5) ?? "Unknown",
        };
        users.push(value);
    }


    return users;
}

/**
 * Function to test ESXi accounts parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the ESXi accounts parsing
 */
export function testEsxiAccounts(): void {
    const test = "../../test_data/esxi/accounts/passwd.txt";
    const results = esxiAccounts(test);
    if (results instanceof EsxiError) {
        throw results;
    }

    if (results.length !== 4) {
        throw `Got ${results.length} expected 4.......esxiAccounts ❌`;
    }

    if (results[ 2 ]?.message !== "ESXi account 'vpxuser'") {
        throw `Got ${results[ 2 ]?.message} expected "ESXi account 'vpxuser".......esxiAccounts ❌`;
    }

    if (!results[ 3 ]?.evidence.includes("passwd.txt")) {
        throw `Got ${results[ 2 ]?.evidence} expected "passwd.txt".......esxiAccounts ❌`;
    }

    console.info(`  Function esxiAccounts ✅`);
}