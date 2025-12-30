import { BrowserType, ChromiumLocalStorage, ChromiumProfiles } from "../../../types/applications/chromium";
import { ValueType } from "../../../types/applications/level";
import { ProtoTag } from "../../../types/encoding/protobuf";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";
import { ApplicationError } from "../errors";
import { LevelDb } from "../leveldb/level";

/**
 * Get Chromium local storage entries for all users
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns Array of `ChromiumLocalStorage`
 */
export function chromiumLocalStorage(paths: ChromiumProfiles[], platform: PlatformType): ChromiumLocalStorage[] {
    const hits: ChromiumLocalStorage[] = [];
    for (const path of paths) {
        let full_path = `${path.full_path}/*/Local Storage//leveldb`;


        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Local Storage\\leveldb`;
        }

        const glob_paths = glob(full_path);
        if (glob_paths instanceof FileError) {
            console.warn(`Failed to glob ${full_path}: ${glob_paths}`);
            continue;
        }

        // Go through all users Local Storage
        for (const entry_path of glob_paths) {
            const client = new LevelDb(entry_path.full_path, platform);
            let entries = client.wal();
            if (entries instanceof ApplicationError) {
                console.warn(`Failed to parse write ahead log for ${entry_path.full_path}: ${entries}`);
                continue;
            }

            for (const entry of entries as ChromiumLocalStorage[]) {
                entry["version"] = path.version;

                if (entry.state !== "Deletion") {
                    entry["message"] = `Origin: ${entry.origin} | Key: ${entry.key}: ${JSON.stringify(entry.value)}`;
                } else {
                    entry["message"] = `Origin: ${entry.origin} | Key: ${entry.key}`;
                }
                if (entry.value_type === ValueType.Protobuf) {
                    entry.value = JSON.stringify(entry.value);
                }
                entry["browser"] = path.browser;
                entry["data_type"] = "applications:leveldb:entry";
                entry["artifact"] = "Level Database";
                entry["datetime"] = "1970-01-01T00:00:00.000Z";
                entry["timestamp_desc"] = "Local Storage Write Ahead Log";
                hits.push(entry);
            }

            entries = client.tables();
            if (entries instanceof ApplicationError) {
                console.warn(`Failed to parse tables for ${entry_path.full_path}: ${entries}`);
                continue;
            }

            entries.sort((index, index2) => index.sequence < index2.sequence ? -1 : index.sequence > index2.sequence ? 1 : 0);

            // Try to apply timestamps to the entries
            // LDB entries are typically written in batches
            // Since we sorted entries by sequence above, we should in theory be able to associate by timestamp
            let default_time = "1970-01-01T00:00:00.000Z";
            const adjust_time = 1000000n;
            for (let i = 0; i < entries.length; i++) {
                const entry = entries[i];
                if (entry === undefined) {
                    continue;
                }
                // First we must find a META key entry with Protobuf data
                if (entry.origin.startsWith("META:") && entry.value_type === ValueType.Protobuf) {
                    // The first protobuf entry should be our timestamp
                    const time_value = (entry.value as Record<string, ProtoTag>)["1"];
                    if (time_value === undefined) {
                        continue;
                    }
                    if (typeof time_value.value === 'number') {
                        default_time = unixEpochToISO(webkitToUnixEpoch(Number(BigInt(time_value.value) / adjust_time)));
                    }
                }

                // Turn all Protobuf data into a string. Otherwise Timesketch complains
                if (entry.value_type === ValueType.Protobuf) {
                    entry.value = JSON.stringify(entry.value);
                }
                // Update our entry
                const ldb_entries = (entries as ChromiumLocalStorage[])[i];
                if (ldb_entries === undefined) {
                    continue;
                }
                ldb_entries["datetime"] = default_time;
            }

            for (const entry of entries as ChromiumLocalStorage[]) {
                entry["version"] = path.version;
                if (entry.state !== "Deletion") {
                    if (entry.value_type === ValueType.Protobuf || entry.value_type === ValueType.Array) {
                        entry["message"] = `Origin: ${entry.origin} | Key: ${entry.key}: ${JSON.stringify(entry.value)}`;
                    } else {
                        entry["message"] = `Origin: ${entry.origin} | Key: ${entry.key}: ${entry.value}`;
                    }
                } else {
                    entry["message"] = `Origin: ${entry.origin} | Key: ${entry.key}`;
                }
                entry["browser"] = path.browser;
                entry["data_type"] = "applications:leveldb:entry";
                entry["artifact"] = "Level Database";
                entry["timestamp_desc"] = "Local Storage Entry Write";
                hits.push(entry);
            }
        }
    }

    return hits;
}

/**
 * Function to test the Chromium Local Storage parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Chromium Local Storage parsing
 */
export function testChromiumLocalStorage(): void {
    const path: ChromiumProfiles = {
        full_path: "../../test_data/edge",
        version: "141",
        browser: BrowserType.EDGE
    };

    const level = chromiumLocalStorage([path], PlatformType.Darwin);
    if (level.length !== 587) {
        throw `Got length ${level.length} expected 587.......chromiumLocalStorage ❌`;
    }

    if (level[345]?.message !== "Origin: _https://microsoftedge.microsoft.com | Key: logs.esw_13: {\"logTime\":\"2025-11-02T22:33:21.650Z\",\"logLevel\":\"debug\",\"eventName\":\"GetCuratedList\",\"sessionId\":\"d2fcef2f-7b0c-41d3-9c74-2fb980239265\",\"message\":\"[\\\"Started fetching curated list for: Edge_Extensions_Productivity_V2 and page no:1\\\"]\"}") {
        throw `Got message ${level[345]?.message} expected "Origin: _https://microsoftedge.microsoft.com | Key: logs.esw_13: {"logTime":"2025-11-02T22:33:21.650Z","logLevel":"debug","eventName":"GetCuratedList","sessionId":"d2fcef2f-7b0c-41d3-9c74-2fb980239265","message":"[\\"Started fetching curated list for: Edge_Extensions_Productivity_V2 and page no:1\\"]"}".......chromiumLocalStorage ❌`;
    }

    if (level[257]?.origin !== "_https://www.cnn.com") {
        throw `Got origin ${level[257]?.origin} expected "_https://www.cnn.com".......chromiumLocalStorage ❌`;
    }

    console.info(`  Function chromiumLocalStorage ✅`);
}