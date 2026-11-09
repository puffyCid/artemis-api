import { FileHandle } from "../../types/filesystem/accessor";
import { EncodingError } from "./errors";

/**
 * Read a CSV file into a JSON array. The CSV file must have a header row
 * @param handle `FileHandle` to CSV file to read
 * @param offset Row to start reading at. Default is the first non-header row
 * @param limit How many rows to return. Default is 100
 * @returns 
 */
export function readCsv(handle: FileHandle, offset: number = 0, limit: number = 100): Record<string, string>[] | EncodingError {
    try {
        // @ts-expect-error: Custom Artemis function
        const result = js_read_csv(handle.File, offset, limit);
        return result;
    } catch (err) {
        return new EncodingError("CSV", `failed to read CSV ${JSON.stringify(handle.File)}: ${err}`);
    }
}