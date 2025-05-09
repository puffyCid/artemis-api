import { Bam } from "../../../types/windows/registry/bam";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { getEnvValue } from "../../environment/env";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedEightBytes } from "../../nom/helpers";
import { filetimeToUnixEpoch, unixEpochToISO } from "../../time/conversion";
import { WindowsError } from "../errors";
import { getRegistry } from "../registry";

/**
 * Function to extract Background Activities Manager entries from Registry
 * @param alt_path Optional path to the SYSTEM Registry file
 * @returns Array of `Bam` or `WindowsError`
 */
export function backgroundActivitiesManager(alt_path?: string): Bam[] | WindowsError {
    let path =  `${getEnvValue("SystemDrive")}\\Windows\\System32\\config\\SYSTEM`;
    if(alt_path != undefined) {
        path = alt_path;
    }
    const reg_data = getRegistry(path);
    if(reg_data instanceof WindowsError) {
        return new WindowsError(`BAM`, `failed to parse ${path}: ${reg_data}`);
    }

    const values: Bam[] = [];
    for(const entry of reg_data) {
        if(!entry.path.includes("Services\\bam\\State\\UserSettings\\")) {
            continue;
        }

        if(entry.name === "Version" || entry.name === "SequenceNumber") {
            continue;
        }

        for(const value of entry.values) {
            const data = decode(value.data);
            if(data instanceof EncodingError) {
                continue;
            }

            const timestamp = nomUnsignedEightBytes(data, Endian.Le);
            if(timestamp instanceof NomError) {
                continue;
            }

            const last_execution = unixEpochToISO(filetimeToUnixEpoch(timestamp.value));
            const bam_entry: Bam = {
                key_path: entry.path,
                reg_path: entry.registry_path,
                sid: entry.name,
                path: value.value,
                last_execution,
            }

            values.push(bam_entry);
        }
    }
    return values;
}