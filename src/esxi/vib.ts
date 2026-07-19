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
    let timestamp = raw_vib.vib.installdate;
    if (timestamp === undefined) {
        timestamp = "1970-01-01T00:00:00.000Z";
    }
    const message = `VIB package '${raw_vib.vib.name}' installed`;

    let datetime = "1970-01-01T00:00:00.000Z";
    let timezone = "+00:00";
    if (timestamp === "1970-01-01T00:00:00.000Z") {
        timezone = "+00:00";
    } else if (timestamp.includes("+")) {
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
        install_date: raw_vib.vib.installdate !== undefined ? raw_vib.vib.installdate : "1970-01-01T00:00:000Z",
        artifact: "ESXi VIB Package",
        data_type: "esxi:vib:entry",
        vib_version: Number(raw_vib.vib[ "@version" ]),
        name: raw_vib.vib.name,
        version: raw_vib.vib.version,
        vendor: raw_vib.vib.vendor,
        summary: raw_vib.vib.summary,
        description: raw_vib.vib.description,
        release_date: raw_vib.vib[ "release-date" ],
        level: raw_vib.vib[ "acceptance-level" ],
        vib_type: raw_vib.vib.type,
        payloads: [],
        urls: [],
        evidence: full_path,
        timezone,
        installed: raw_vib.vib.installdate !== undefined ? true : false
    };

    if (Array.isArray(raw_vib.vib.urls)) {
        for (const url of raw_vib.vib.urls) {
            vib.urls.push(url.url.text);
        }
    }

    let payloads = raw_vib.vib.payloads;
    if (!Array.isArray(payloads)) {
        payloads = [ payloads ];
    }
    console.log(full_path);
    for (const value of payloads) {
        if (Array.isArray(value.payload)) {
            for (const payload_value of value.payload) {
                console.log(JSON.stringify(payload_value));

                const payload_info: VibPayload = {
                    payload_type: payload_value[ "@type" ],
                    uncompressed_size: Number(payload_value[ "@uncompressed-size" ]),
                    size: Number(payload_value[ "@size" ]),
                    sha1_compressed: "",
                    sha256_compressed: "",
                    sha256: ""
                };
                if (!Array.isArray(payload_value.checksum)) {
                    if (payload_value.checksum[ "@verify-process" ] === "gunzip" && payload_value.checksum[ "@checksum-type" ] === "sha-256") {
                        payload_info.sha256_compressed = payload_value.checksum[ "#text" ];
                    } else if (payload_value.checksum[ "@verify-process" ] === "gunzip" && payload_value.checksum[ "@checksum-type" ] === "sha-1") {
                        payload_info.sha1_compressed = payload_value.checksum[ "#text" ];
                    } else if (payload_value.checksum[ "@checksum-type" ] === "sha-256") {
                        payload_info.sha256 = payload_value.checksum[ "#text" ];
                    }
                    vib.payloads.push(payload_info);

                    continue;
                }
                // Get hashes now
                for (const hash of payload_value.checksum) {
                    if (hash[ "@verify-process" ] === "gunzip" && hash[ "@checksum-type" ] === "sha-256") {
                        payload_info.sha256_compressed = hash[ "#text" ];
                    } else if (hash[ "@verify-process" ] === "gunzip" && hash[ "@checksum-type" ] === "sha-1") {
                        payload_info.sha1_compressed = hash[ "#text" ];
                    } else if (hash[ "@checksum-type" ] === "sha-256") {
                        payload_info.sha256 = hash[ "#text" ];
                    }
                }
                vib.payloads.push(payload_info);
            }
            continue;
        }
        const payload_info: VibPayload = {
            payload_type: value.payload[ "@type" ],
            uncompressed_size: Number(value.payload[ "@uncompressed-size" ]),
            size: Number(value.payload[ "@size" ]),
            sha1_compressed: "",
            sha256_compressed: "",
            sha256: ""
        };

        if (!Array.isArray(value.payload.checksum)) {
            if (value.payload.checksum[ "@verify-process" ] === "gunzip" && value.payload.checksum[ "@checksum-type" ] === "sha-256") {
                payload_info.sha256_compressed = value.payload.checksum[ "#text" ];
            } else if (value.payload.checksum[ "@verify-process" ] === "gunzip" && value.payload.checksum[ "@checksum-type" ] === "sha-1") {
                payload_info.sha1_compressed = value.payload.checksum[ "#text" ];
            } else if (value.payload.checksum[ "@checksum-type" ] === "sha-256") {
                payload_info.sha256 = value.payload.checksum[ "#text" ];
            }
            vib.payloads.push(payload_info);

            continue;
        }

        // Get hashes now
        for (const hash of value.payload.checksum) {
            if (hash[ "@verify-process" ] === "gunzip" && hash[ "@checksum-type" ] === "sha-256") {
                payload_info.sha256_compressed = hash[ "#text" ];
            } else if (hash[ "@verify-process" ] === "gunzip" && hash[ "@checksum-type" ] === "sha-1") {
                payload_info.sha1_compressed = hash[ "#text" ];
            } else if (hash[ "@checksum-type" ] === "sha-256") {
                payload_info.sha256 = hash[ "#text" ];
            }
        }
        vib.payloads.push(payload_info);

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