import { ExecPolicy } from "../../../types/macos/execpolicy";
import { ApplicationError } from "../../applications/errors";
import { querySqlite } from "../../applications/sqlite";
import { unixEpochToISO } from "../../time/conversion";
import { MacosError } from "../errors";

/**
 * Function to parse the `ExecPolicy` on a macOS system
 * @param path Optional alternative path to exec policy file. If none provided will use default file
 * @returns Array of `ExecPolicy` records or `MacosError`
 */
export function execPolicy(alt_file?: string): ExecPolicy[] | MacosError {
    let path = "/var/db/SystemPolicy/Configuration/ExecPolicy";
    if (alt_file !== undefined) {
        path = alt_file;
    }

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

    const entries: ExecPolicy[] = [];
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new MacosError(
            `EXECPOLICY`,
            `failed to query ${path}: ${results}`,
        );
    }

    for (const entry of results) {
        const row: ExecPolicy = {
            is_signed: entry["is_signed"] as number,
            file_identifier: entry["file_identifier"] as string,
            bundle_identifier: entry["bundle_identifier"] as string,
            bundle_version: entry["bundle_version"] as string,
            team_identifier: entry["team_identifier"] as string,
            signing_identifier: entry["signing_identifier"] as string,
            cdhash: entry["cdhash"] as string,
            main_executable_hash: entry["main_executable_hash"] as string,
            executable_timestamp: unixEpochToISO(entry["executable_timestamp"] as number),
            file_size: entry["file_size"] as number,
            is_library: entry["is_library"] as number,
            is_used: entry["is_used"] as number,
            responsible_file_identifier: entry["responsible_file_identifier"] as string,
            is_valid: entry["is_valid"] as number,
            is_quarantined: entry["is_quarantined"] as number,
            executable_measurements_v2_timestamp: unixEpochToISO(entry["executable_measurements_v2_timestamp"] as number),
            reported_timstamp: unixEpochToISO(entry["reported_timstamp"] as number),
            pk: entry["pk"] as number,
            volume_uuid: entry["volume_uuid"] as string,
            object_id: entry["object_id"] as number,
            fs_type_name: entry["fs_type_name"] as string,
            bundle_id: entry["bundle_id"] as string,
            policy_match: entry["policy_match"] as number,
            malware_result: entry["malware_result"] as number,
            flags: entry["flags"] as number,
            mod_time: entry["mod_time"] as string,
            policy_scan_cache_timestamp: unixEpochToISO(entry["policy_scan_cache_timestamp"] as number),
            revocation_check_time: unixEpochToISO(entry["revocation_check_time"] as number),
            scan_version: entry["scan_version"] as number,
            top_policy_match: entry["top_policy_match"] as number,
            evidence: path
        };

        entries.push(row);
    }

    return entries;
}