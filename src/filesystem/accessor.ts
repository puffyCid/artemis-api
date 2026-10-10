import { AccessorProtocol, DirEntry, DirHandle, EntryMeta, FileHandle, GlobMatch } from "../../types/filesystem/accessor";
import { FileError } from "./errors";

/**
 * Class that exposes the artemis `Accessor`
 */
export class Accessor {
    private accessor: unknown;

    /**
     * Create the `Accessor`
     */
    constructor () {
        // @ts-expect-error: Custom Artemis class
        this.accessor = new JsAccessor();
    }

    /**
     * Read a file using the `Accessor`. You can only read files smaller than 2 GB
     * @param path Path to the file to read
     * @param protocol `AccessorProtocol` to use when reading the file. Default is `AccessorProtocol.Host`
     * @returns File content bytes or `FileError`
     */
    public read_file(path: string, protocol = AccessorProtocol.Host): Uint8Array | FileError {
        const target = this.set_target(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.read_file(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read file ${target}: ${err}`);
        }
    }

    /**
     * Read a `FileHandle` using the `Accessor`. You can only read files smaller than 2 GB. 
     *  
     * Reading a `FileHandle` lets artemis read a file directly instead of walking the file system 
     * to find. 
     * 
     * Useful when parsing the NTFS filesystem
     * @param handle `FileHandle` to read
     * @returns File content bytes or `FileError`
     */
    public read_file_handle(handle: FileHandle): Uint8Array | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.read_file_handle(handle.File);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read FileHandle '${JSON.stringify(handle.File)}': ${err}`);
        }
    }

    /**
     * Read a directory using the `Accessor`.
     * @param path Path to the directory to read
     * @param protocol `AccessorProtocol` to use when reading the file. Default is `AccessorProtocol.Host`
     * @returns Array of `DirEntry` or `FileError`
     */
    public read_dir(path: string, protocol = AccessorProtocol.Host): DirEntry[] | FileError {
        const target = this.set_target(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.read_dir(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read directory ${target}: ${err}`);
        }
    }

    /**
     * Read a `DirHandle` using the `Accessor`.
     *  
     * Reading a `DirHandle` lets artemis read a directory directly instead of walking the file system 
     * to find. 
     * 
     * Useful when parsing the NTFS filesystem
     * @param handle `DirHandle` to read
     * @returns Array of `DirEntry` or `FileError`
     */
    public read_dir_handle(handle: DirHandle): DirEntry[] | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.read_dir_handle(handle.Directory);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read DirHandle '${JSON.stringify(handle.Directory)}': ${err}`);
        }
    }

    /**
     * Stat a file using the `Accessor`. 
     * @param path Path to the file to read
     * @param protocol `AccessorProtocol` to use when reading the file. Default is `AccessorProtocol.Host`
     * @returns `EntryMeta` value or `FileError`
     */
    public stat(path: string, protocol = AccessorProtocol.Host): EntryMeta | FileError {
        const target = this.set_target(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.stat(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not stat file ${target}: ${err}`);
        }
    }

    /**
     * Stat a `FileHandle` using the `Accessor`.
     *  
     * Stat a `FileHandle` lets artemis stat a file directly instead of walking the file system 
     * to find. 
     * 
     * Useful when parsing the NTFS filesystem
     * @param handle `FileHandle` to read
     * @returns `EntryMeta` value or `FileError`
     */
    public stat_handle(handle: FileHandle): EntryMeta | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.stat_handle(handle.File);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read FileHandle '${JSON.stringify(handle.File)}': ${err}`);
        }
    }

    /**
     * Stat a `DirHandle` using the `Accessor`.
     *  
     * Stat a `DirHandle` lets artemis stat a file directly instead of walking the file system 
     * to find. 
     * 
     * Useful when parsing the NTFS filesystem
     * @param handle `DirHandle` to stat
     * @returns `EntryMeta` value or `FileError`
     */
    public stat_dir_handle(handle: DirHandle): Uint8Array | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.stat_dir_handle(handle.Directory);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not stat DirHandle '${JSON.stringify(handle.Directory)}': ${err}`);
        }
    }

    /**
     * Glob a provided path pattern using the `Accessor`. 
     * @param path Pattern to glob
     * @param protocol `AccessorProtocol` to use when reading the file. Default is `AccessorProtocol.Host`
     * @returns Array of `GlobMatch` or `FileError`
     */
    public globfs(path: string, protocol = AccessorProtocol.Host): GlobMatch[] | FileError {
        const target = this.set_target(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.globfs(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not glob path ${target}: ${err}`);
        }
    }

    public open_reader(path: string, protocol = AccessorProtocol.Host) {
        const target = this.set_target(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.open_reader(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not open reader for path ${target}: ${err}`);
        }
    }

    private set_target(path: string, protocol: AccessorProtocol): string {
        let target = path;

        switch (protocol) {
            case AccessorProtocol.Ntfs: {
                target = `ntfs:${target}`;
                break;
            }
            case AccessorProtocol.Zip: {
                target = `zip:${target}`;
                break;
            }
            case AccessorProtocol.Raw: {
                target = `raw:${target}`;
                break;
            }
            default: break;
        }

        return target;
    }
}

export class AccessorReader {
    private reader: unknown;
}