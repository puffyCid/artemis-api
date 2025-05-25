import { AppState } from "../../../../types/ios/home/appstate";
import { ApplicationError } from "../../../applications/errors";
import { querySqlite } from "../../../applications/sqlite";
import { decode } from "../../../encoding/base64";
import { EncodingError } from "../../../encoding/errors";
import { MacosError } from "../../../macos/errors";
import { getPlist } from "../../../macos/plist";
import { IosError } from "../../error";

/**
 * Function to extract app state data from database
 * @param path Path to app state sqlite db
 * @returns Array of `AppState` or `IosError`
 */
export function extractAppState(path: string): AppState[] | IosError {
    const query = `SELECT 
                    kvs.id AS kvs_id, 
                    kvs.application_identifier AS app_id, 
                    kvs.key AS kvs_key, 
                    kvs.value AS plist_data, 
                    key_tab.id AS plist_type_id, 
                    key_tab.key AS plist_type, 
                    application_identifier_tab.application_identifier AS app_name, 
                    kvs_debug.value AS debug_plist, 
                    kvs_debug.key AS debug_plist_type 
                   FROM 
                    kvs 
                   INNER JOIN key_tab ON kvs_key = plist_type_id 
                   INNER JOIN application_identifier_tab ON app_id = application_identifier_tab.id 
                   INNER JOIN kvs_debug ON app_name = kvs_debug.application_identifier 
                   AND kvs_debug.key = plist_type 
                   ORDER BY 
                    app_name;`;
    const results = querySqlite(path, query);
    if (results instanceof ApplicationError) {
        return new IosError(
            `APPSTATE`,
            `failed to query appt state db: ${results}`
        );
    }

    const states: AppState[] = [];
    for (const entry of results) {
        const state: AppState = {
            app_id: entry[ "app_id" ] as number,
            app_name: entry[ "app_name" ] as string,
            plist_data: {},
            plist_type_id: entry[ "plist_type_id" ] as number,
            plist_type: entry[ "plist_type" ] as string,
            debug_plist: {},
            debug_plist_type: entry[ "debug_plist_type" ] as string,
        };
        let plist_bytes = decode(entry[ "plist_data" ] as string);
        if (plist_bytes instanceof EncodingError) {
            states.push(state);
            continue;
        }

        let plist_value = getPlist(new Uint8Array(plist_bytes));
        if (plist_value instanceof MacosError) {
            states.push(state);
            continue;
        }

        if (Array.isArray(plist_value)) {
            let value = getPlist(new Uint8Array(plist_value as number[]));
            if (value instanceof MacosError) {
                states.push(state);
                continue;
            }
            state.plist_data = value as
                | Record<string, unknown>
                | Record<string, unknown>[];
        } else {
            state.plist_data = plist_value as
                | Record<string, unknown>
                | Record<string, unknown>[];
        }

        state.plist_data = plist_value as
            | Record<string, unknown>
            | Record<string, unknown>[];
        plist_bytes = decode(entry[ "debug_plist" ] as string);
        if (plist_bytes instanceof EncodingError) {
            states.push(state);
            continue;
        }

        plist_value = getPlist(new Uint8Array(plist_bytes));
        if (plist_value instanceof MacosError) {
            states.push(state);
            continue;
        }

        if (Array.isArray(plist_value)) {
            let value = getPlist(new Uint8Array(plist_value as number[]));
            if (value instanceof MacosError) {
                states.push(state);
                continue;
            }
            state.plist_data = value as
                | Record<string, unknown>
                | Record<string, unknown>[];
        } else {
            state.debug_plist = plist_value as
                | Record<string, unknown>
                | Record<string, unknown>[];
        }

        states.push(state);
    }

    return states;
}
