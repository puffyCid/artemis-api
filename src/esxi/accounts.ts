import { Accessor, readLines } from "../../mod";
import { Accounts } from "../../types/esxi/accounts";
import { AccessorProtocol, EntryKind, FileHandle } from "../../types/filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { EsxiError } from "./error";

/**
 * Parse user accounts
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional path to /etc/passwd
 * @returns Array of `Accounts` or `EsxiError`
 */
export function esxiAccounts(protocol = AccessorProtocol.Host, alt_path?: string): Accounts[] | EsxiError {
    const path = alt_path ?? "/etc/passwd";
    const accessor = new Accessor();

    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new EsxiError(`ACCOUNTS`, `failed to glob: ${path}: ${matches}`);
    }

    const users: Accounts[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        // 1 line per account. Unlikely to see over 100 accounts on ESXi?
        const lines = readLines(entry.handle as FileHandle, 0, 100);
        if (lines instanceof FileError) {
            continue;
        }

        let datetime = "1970-01-01T00:00:00.000Z";
        // Get las modified time of /etc/passwd file
        const meta = accessor.statHandle(entry.handle as FileHandle);
        if (!(meta instanceof FileError)) {
            datetime = meta.times.modified;
        }

        for (const line of lines) {
            // Semicolons should not be allowed in user name or description fields
            const entries = line.split(":");

            const value: Accounts = {
                message: `ESXi account '${entries.at(0) ?? "Unknown"}'`,
                datetime,
                timestamp_desc: "Passwd File Modified",
                artifact: "ESXi User Account",
                data_type: "esxi:accounts:entry",
                evidence: entry.meta.display_path,
                uid: Number(entries.at(2) ?? 0),
                gid: Number(entries.at(3) ?? 0),
                info: entries.at(4) ?? "Unknown",
                shell: entries.at(6) ?? "Unknown",
                home: entries.at(5) ?? "Unknown",
            };
            users.push(value);

        }
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
    const results = esxiAccounts(AccessorProtocol.Host, test);
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