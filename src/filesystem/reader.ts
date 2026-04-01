import { FileError } from "./errors";

export class BufReader {
    private reader: unknown;
    constructor(path: string) {
        // @ts-expect-error: Custom Artemis class
        this.reader = new JsBufReader(path);
    }

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