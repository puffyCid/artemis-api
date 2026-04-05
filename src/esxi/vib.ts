import { glob } from "../../mod";
import { RawVibXml, VibInfo, VibPayload } from "../../types/esxi/vib";
import { EncodingError } from "../encoding/errors";
import { readXml } from "../encoding/xml";
import { FileError } from "../filesystem/errors";
import { EsxiError } from "./error";

/**
 * Parse vSphere Installation Bundles (VIB) package info
 * @param alt_path Optional alternative glob path to folder containing VIB xml files
 * @returns Array of `VibInfo` or `EsxiError`
 */
export function getVibs(alt_path?: string): VibInfo[] | EsxiError {
    let vib_glob = "/var/db/esximg/vibs/*.xml";
    if (alt_path !== undefined) {
        vib_glob = alt_path;
    }

    const paths = glob(vib_glob);
    if (paths instanceof FileError) {
        return new EsxiError(`VIBPACKAGE`, `failed to glob: ${vib_glob}: ${paths}`);
    }

    const vibs: VibInfo[] = [];
    for (const entry of paths) {
        if (!entry.is_file || !entry.filename.endsWith(".xml")) {
            continue;
        }

        console.log(entry.full_path);
        const value = parseVib(entry.full_path);
        if (value instanceof EsxiError) {
            continue;
        }

        vibs.push(value);
    }

    return vibs;
}

/**
 * Parse the VIB xml info
 * @param full_path Path to VIB xml file
 * @returns `VibInfo` or `EsxiError`
 */
function parseVib(full_path: string): VibInfo | EsxiError {
    const info = readXml(full_path);
    if (info instanceof EncodingError) {
        return new EsxiError(`VIBPACKAGE`, `could not read vib package at ${full_path}: ${info}`);
    }

    const raw_vib = info as unknown as RawVibXml;

    let timestamp;
    let message;
    if (Array.isArray(raw_vib.vib.installdate)) {
        timestamp = raw_vib.vib.installdate.at(0) ?? "1970-01-01T00:00:00.000Z";
        message = `VIB package '${raw_vib.vib.name.at(0) ?? "Unknown"}' installed`;
    } else {
        timestamp = raw_vib.vib[ "release-date" ].at(0) ?? "1970-01-01T00:00:00.000Z";
        message = `VIB package '${raw_vib.vib.name.at(0) ?? "Unknown"}' released`;
    }
    let datetime = "1970-01-01T00:00:00.000Z";
    let timezone = "+00:00";
    if (timestamp.includes("+")) {
        datetime = `${timestamp.split("+").at(0) ?? "1970-01-01T00:00:00.000"}Z`;
        timezone = `+${timestamp.split("+").at(1) ?? "00:00"}`;
    } else if (timestamp.includes("-")) {
        const index = timestamp.lastIndexOf("-");
        datetime = `${timestamp.slice(0, index)}Z`;

        timezone = `${timestamp.slice(index)}`;
    }
    const vib: VibInfo = {
        message,
        datetime,
        timestamp_desc: raw_vib.vib.installdate !== undefined ? "VIB Package Installed" : "VIB Package Released",
        install_date: raw_vib.vib.installdate !== undefined ? raw_vib.vib.installdate.at(0) ?? "1970-01-01T00:00:00.000Z" : "1970-01-01T00:00:000Z",
        artifact: "ESXi VIB Package",
        data_type: "esxi:vib:entry",
        vib_version: Number(raw_vib.vib.$.version.at(0) ?? 0),
        name: raw_vib.vib.name.at(0) ?? "Unknown",
        version: raw_vib.vib.version.at(0) ?? "Unknown",
        vendor: raw_vib.vib.vendor.at(0) ?? "Unknown",
        summary: raw_vib.vib.summary.at(0) ?? "Unknown",
        description: raw_vib.vib.description.at(0) ?? "Unknown",
        release_date: raw_vib.vib[ "release-date" ].at(0) ?? "1970-01-01T00:00:00.000Z",
        level: raw_vib.vib[ "acceptance-level" ].at(0) ?? "Unknown",
        vib_type: raw_vib.vib.type.at(0) ?? "Unknown",
        payloads: [],
        urls: [],
        evidence: full_path,
        timezone,
        installed: raw_vib.vib.installdate !== undefined ? true : false
    };

    for (const url of raw_vib.vib.urls) {
        if (typeof url === 'string') {
            break;
        }
        for (const value of url.url) {
            vib.urls.push(value._);
        }
    }

    const payloads = raw_vib.vib.payloads;
    for (const entry of payloads) {
        for (const value of entry.payload) {
            const payload_info: VibPayload = {
                payload_type: value.$.type,
                uncompressed_size: Number(value.$[ "uncompressed-size" ] ?? 0),
                size: Number(value.$.size),
                sha1_compressed: "",
                sha256_compressed: "",
                sha256: ""
            };
            // Get hashes now
            for (const hash of value.checksum) {
                if (hash.$[ "verify-process" ] === "gunzip" && hash.$[ "checksum-type" ] === "sha-256") {
                    payload_info.sha256_compressed = hash._;
                } else if (hash.$[ "verify-process" ] === "gunzip" && hash.$[ "checksum-type" ] === "sha-1") {
                    payload_info.sha1_compressed = hash._;
                } else if (hash.$[ "checksum-type" ] === "sha-256") {
                    payload_info.sha256 = hash._;
                }
            }
            vib.payloads.push(payload_info);
        }
    }
    return vib;
};


/**
 * Function to test ESXi VIB package parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the ESXi VIB package parsing
 */
export function testGetVibs(): void {
    const test = "../../test_data/esxi/vibs/artemis--2860263652605340392.xml";
    const results = getVibs(test);
    if (results instanceof EsxiError) {
        throw results;
    }

    if (results[ 0 ]?.message != "VIB package 'artemis' installed") {
        throw `Got ${results[ 0 ]?.message} expected "VIB package 'artemis' installed".......getVibs ❌`;
    }

    if (results[ 0 ]?.datetime != "2026-04-04T19:06:39.106766Z") {
        throw `Got ${results[ 0 ].datetime} expected "2026-04-04T19:06:39.106766Z".......getVibs ❌`;
    }


    console.info(`  Function getVibs ✅`);


    const bad_file = parseVib("fake path");
    if (!(bad_file instanceof EsxiError)) {
        throw bad_file;
    }

    console.info(`  Function parseVib ✅`);
}