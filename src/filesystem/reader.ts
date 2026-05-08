import { FileError } from "./errors";

/**
 * Class that exposes a simple reader to allow caller to stream reading a file
 */
export class BufReader {
    private reader: unknown;
    /**
     * Start reading a file
     * @param path Full path to file that should be streamed
     */
    constructor(path: string) {
        // @ts-expect-error: Custom Artemis class
        this.reader = new JsBufReader(path);
    }

    /**
     * Function to read bytes from a file
     * @param offset Offset to start reading bytes
     * @param bytes How many bytes that should be read
     * @returns `Uint8Array` or `FileError`
     */
    public readBytes(offset: number, bytes: number): Uint8Array | FileError {
        if (offset < 0) {
            return new FileError(`READER`, `Cannot seek to negative offset ${offset}`);
        }
        if (bytes < 0) {
            return new FileError(`READER`, `Cannot read to negative bytes ${bytes}`);
        }

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.reader.read(offset, bytes);
            return results;
        } catch (err) {
            return new FileError(`READER`, `could not read bytes ${err}`);
        }
    }
}