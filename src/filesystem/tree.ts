import { Accessor } from "../../mod";
import { FileError } from "./errors";
import { DirectoryEntry, DirEntry, DirHandle, EntryKind, FileEntry, GlobMatch, SourceHandle } from "../../types/filesystem/accessor";

/**
 * Function to check if a `DirEntry` value is `FileEntry`.
 * 
 * `DirEntry` is simply an object that represents what is inside a directory (or folder).  
 * It can be a file, socket, another directory, or anything represented by `EntryKind`
 * @param entry `DirEntry` object
 * @returns boolean that guarantees the `DirEntry` value is a file
 */
export function isFileEntry(entry: DirEntry): entry is FileEntry {
    return entry.meta.kind === EntryKind.File;
}

/**
 * Function to check if a `DirEntry` value is `DirectoryEntry`.
 * 
 * `DirEntry` is simply an object that represents what is inside a directory (or folder).  
 * It can be a file, socket, another directory, or anything represented by `EntryKind`
 * @param entry `DirEntry` object
 * @returns boolean that guarantees the `DirEntry` value is a directory
 */
export function isDirectoryEntry(entry: DirEntry): entry is DirectoryEntry {
    return entry.meta.kind === EntryKind.Directory;
}

/**
 * Class to interact with opened `SourceHandle` directory.  
 * Can be used to search for files or directories relative to the `SourceHandle` directory
 * 
 * Useful when you want to do follow up parsing of different files or data
 */
export class DirectoryTree {
    private readonly accessor: Accessor;
    private readonly source: SourceHandle;
    private root: DirHandle;
    private rootKey: string;
    private readonly caseInsensitive: boolean;
    private readonly listings = new Map<string, DirEntry[] | FileError>();

    /**
     * Initialize a `DirectoryTree` class
     * @param accessor `Accessor` associated with the `SourceHandle`
     * @param source `SourceHandle` that is associated with the base directory
     * @param root `DirHandle` for the base directory
     * @param rootKey Unique path for the base directory. Represented by `meta.display_path`
     * @param caseInsensitive Match names without regard case sensitivity. Default is false
     */
    constructor (accessor: Accessor, source: SourceHandle, root: DirHandle, rootKey: string, caseInsensitive = false) {
        this.accessor = accessor;
        this.source = source;
        this.root = root;
        this.rootKey = rootKey;
        this.caseInsensitive = caseInsensitive;
    }

    /**
     * Function to initialize a `DirectoryTree` class
     * @param accessor `Accessor` associated with the `SourceHandle`
     * @param source `SourceHandle` that is associated with the root directory
     * @param entry `DirHandle` or `GlobMatch` for the base directory
     * @param caseInsensitive Match names without regard case sensitivity. Default is false
     * @returns `DirectoryTree` class or `FileError`
     */
    public static fromEntry(accessor: Accessor, source: SourceHandle, entry: GlobMatch | DirEntry, caseInsensitive = false): DirectoryTree | FileError {
        if (entry.meta.kind !== EntryKind.Directory) {
            return new FileError(`ACCESSOR`, `failed to create 'DirectoryTree'. '${entry.meta.display_path}' is not a directory`);
        }

        return new DirectoryTree(accessor, source, entry.handle as DirHandle, entry.meta.display_path, caseInsensitive);
    }

    /**
     * Function to list contents of a directory
     * @param relative Path to list directory contents. Default is base directory associated with the `DirectoryTree`
     * @returns Array of `DirEntry`
     */
    public children(relative = ""): DirEntry[] {
        const dir = this.resolveDirectory(relative);
        if (dir instanceof FileError) {
            return [];
        }

        const entries = this.list(dir.handle, dir.key);
        if (entries instanceof FileError) {
            return [];
        }

        return entries;
    }

    /**
     * Function to list only files of a directory
     * @param relative Path to list directory contents. Default is base directory associated with the `DirectoryTree`
     * @returns Array of `FileEntry`
     */
    public files(relative = ""): FileEntry[] {
        return this.children(relative).filter(isFileEntry);
    }

    /**
     * Function to list only directories of a directory
     * @param relative Path to list directory contents. Default is base directory associated with the `DirectoryTree`
     * @returns Array of `DirectoryEntry`
     */
    public directories(relative = ""): DirectoryEntry[] {
        return this.children(relative).filter(isDirectoryEntry);
    }

    /**
     * Search for a file starting from the relative directory from the `DirectoryTree`
     * @param relative Path to start the file search
     * @returns `FileEntry` or `FileError`
     */
    public file(relative: string): FileEntry | FileError {
        const entry = this.find(relative);
        if (entry instanceof FileError) {
            return entry;
        }

        if (!isFileEntry(entry)) {
            return new FileError(`ACCESSOR`, `'${entry.meta.display_path}' is not a file`);
        }

        return entry;
    }

    /**
     * Search for a directory starting from the relative directory from the `DirectoryTree`
     * @param relative Path to start the directory search
     * @returns `DirectoryEntry` or `FileError`
     */
    public directory(relative: string): DirectoryEntry | FileError {
        const entry = this.find(relative);
        if (entry instanceof FileError) {
            return entry;
        }

        if (!isDirectoryEntry(entry)) {
            return new FileError(`ACCESSOR`, `'${entry.meta.display_path}' is not a directory`);
        }

        return entry;
    }

    /**
     * Search for any entry starting from the relative directory from the `DirectoryTree`
     * @param relative Path to start the search
     * @returns `DirEntry` or `FileError`
     */
    public find(relative: string): DirEntry | FileError {
        const parts = this.segments(relative);
        if (parts.includes("..")) {
            return new FileError(`ACCESSOR`, `'..' is not allowed in ${relative}`);
        }
        const name = parts.pop();
        if (name === undefined) {
            return new FileError(`ACCESSOR`, `empty path provided under '${this.rootKey}'`);
        }

        const dir = this.resolveDirectory(parts.join("/"), relative);
        if (dir instanceof FileError) {
            return dir;
        }

        const entries = this.list(dir.handle, dir.key);
        if (entries instanceof FileError) {
            return entries;
        }

        const matcher = this.segmentMatcher(name, true);
        const entry = entries.find((value) => matcher(value.name));
        if (entry === undefined) {
            return this.notFound(relative);
        }

        return entry;
    }

    /**
     * Glob for entries from the relative base directory.  
     * This lets us glob from a base directory directory  
     * without have to constantly glob from the root of the file system
     * @param pattern Glob patter to apply
     * @returns Array of `DirEntry`
     */
    public glob(pattern: string): DirEntry[] {
        const matches: DirEntry[] = [];
        this.globFrom(this.root, this.rootKey, this.segments(pattern), matches);

        return matches;
    }

    /**
     * List contents of a directory
     * @param handle `DirHandle` object
     * @param key Key to look up for cached directory content 
     * @returns Array of `DirEntry` or `FileError`
     */
    private list(handle: DirHandle, key: string): DirEntry[] | FileError {
        // If we already listed the contents of a directory
        // Return the cached value
        // Cached hits may not have accurate file sizes or timestamps
        // or if new files are added we will not get them
        const cached = this.listings.get(key);
        if (cached !== undefined) {
            return cached;
        }

        // Read contents of a directory by `DirHandle`
        // **Should** allow us to read a directory without having to walk the entire filesystem
        const result = this.accessor.sourceReadDirHandle(this.source, handle);
        if (result instanceof FileError) {
            const err = new FileError(`ACCESSOR`, `could not list directory ${key}: ${result}`);
            console.warn(err);

            this.listings.set(key, err);
            return err;
        }

        // Cache the contents
        // This is just light metadata
        this.listings.set(key, result);
        return result;
    }

    /**
     * Function to descend into directories.  
     * @param relative Path to target directory
     * @param reported Original relative target directory
     * @returns 
     */
    private resolveDirectory(relative: string, reported = relative): { handle: DirHandle; key: string; } | FileError {
        let handle = this.root;
        let key = this.rootKey;

        // Loop through all path segments
        for (const part of this.segments(relative)) {
            if (part === "..") {
                return new FileError(`ACCESSOR`, `'..' is not allowed in ${reported}`);
            }
            const entries = this.list(handle, key);
            if (entries instanceof FileError) {
                return entries;
            }

            const matcher = this.segmentMatcher(part, true);
            // Check folder match
            const next = entries.find((value) => matcher(value.name));
            if (next === undefined) {
                return this.notFound(reported);
            }

            if (!isDirectoryEntry(next)) {
                return new FileError(`ACCESSOR`, `'${next.meta.display_path}' is not a directory. Looking for '${reported}' under '${this.rootKey}'`);
            }

            handle = next.handle;
            key = next.meta.display_path;
        }

        return { handle, key };
    }

    /**
     * Creates a predicate that checks if an entry name matches one segment of a path
     * @param segment Path segment value. '*' and '?' are treated as wild cards unless 'literal' is true
     * @param literal Treat segment values a literal string. Ex: 'Images*'as literal string vs glob
     * @returns Function that returns true when a directory entry name matches
     */
    private segmentMatcher(segment: string, literal = false): (name: string) => boolean {
        const compare = (value: string): string => this.caseInsensitive ? value.toLocaleLowerCase() : value;
        if (literal || !/[*?]/.test(segment)) {
            const wanted = compare(segment);
            return (name) => compare(name) === wanted;
        }

        const escaped = segment.replace(/[.+^${}()|[\]\\]/g, "\\$&").replaceAll("*", ".*").replaceAll("?", ".");
        const regex = new RegExp(`^${escaped}$`, this.caseInsensitive ? "is" : "s");
        return (name) => regex.test(name);
    }

    /**
     * Function to split relative path into individual segments
     * @param relative Directory path relative from base directory of the `DirectoryTree`
     * @returns 
     */
    private segments(relative: string): string[] {
        return relative.split(/[\\/]+/).filter((part) => part !== "" && part !== ".");
    }

    /**
     * Glob for values from the base directory of the `DirectoryTree` object
     * @param handle `DirHandle` object
     * @param key Path to descend into
     * @param parts Individual path segments
     * @param matches Array of `DirEntry` values that matched the glob
     * @returns Values that matched to glob pattern
     */
    private globFrom(handle: DirHandle, key: string, parts: string[], matches: DirEntry[]): void {
        const [ head, ...rest ] = parts;
        if (head === undefined) {
            return;
        }

        const entries = this.list(handle, key);
        if (entries instanceof FileError) {
            return;
        }

        const matcher = this.segmentMatcher(head);
        for (const entry of entries) {
            if (!matcher(entry.name)) {
                continue;
            }

            if (rest.length === 0) {
                matches.push(entry);
                continue;
            }

            if (isDirectoryEntry(entry)) {
                this.globFrom(entry.handle, entry.meta.display_path, rest, matches);
            }
        }
    }

    /**
     * Function to construct `FileError`
     * @param relative Relative path we tried to accessed
     * @returns `FileError`
     */
    private notFound(relative: string): FileError {
        return new FileError(`ACCESSOR`, `${relative} not found under ${this.rootKey}`);
    }
}