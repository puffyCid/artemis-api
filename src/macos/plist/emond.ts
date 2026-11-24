import { AccessorProtocol, EntryKind, FileHandle } from "../../../types/filesystem/accessor";
import { Emond } from "../../../types/macos/plist/emond";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";
import { MacosError } from "../errors";
import { getPlist } from "../plist";

/**
 * Function to parse the `Emond` rules on a macOS system
 * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` The default is `AccesssorProtocol.Host`.
 * @param alt_path Optional alternative path to `Emond` files
 * @returns Array of `Emond` rules or `MacosError`
 */
export function emondRules(protocol = AccessorProtocol.Host, alt_path?: string): Emond[] | MacosError {
    const path = alt_path ?? "/etc/emond.d/rules/*";
    const accessor = new Accessor();

    const matches = accessor.globfs(path, protocol);
    if (matches instanceof FileError) {
        return new MacosError(`EMOND`, `failed to glob for ${path}: ${matches}`);
    }

    const results: Emond[] = [];
    for (const entry of matches) {
        if (entry.meta.kind !== EntryKind.File) {
            continue;
        }

        const bytes = accessor.readFileHandle(entry.handle as FileHandle);
        if (bytes instanceof FileError) {
            continue;
        }

        const plist_data = getPlist(bytes);
        if (plist_data instanceof MacosError) {
            console.error(`Failed to read plist file '${entry.meta.display_path}': ${plist_data}`);
            continue;
        }

        const value: Emond = {
            plist_data,
            evidence: entry.meta.display_path,
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
    const results = emondRules(AccessorProtocol.Host, emond_test);
    if (results instanceof MacosError) {
        throw console.log(results);
    }

    if (results.length !== 2) {
        throw `Got ${results.length} wanted "2".......testEmond ❌`;
    }
}