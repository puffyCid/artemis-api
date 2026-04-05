import { Syslog } from "../../../types/esxi/logs/syslog";
import { FileError } from "../../filesystem/errors";
import { glob, readLines } from "../../filesystem/files";
import { EsxiError } from "../error";

/**
 * Function to parse ESXi `syslog.log` file
 * @param alt_path Optional alternative glob to `syslog.log`
 * @returns Array of `Syslog` or `EsxiError`
 */
export function sysLogEsxi(alt_path?: string): Syslog[] | EsxiError {
    let syslog_glob = "/vmfs/volumes/*/log/syslog.log";
    if (alt_path !== undefined) {
        syslog_glob = alt_path;
    }

    const paths = glob(syslog_glob);
    if (paths instanceof FileError) {
        return new EsxiError(`SYSLOG`, `failed to glob: ${syslog_glob}: ${paths}`);
    }

    let history: Syslog[] = [];
    for (const entry of paths) {
        if (!entry.is_file) {
            continue;
        }

        const values = readSyslog(entry.full_path);
        if (values instanceof EsxiError) {
            continue;
        }

        history = history.concat(values);

    }

    return history;
}

/**
 * Parse each line of the ESXi `syslog.log` file
 * @param full_path Path to the `syslog.log` file
 * @returns Array of `Syslog` or `EsxiError`
 */
function readSyslog(full_path: string): Syslog[] | EsxiError {
    const limit = 200;
    let offset = 0;

    const values: Syslog[] = [];
    while (true) {
        const lines = readLines(full_path, offset, limit);
        if (lines instanceof FileError) {
            return new EsxiError(`SYSLOG`, `could not read file ${full_path}: ${lines}`);
        }
        offset += limit;
        for (const line of lines) {
            const value: Syslog = {
                message: "",
                datetime: "",
                pid: 0,
                evidence: full_path,
                category: "",
                process: "",
                timestamp_desc: "Syslog Entry Generated",
                artifact: "ESXi Syslog",
                data_type: "esxi:syslog:entry"
            };

            const entry = line.split(" ");
            value.datetime = entry.at(0) ?? "1970-01-01T00:00:00.000Z";
            value.category = entry.at(1) ?? "";
            const pid_string = entry.at(2) ?? "";
            const pid_strings = pid_string.split("[");
            const pid_value = pid_strings.at(1) ?? "0";
            value.pid = Number(pid_value.replace("]:", ""));
            value.process = pid_strings.at(0) ?? "";

            value.message = entry.slice(3).join(" ");
            values.push(value);
        }

        if (lines.length < limit) {
            break;
        }
    }

    return values;
}

/**
 * Function to test ESXi syslog log parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the ESXi syslog log parsing
 */
export function testSyslogEsxi(): void {
    const test = "../../test_data/esxi/logs/syslog.log";
    const results = sysLogEsxi(test);
    if (results instanceof EsxiError) {
        throw results;
    }

    if (results.length !== 973) {
        throw `Got ${results.length} expected 973.......sysLogEsxi ❌`;
    }

    if (results[ 12 ]?.message !== "Method start executed successfully for plugin dma-engine") {
        throw `Got ${results[ 12 ]?.message} expected "Method start executed successfully for plugin dma-engine".......sysLogEsxi ❌`;
    }

    console.info(`  Function sysLogEsxi ✅`);


    const bad_file = readSyslog("fake path");
    if (!(bad_file instanceof EsxiError)) {
        throw bad_file;
    }

    console.info(`  Function readSyslog ✅`);
}