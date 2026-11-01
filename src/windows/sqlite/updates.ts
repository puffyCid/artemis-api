import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { UpdateHistoryV2 } from "../../../types/windows/ese/updates";
import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { getSystemDrive } from "../../environment/env";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../errors";

/**
 * Function to Windows Update history sqlite database
 * @param alt_path Optional path to `store.db`
 * @returns Array of `UpdateHistoryV2` or `WindowsError`
 */
export function windowsUpdatesSqlite(protocol = AccessorProtocol.Host, alt_path?: string): UpdateHistoryV2[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();

    let path = `${drive}\\ProgramData\\USOPrivate\\UpdateStore\\store.db`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    // Based on the `AccessorProtocol` glob for store.db files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('UPDATESHISTORY', `failed to glob for ${path}: ${matches}`);
    }

    let history: UpdateHistoryV2[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        if (protocol !== AccessorProtocol.Host) {
            console.log(JSON.stringify(entry.handle));
            const results = openWindowsUpdatesSqlite(entry.handle as FileHandle, entry.meta.display_path);
            if (results instanceof WindowsError) {
                continue;
            }

            history = history.concat(results);
            continue;
        }

        const query = "SELECT * FROM COMPLETEDUPDATES";

        const results = querySqlite(entry.meta.full_path, query);
        if (results instanceof ApplicationError) {
            return new WindowsError(`UPDATESHISTORY`, `failed to query ${entry.meta.display_path}: ${results}`);
        }

        for (const result of results) {
            const value: UpdateHistoryV2 = {
                provider_id: result["PROVIDERID"] as string,
                update_id: result["UPDATEID"] as string,
                time: null,
                title: result["TITLE"] as string | null,
                description: result["DESCRIPTION"] as string | null,
                info_url: result["MOREINFOURL"] as string | null,
                category: result["HISTORYCATEGORY"] as string | null,
                uninstall: Boolean(result["UNINSTALL"] as number | null),
                reboot: Boolean(result["WASREBOOTREQUIRED"] as number | null),
                for_os: Boolean(result["FOROS"] as number | null),
                metadata: null,
                evidence: entry.meta.display_path,
                message: `Windows update '${result["TITLE"] as string | null}'`,
                datetime: "1970-01-01T00:00:00.000Z",
                timestamp_desc: "Last Updated",
                artifact: "Windows Update History",
                data_type: "windows:sqlite:updates:entry"
            };

            if (result["TIME"] !== null) {
                value.time = unixEpochToISO(BigInt(result["TIME"] as string));
                value.datetime = value.time;
            }
            if (result["METADATA"] !== null) {
                value.metadata = JSON.parse(result["METADATA"] as string);
            }

            history.push(value);
        }

    }



    return history;
}

function openWindowsUpdatesSqlite(handle: FileHandle, evidence: string): UpdateHistoryV2[] | WindowsError {
    const connection = new Sqlite(handle);
    const query = "SELECT * FROM COMPLETEDUPDATES";

    const results = connection.query(query);
    if (results instanceof ApplicationError) {
        return new WindowsError(`UPDATESHISTORY`, `failed to query ${JSON.stringify(handle.File.locator)}: ${results}`);
    }

    const history: UpdateHistoryV2[] = [];

    for (const entry of results) {
        const value: UpdateHistoryV2 = {
            provider_id: entry["PROVIDERID"] as string,
            update_id: entry["UPDATEID"] as string,
            time: null,
            title: entry["TITLE"] as string | null,
            description: entry["DESCRIPTION"] as string | null,
            info_url: entry["MOREINFOURL"] as string | null,
            category: entry["HISTORYCATEGORY"] as string | null,
            uninstall: Boolean(entry["UNINSTALL"] as number | null),
            reboot: Boolean(entry["WASREBOOTREQUIRED"] as number | null),
            for_os: Boolean(entry["FOROS"] as number | null),
            metadata: null,
            evidence,
            message: `Windows update '${entry["TITLE"] as string | null}'`,
            datetime: "1970-01-01T00:00:00.000Z",
            timestamp_desc: "Last Updated",
            artifact: "Windows Update History",
            data_type: "windows:sqlite:updates:entry"
        };

        if (entry["TIME"] !== null) {
            value.time = unixEpochToISO(BigInt(entry["TIME"] as string));
            value.datetime = value.time;
        }
        if (entry["METADATA"] !== null) {
            value.metadata = JSON.parse(entry["METADATA"] as string);
        }

        history.push(value);
    }

    return history;
}
