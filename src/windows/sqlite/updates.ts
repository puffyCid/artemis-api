import { UpdateHistoryV2 } from "../../../types/windows/ese/updates";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { getEnvValue } from "../../environment/env";
import { unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../errors";

/**
 * Function to Windows Update history sqlite database
 * @param alt_path Optional path to `store.db`
 * @returns Array of `UpdateHistoryV2` or `WindowsError`
 */
export function windowsUpdatesSqlite(alt_path?: string): UpdateHistoryV2[] | WindowsError {
    const query = "SELECT * FROM COMPLETEDUPDATES";
    const default_path = getEnvValue("SystemDrive");
    let path =
        `${default_path}\\ProgramData\\USOPrivate\\UpdateStore\\store.db`;
    if (alt_path !== undefined && alt_path.endsWith("store.db")) {
        path = alt_path;
    }

    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new WindowsError(`UPDATESHISTORY`, `failed to query sqlite db: ${results}`);
    }

    const history: UpdateHistoryV2[] = [];
    for (const entry of results) {
        const value: UpdateHistoryV2 = {
            provider_id: entry[ "PROVIDERID" ] as string,
            update_id: entry[ "UPDATEID" ] as string,
            time: null,
            title: entry[ "TITLE" ] as string | null,
            description: entry[ "DESCRIPTION" ] as string | null,
            info_url: entry[ "MOREINFOURL" ] as string | null,
            category: entry[ "HISTORYCATEGORY" ] as string | null,
            uninstall: Boolean(entry[ "UNINSTALL" ] as number | null),
            reboot: Boolean(entry[ "WASREBOOTREQUIRED" ] as number | null),
            for_os: Boolean(entry[ "FOROS" ] as number | null),
            metadata: null
        };

        if (entry[ "TIME" ] !== null) {
            value.time = unixEpochToISO(BigInt(entry[ "TIME" ] as string));
        }
        if (entry[ "METADATA" ] !== null) {
            value.metadata = JSON.parse(entry[ "METADATA" ] as string);
        }

        history.push(value);
    }

    return history;
}