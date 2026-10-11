import { AccessorReader } from "../../types/filesystem/accessor";
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
    constructor (path: string) {
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

/**
 * Class that allows the caller to stream reading a file
 * 
 * Supports all `AccessorProtocol` values
 * 
 * Can only be used through the `Accessor` class via `open_reader` or `open_reader_handle`
 */
export class Reader {
    /**
     * An `AccessorReader` that allows you to stream bytes
     * from a file.
     * 
     * Supports all `AccessorProtocol` values
     */
    private reader: unknown;


    /**
     * Setup a `Reader` using the `Accessor`
     * @param reader `AccessorReader` return from `Accessor`
     */
    constructor (reader: AccessorReader) {
        this.reader = reader;
    }


    /**
     * Function to read bytes from a file
     * @param offset Offset to start reading bytes
     * @param bytes How many bytes that should be read
     * @returns `Uint8Array` or `FileError`
     */
    public readAt(offset: number, bytes: number): Uint8Array | FileError {
        if (offset < 0) {
            return new FileError(`READER`, `Cannot seek to negative offset ${offset}`);
        }
        if (bytes < 0) {
            return new FileError(`READER`, `Cannot read to negative bytes ${bytes}`);
        }

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.reader.read_at(offset, bytes);
            return results;
        } catch (err) {
            return new FileError(`READER`, `could not read bytes ${err} at offset ${offset}`);
        }
    }

    /**
     * Function to read bytes at current offset
     * @param bytes How many bytes to read
     * @returns `Uint8Array` or `FileError`
     */
    public read(bytes: number): Uint8Array | FileError {
        if (bytes < 0) {
            return new FileError(`READER`, `Cannot read to negative bytes ${bytes}`);
        }

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.reader.read(bytes);
            return results;
        } catch (err) {
            return new FileError(`READER`, `could not read bytes ${err}`);
        }
    }

    /**
     * Seek to provided offset. Seek always start from start of the fiel
     * @param offset Where to jump to in the file
     * @returns Current offset or `FileError`
     */
    public seek(offset: number): number | FileError {
        if (offset < 0) {
            return new FileError(`READER`, `Cannot seek to negative offset ${offset}`);
        }

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.reader.seek(offset);
            return results;
        } catch (err) {
            return new FileError(`READER`, `could not seek ${err}`);
        }
    }
}