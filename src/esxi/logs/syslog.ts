import { Syslog } from "../../../types/esxi/logs/syslog";
import { decompress_gzip } from "../../compression/decompress";
import { CompressionError } from "../../compression/errors";
import { extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { glob, readFile, readLines } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { take, takeUntil } from "../../nom/parsers";
import { EsxiError } from "../error";

/**
 * Function to parse ESXi `syslog.log` file
 * @param alt_path Optional alternative glob to `syslog.log`
 * @returns Array of `Syslog` or `EsxiError`
 */
export function sysLogEsxi(alt_path?: string): Syslog[] | EsxiError {
    let syslog_glob = "/vmfs/volumes/*/log/syslog.log*";
    if (alt_path !== undefined) {
        syslog_glob = alt_path;
    }

    const paths = glob(syslog_glob);
    if (paths instanceof FileError) {
        return new EsxiError(`SYSLOG`, `failed to glob: ${syslog_glob}: ${paths}`);
    }

    let logs: Syslog[] = [];
    for (const entry of paths) {
        if (!entry.is_file) {
            continue;
        }

        if (entry.filename.endsWith(".gz")) {
            const values = decompressSyslog(entry.full_path);
            if (values instanceof EsxiError) {
                continue;
            }
            logs = logs.concat(values);
        }

        const values = readSyslog(entry.full_path);
        if (values instanceof EsxiError) {
            continue;
        }

        logs = logs.concat(values);

    }

    return logs;
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
            values.push(extractLine(line, full_path));
        }

        if (lines.length < limit) {
            break;
        }
    }

    return values;
}

/**
 * Function to decompress gzip compressed syslog files
 * @param full_path Full path to compressed syslog file
 * @returns Array of `Syslog` or `EsxiError`
 */
function decompressSyslog(full_path: string): Syslog[] | EsxiError {
    let bytes: Uint8Array | FileError | CompressionError;
    bytes = readFile(full_path);
    if (bytes instanceof FileError) {
        return new EsxiError(`SYSLOG`, `failed to read file ${full_path}: ${bytes}`);
    }

    bytes = decompress_gzip(bytes);
    if (bytes instanceof CompressionError) {
        return new EsxiError(`SYSLOG`, `failed to decompress file ${full_path}: ${bytes}`);
    }

    const newline = new Uint8Array([ 10 ]);
    const values: Syslog[] = [];
    while (bytes.length !== 0) {
        let decom_bytes = takeUntil(bytes, newline);
        if (decom_bytes instanceof NomError) {
            break;
        }
        const line = extractLine(extractUtf8String(decom_bytes.nommed as Uint8Array), full_path);
        values.push(line);

        // Nom the newline now
        decom_bytes = take(decom_bytes.remaining, 1);
        if (decom_bytes instanceof NomError) {
            break;
        }
        bytes = decom_bytes.remaining as Uint8Array;
    }
    return values;
}

/**
 * Parse a syslog line entry
 * @param line A syslog line entry
 * @param evidence Full path to the syslog file
 * @returns `Syslog` object
 */
function extractLine(line: string, evidence: string): Syslog {
    const value: Syslog = {
        message: "",
        datetime: "",
        pid: 0,
        evidence,
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

    return value;
}

/**
 * Function to test ESXi syslog log parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the ESXi syslog log parsing
 */
export function testSyslogEsxi(): void {
    const test = "../../test_data/esxi/logs/syslog*";
    const results = sysLogEsxi(test);
    if (results instanceof EsxiError) {
        throw results;
    }

    if (results.length !== 9435) {
        throw `Got ${results.length} expected 8462.......sysLogEsxi ❌`;
    }

    if (results[ 12 ]?.message !== "executing stop for daemon storageRM.") {
        throw `Got ${results[ 12 ]?.message} expected "executing stop for daemon storageRM.".......sysLogEsxi ❌`;
    }

    console.info(`  Function sysLogEsxi ✅`);

    const bad_file = readSyslog("fake path");
    if (!(bad_file instanceof EsxiError)) {
        throw bad_file;
    }

    console.info(`  Function readSyslog ✅`);

    const result = extractLine("2026-04-05T00:01:00.925Z Db(15) backup-check[136534]: No ConfigSchema: xmlfile='/var/db/esximg/vibs/qedentv-2670021833313565255.xml'", test);
    if (result.datetime !== "2026-04-05T00:01:00.925Z") {
        throw `Got ${result.datetime} expected "2026-04-05T00:01:00.925Z".......extractLine ❌`;
    }

    console.info(`  Function extractLine ✅`);

    const gz_results = decompressSyslog("../../test_data/esxi/logs/syslog.5.gz");
    if (gz_results instanceof EsxiError) {
        throw gz_results;
    }

    if (gz_results.length !== 8462) {
        throw `Got ${gz_results.length} expected 8462.......decompressSyslog ❌`;
    }

    if (gz_results[ 204 ]?.message !== "No ConfigSchema: xmlfile='/var/db/esximg/vibs/qedentv-7929314746453517149.xml'") {
        throw `Got ${gz_results[ 204 ]?.message} expected "No ConfigSchema: xmlfile='/var/db/esximg/vibs/qedentv-7929314746453517149.xml'".......decompressSyslog ❌`;
    }

    console.info(`  Function decompressSyslog ✅`);
}