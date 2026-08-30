import { Emond } from "../../../types/macos/plist/emond";
import { FileError } from "../../filesystem/errors";
import { glob } from "../../filesystem/files";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to parse the `Emond` rules on a macOS system
 * @param path Optional alternative glob to `Emond` files. If none provided will use default path
 * @returns Array of `Emond` rules or `MacosError`
 */
export function emondRules(alt_glob?: string): Emond[] | MacosError {
    let path_glob = "/etc/emond.d/rules/*";

    if (alt_glob !== undefined) {
        path_glob = alt_glob;
    }

    const paths = glob(path_glob);
    if (paths instanceof FileError) {
        return new MacosError(`EMOND`, `Could not glob ${path_glob}: ${paths}`);
    }

    const results: Emond[] = [];

    for (const path of paths) {
        if (!path.is_file) {
            continue;
        }

        const plist_data = getPlist(path.full_path);
        if (plist_data instanceof MacosError) {
            console.error(`Failed to read plist file ${path.full_path}: ${plist_data}`);
            continue;
        }

        const value: Emond = {
            plist_data,
            evidence: path.full_path,
        };

        results.push(value);
    }

    return results;
}

/**
 * Function to test Emond parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the Emond parsing
 */
export function testEmondRules(): void {
    const emond_test = "../../test_data/macos/emond/*";
    const results = emondRules(emond_test);
    if (results instanceof MacosError) {
        throw console.log(results);
    }

    if (results.length !== 2) {
        throw `Got ${results.length} wanted "2".......testEmond ❌`;
    }
}