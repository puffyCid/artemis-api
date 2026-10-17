import { Accessor } from "../../../mod";
import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { Bam } from "../../../types/windows/registry/bam";
import { decode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { getSystemDrive } from "../../environment/env";
import { FileError } from "../../filesystem/errors";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedEightBytes } from "../../nom/helpers";
import { filetimeToIso } from "../../time/conversion";
import { WindowsError } from "../errors";
import { getRegistry } from "../registry";

/**
 * Function to extract Background Activities Manager entries from Registry
 * @param [protocol=AccessorProtocol.Ntfs] `AccessorProtocol` The default is `AccesssorProtocol.Ntfs`.
 * @param alt_path Optional path to the SYSTEM Registry file
 * @returns Array of `Bam` or `WindowsError`
 */
export function backgroundActivitiesManager(protocol = AccessorProtocol.Ntfs, alt_path?: string): Bam[] | WindowsError {
    const accessor = new Accessor();
    const drive = getSystemDrive();

    let path = `${drive}\\Windows\\System32\\config\\SYSTEM`;
    if (alt_path !== undefined) {
        path = alt_path;
    }

    // Based on the `AccessorProtocol` glob for SYSTEM files
    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new WindowsError('BAM', `failed to glob for ${path}: ${matches}`);
    }

    const values: Bam[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        const reg_data = getRegistry(entry.handle as FileHandle);
        if (reg_data instanceof WindowsError) {
            return new WindowsError(`BAM`, `failed to parse ${path}: ${reg_data.message}`);
        }

        for (const reg of reg_data) {
            if (!reg.path.includes("Services\\bam\\State\\UserSettings\\")) {
                continue;
            }

            if (reg.name === "Version" || reg.name === "SequenceNumber") {
                continue;
            }

            for (const value of reg.values) {
                const data = decode(value.data);
                if (data instanceof EncodingError) {
                    continue;
                }

                const timestamp = nomUnsignedEightBytes(data, Endian.Le);
                if (timestamp instanceof NomError) {
                    continue;
                }

                const last_execution = filetimeToIso(timestamp.value);
                const bam_entry: Bam = {
                    key_path: reg.path,
                    reg_path: reg.evidence,
                    sid: reg.name,
                    path: value.value,
                    last_execution,
                    message: `BAM: ${value.value}`,
                    datetime: last_execution,
                    timestamp_desc: "Last Execution",
                    artifact: "Windows Background Activity Monitor",
                    data_type: "windows:registry:bam:entry",
                    evidence: entry.meta.display_path,
                };

                values.push(bam_entry);
            }
        }
    }


    return values;
}