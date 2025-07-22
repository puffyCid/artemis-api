import { getPlist, parseCookies, queryTccDb } from "../../../../mod";
import {
    FileType,
    ManifestApp,
} from "../../../../types/ios/itunes/manifest";
import { FileError } from "../../../filesystem/errors";
import { readTextFile } from "../../../filesystem/files";
import { MacosError } from "../../../macos/errors";
import { Output, outputResults } from "../../../system/output";
import { IosError } from "../../error";
import { parseManifestAppPlist } from "../../itunes/apps";

/**
 * Function to extract osanalytics info
 * @param app_paths Array of `ManifestApp`
 * @param db_path iTunes backup directory
 * @param output `Output` configuration object
 */
export function extractOsAnalytics(app_paths: ManifestApp[],
    db_path: string,
    output: Output,
) {
    for (const path of app_paths) {
        if (path.file_type !== FileType.IsFile) {
            continue;
        }

        const info = parseManifestAppPlist(path.file);
        if (info instanceof IosError) {
            continue;
        }

        const target = `${db_path}/${path.directory}/${path.fileID}`;

        if (info.path.endsWith(".ips")) {
            const text = readTextFile(target);
            if (text instanceof FileError) {
                continue;
            }

            // IPS files seem to ndjson files but with the second JSON entry in "pretty format"
            // First line is proper single line JSON object
            // Second object is pretty formatted
            const first_json = text.trim().split("\n", 1).at(0) ?? "";
            const second_json = JSON.parse(text.replace(first_json, ""));
            console.log(second_json);

            let status = outputResults(
                [ JSON.parse(first_json), second_json ],
                "syssharedcontainer_apple_osanalytics_diagnostic_reports",
                output,
            );
            console.log(status);
            continue;
        }
        console.log(target);
        console.log(info.path);
    }
}