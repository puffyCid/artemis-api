import { AccessorProtocol, AccessorReader, DirEntry, DirHandle, EntryMeta, FileHandle, GlobMatch, SourceHandle } from "../../types/filesystem/accessor";
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
    public readFile(path: string, protocol = AccessorProtocol.Host): Uint8Array | FileError {
        const target = this.setTarget(path, protocol);

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
    public readFileHandle(handle: FileHandle): Uint8Array | FileError {
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
    public readDir(path: string, protocol = AccessorProtocol.Host): DirEntry[] | FileError {
        const target = this.setTarget(path, protocol);

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
    public readDirHandle(handle: DirHandle): DirEntry[] | FileError {
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
        const target = this.setTarget(path, protocol);

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
    public statHandle(handle: FileHandle): EntryMeta | FileError {
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
    public statDirHandle(handle: DirHandle): Uint8Array | FileError {
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
        const target = this.setTarget(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.globfs(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not glob path ${target}: ${err}`);
        }
    }

    /**
     * Open a file for reading. You can stream a file with this function
     * @param path Path to file to return a initialized `Reader` for
     * @param protocol `AccessorProtocol` to use use for the `Reader`
     * @returns `Reader` or `FileError`
     */
    public openReader(path: string, protocol = AccessorProtocol.Host): AccessorReader | FileError {
        const target = this.setTarget(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.open_reader(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not open reader for path ${target}: ${err}`);
        }
    }

    /**
     * Open a `FileHandle` for reading. You can stream a file with this function
     * @param handle `FileHandle` to read
     * @returns `Reader` or `FileError`
     */
    public openReaderHandle(handle: FileHandle): AccessorReader | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.open_reader_handle(handle.File);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not open reader for handle '${JSON.stringify(handle.File)}': ${err}`);
        }
    }

    /**
     * Open a source based on the `AccessorProtocol`.
     * 
     * This can be used to open a source for multiple actions.
     * 
     * For example, opening a NTFS live volume, globbing for files, and then reading them
     * @param path Path to accessor source
     * @param protocol `AccessorProtocol` to use for the source. Default is `AccessorProtocol.Host`
     * @returns `SourceHandle` or `FileError`
     */
    public openSource(path: string, protocol = AccessorProtocol.Host): SourceHandle | FileError {
        const target = this.setTarget(path, protocol);

        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.open_source(target);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not open source for path ${target}: ${err}`);
        }
    }

    /**
     * Read a file from an open source
     * @param source `SourceHandle` object
     * @param path Path to file to read
     * @returns `Uint8Array` or `FileError`
     */
    public sourceReadFile(source: SourceHandle, path: string): Uint8Array | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_read_file(source, path);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read file ${path} with source handle: ${err}`);
        }
    }

    public sourceReadFileHandle(source: SourceHandle, handle: FileHandle): Uint8Array | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_read_file_handle(source, handle.File);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read FIleHandle ${JSON.stringify(handle.File)} with source handle: ${err}`);
        }
    }

    public sourceReadDir(source: SourceHandle, path: string): DirEntry[] | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_read_dir(source, path);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read directory ${path} with source handle: ${err}`);
        }
    }

    public sourceReadDirHandle(source: SourceHandle, handle: DirHandle): DirEntry[] | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_read_dir_handle(source, handle.Directory);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not read DirHandle ${JSON.stringify(handle.Directory)} with source handle: ${err}`);
        }
    }

    public sourceStat(source: SourceHandle, path: string): EntryMeta | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_stat(source, path);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not stat ${path} with source handle: ${err}`);
        }
    }

    public sourceStatHandle(source: SourceHandle, handle: FileHandle): EntryMeta | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_stat_handle(source, handle.File);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not stat FIleHandle ${JSON.stringify(handle.File)} with source handle: ${err}`);
        }
    }

    public sourceStatDirHandle(source: SourceHandle, handle: DirHandle): EntryMeta | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_stat_dir_handle(source, handle.Directory);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not stat DirHandle ${JSON.stringify(handle.Directory)} with source handle: ${err}`);
        }
    }

    public sourceGlobfs(source: SourceHandle, path: string): GlobMatch[] | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_globfs(source, path);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not glob ${path} with source handle: ${err}`);
        }
    }

    /**
    * Open a file for reading. You can stream a file with this function
    * @param path Path to file to return a initialized `Reader` for
    * @param protocol `AccessorProtocol` to use use for the `Reader`
    * @returns `Reader` or `FileError`
    */
    public sourceOpenReader(source: SourceHandle, path: string): AccessorReader | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_open_reader(source, path);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not open reader for path ${path} with source handle: ${err}`);
        }
    }

    /**
     * Open a `FileHandle` for reading. You can stream a file with this function
     * @param handle `FileHandle` to read
     * @returns `Reader` or `FileError`
     */
    public sourceOpenReaderHandle(source: SourceHandle, handle: FileHandle): AccessorReader | FileError {
        try {
            // @ts-expect-error: Custom Artemis class function
            const results = this.accessor.source_open_reader_handle(source, handle.File);
            return results;
        } catch (err) {
            return new FileError(`ACCESSOR`, `could not open reader for handle '${JSON.stringify(handle.File)}' with source handle: ${err}`);
        }
    }

    private setTarget(path: string, protocol: AccessorProtocol): string {
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
