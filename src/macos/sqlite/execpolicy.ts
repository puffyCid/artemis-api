import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { ExecPolicy } from "../../../types/macos/sqlite/execpolicy";
import { ApplicationError } from "../../applications/errors";
import { querySqlite, Sqlite } from "../../applications/sqlite";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { unixEpochToISO } from "../../time/conversion";
import { MacosError } from "../errors";

/**
 * Function to parse the `ExecPolicy` on a macOS system
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to ExecPolicy file
 * @returns Array of `ExecPolicy` records or `MacosError`
 */
export function execPolicy(protocol = AccessorProtocol.Host, alt_file?: string): ExecPolicy[] | MacosError {
    const path = alt_file ?? "/var/db/SystemPolicy/Configuration/ExecPolicy";
    const query = `SELECT is_signed,
            file_identifier,
            bundle_identifier,
            bundle_version,
            executable_measurements_v2.team_identifier AS team_identifier,
            executable_measurements_v2.signing_identifier AS signing_identifier,
            executable_measurements_v2.cdhash AS cdhash,
            main_executable_hash,
            executable_timestamp,
            file_size,
            is_library,
            is_used,
            responsible_file_identifier,
            is_valid,
            is_quarantined,
            executable_measurements_v2.timestamp AS executable_measurements_v2_timestamp,
            reported_timestamp,
            pk,
            volume_uuid,
            object_id,
            fs_type_name,
            bundle_id,
            policy_match,
            malware_result,
            flags,
            mod_time,
            policy_scan_cache.timestamp AS policy_scan_cache_timestamp,
            revocation_check_time,
            scan_version,
            top_policy_match
        FROM executable_measurements_v2
        LEFT JOIN policy_scan_cache
              ON policy_scan_cache.cdhash = executable_measurements_v2.cdhash`;

    const accessor = new Accessor();
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new MacosError(`EXECPOLICY`, `failed to glob for '${path}': ${matches}`);
    }

    const entries: ExecPolicy[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        let results;
        if (protocol === AccessorProtocol.Host) {
            results = querySqlite(path, query);
        } else {
            const client = new Sqlite(entry.handle as FileHandle);
            results = client.query(query);
        }

        if (results instanceof ApplicationError) {
            continue;
        }

        for (const value of results) {
            const row: ExecPolicy = {
                is_signed: value[ "is_signed" ] as number,
                file_identifier: value[ "file_identifier" ] as string,
                bundle_identifier: value[ "bundle_identifier" ] as string,
                bundle_version: value[ "bundle_version" ] as string,
                team_identifier: value[ "team_identifier" ] as string,
                signing_identifier: value[ "signing_identifier" ] as string,
                cdhash: value[ "cdhash" ] as string,
                main_executable_hash: value[ "main_executable_hash" ] as string,
                executable_timestamp: unixEpochToISO(value[ "executable_timestamp" ] as number),
                file_size: value[ "file_size" ] as number,
                is_library: value[ "is_library" ] as number,
                is_used: value[ "is_used" ] as number,
                responsible_file_identifier: value[ "responsible_file_identifier" ] as string,
                is_valid: value[ "is_valid" ] as number,
                is_quarantined: value[ "is_quarantined" ] as number,
                executable_measurements_v2_timestamp: unixEpochToISO(value[ "executable_measurements_v2_timestamp" ] as number),
                reported_timestamp: unixEpochToISO(value[ "reported_timestamp" ] as number),
                pk: value[ "pk" ] as number,
                volume_uuid: value[ "volume_uuid" ] as string,
                object_id: value[ "object_id" ] as number,
                fs_type_name: value[ "fs_type_name" ] as string,
                bundle_id: value[ "bundle_id" ] as string,
                policy_match: value[ "policy_match" ] as number,
                malware_result: value[ "malware_result" ] as number,
                flags: value[ "flags" ] as number,
                mod_time: value[ "mod_time" ] as string,
                policy_scan_cache_timestamp: unixEpochToISO(value[ "policy_scan_cache_timestamp" ] as number),
                revocation_check_time: unixEpochToISO(value[ "revocation_check_time" ] as number),
                scan_version: value[ "scan_version" ] as number,
                top_policy_match: value[ "top_policy_match" ] as number,
                evidence: entry.meta.display_path,
                message: value[ "file_identifier" ] as string,
                datetime: unixEpochToISO(value[ "reported_timestamp" ] as number),
                timestamp_desc: "ExecPolicy Reported",
                artifact: "ExecPolicy",
                data_type: "macos:sqlite:execpolicy:entry"
            };

            entries.push(row);
        }
    }

    return entries;
}