import { AnyDeskUsers, TraceEntry } from "../../../types/applications/anydesk";
import { FileError } from "../../filesystem/errors";
import { readFile, readLines } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { takeUntil } from "../../nom/parsers";
import { ApplicationError } from "../errors";

export function readTrace(path: string, user: AnyDeskUsers): TraceEntry[] | ApplicationError {
    const hits: TraceEntry[] = [];
    let offset = 0;
    const limit = 100;
    while (true) {
        const results = readLines(path, offset, limit);
        if (results instanceof FileError) {
            break;
        }
        offset += 100;

        for (let entry of results) {
            if (entry.startsWith("*") || !entry.includes(" ")) {
                continue;
            }

            entry = entry.replaceAll("\u0000", " ");
            entry = entry.trim();
            let info = takeUntil(entry, " ");
            if (info instanceof NomError) {
                continue;
            }

            const level = info.nommed as string;
            info.remaining = (info.remaining as string).trimStart();

            info = takeUntil(info.remaining, "  ");
            if (info instanceof NomError) {
                continue;
            }
            const timestamp = `${(info.nommed as string).replace(" ", "T")}Z`;
            info.remaining = (info.remaining as string).trimStart();

            info = takeUntil(info.remaining, " ");
            if (info instanceof NomError) {
                continue;
            }
            const component = info.nommed as string;
            info.remaining = (info.remaining as string).trimStart();

            info = takeUntil(info.remaining, " ");
            if (info instanceof NomError) {
                continue;
            }
            const code_function = info.nommed as string;
            info.remaining = (info.remaining as string).trimStart();

            info = takeUntil(info.remaining, " ");
            if (info instanceof NomError) {
                continue;
            }
            const pid = Number(info.nommed as string);
            info.remaining = (info.remaining as string).trimStart();

            info = takeUntil(info.remaining, " ");
            if (info instanceof NomError) {
                continue;
            }
            const ppid = Number(info.nommed as string);
            info.remaining = (info.remaining as string).trimStart();

            info = takeUntil(info.remaining, " ");
            if (info instanceof NomError) {
                continue;
            }
            let subfunction = info.nommed as string;

            // Sometimes another number appears after ppid?
            // Unsure what it is. Seen only in system anydesk.trace
            // Subfunction appears after it
            if (!isNaN(+subfunction)) {
                info.remaining = (info.remaining as string).trimStart();
                info = takeUntil(info.remaining, " ");
                if (info instanceof NomError) {
                    continue;
                }
                subfunction = info.nommed as string;
            }
            info.remaining = (info.remaining as string).trimStart();

            let log_message = "";
            if (!(info.remaining as string).endsWith("-")) {
                // Skip '-'
                info = takeUntil(info.remaining, " ");
                if (info instanceof NomError) {
                    continue;
                }
                info.remaining = (info.remaining as string).trim();
                log_message = info.remaining as string;
            }

            const value: TraceEntry = {
                message: log_message,
                datetime: timestamp,
                timestamp_desc: "Trace Entry",
                artifact: "AnyDesk Trace Log",
                data_type: "applications:anydesk:trace:entry",
                path,
                level,
                entry_timestamp: timestamp,
                component,
                code_function,
                pid,
                ppid,
                subfunction,
                log_message,
                account: user.account,
                version: user.version,
                id: user.id
            };
            hits.push(value);
        }

        // We have reached the end
        if (results.length < limit) {
            break;
        }
    }

    return hits;
}

/**
 * Function to test the AnyDesk trace file parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the AnyDesk trace parsing
 */
export function testReadTrace(): void {
    const test = "../../test_data/anydesk/anydesk.trace";
    const results = readTrace(test, { user_path: "", id: "1234", account: "adfasdf@adfads.com", version: "7.1.0" });
    if (results instanceof ApplicationError) {
        throw results;
    }

    if (results.length !== 790) {
        throw `Got ${results.length} rows expected 790.......readTrace ❌`;
    }

    if (results[ 22 ].message !== "user_data_dir = /home/ubu/.anydesk, logged_in_user_data_dir = /home/ubu/.anydesk, current_home = /home/ubu") {
        throw `Got '${results[ 22 ].message}' rows expected 'user_data_dir = /home/ubu/.anydesk, logged_in_user_data_dir = /home/ubu/.anydesk, current_home = /home/ubu'.......readTrace ❌`;
    }

    if (results[ 444 ].datetime !== "2025-09-22T00:53:51.166Z") {
        throw `Got '${results[ 444 ].datetime}' expected 2025-09-22T00:53:51.166Z.......readTrace ❌`;
    }

    const test2 = "../../test_data/anydesk/anydesk_var_log.trace";
    const results2 = readTrace(test2, { user_path: "", id: "1234", account: "adfasdf@adfads.com", version: "7.1.0" });
    if (results2 instanceof ApplicationError) {
        throw results;
    }

    if (results2.length !== 2082) {
        throw `Got ${results2.length} rows expected 2082.......readTrace ❌`;
    }

    if (results2[ 22 ].message !== "Global: yes") {
        throw `Got '${results2[ 22 ].message}' expected 'Global: yes'.......readTrace ❌`;
    }

    if (results2[ 444 ].datetime !== "2025-09-22T00:46:40.998Z") {
        throw `Got '${results2[ 444 ].datetime}' expected 2025-09-22T00:46:40.998Z.......readTrace ❌`;
    }

    console.info(`  Function readTrace ✅`);

}