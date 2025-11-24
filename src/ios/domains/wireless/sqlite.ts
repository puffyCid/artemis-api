import { ApplicationError } from "../../../applications/errors";
import { querySqlite } from "../../../applications/sqlite";
import { cocoatimeToUnixEpoch, unixEpochToISO } from "../../../time/conversion";
import { IosError } from "../../error";

interface DataUsage {
    datetime: string;
    process_name: string;
    bundle:
    string;
}

/**
 * Function to extract data usage process. It is not super useful
 * @param path Path to DataUsage.sqlite file
 * @returns Array of `DataUsage` or `IosError`
 */
export function extractDataUsage(path: string): DataUsage[] | IosError {
    const query = `SELECT ZTIMESTAMP,ZBUNDLENAME,ZPROCNAME FROM ZPROCESS`;
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new IosError(
            `DATAUSAGE`,
            `failed to query appt state db: ${results}`
        );
    }

    const data: DataUsage[] = [];

    for (const entry of results) {
        const usage: DataUsage = {
            datetime: unixEpochToISO(cocoatimeToUnixEpoch(entry[ "ZTIMESTAMP" ] as number | undefined ?? 0)),
            process_name: entry[ "ZPROCNAME" ] as string | undefined ?? "",
            bundle: entry[ "ZBUNDLENAME" ] as string | undefined ?? "",
        };
        data.push(usage);
    }

    return data;
}