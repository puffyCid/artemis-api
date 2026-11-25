import { Accessor } from "./accessor";
import { FileError } from "./errors";
import { AccessorProtocol, DirectoryEntry, DirEntry, DirHandle, EntryKind, FileEntry, GlobMatch, SourceHandle } from "../../types/filesystem/accessor";

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
 * @param entry `DirEntry`
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
    private readonly root: DirHandle;
    private readonly rootKey: string;
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
     * @param entry `DirEntry` or `GlobMatch` for the base directory
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
     * @param relative File path to start the file search. Ex: `Cookies/cookie.sqlite` or `telemetry.db`
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
                return new FileError(`ACCESSOR`, `'${next.meta.display_path}' is not a directory. Found ${next.meta.kind}. Looking for '${reported}' under '${this.rootKey}'`);
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
        const compare = (value: string): string => this.caseInsensitive ? value.toLowerCase() : value;
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

/**
 * Function to test `DirectoryTree`  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the `DirectoryTree`
 */
export function testDirectoryTree(): void {
    const accessor = new Accessor();
    const source = accessor.openSource("host:", AccessorProtocol.Host);
    if (source instanceof FileError) {
        throw `Could not open source: ${source}.......openSource ❌`;
    }

    const base = "../../test_data/filesystem/tree";
    const roots = accessor.sourceGlobfs(source, base);
    const root = roots instanceof FileError ? undefined : roots[ 0 ];
    if (root === undefined) {
        throw `Could not find test directory '${base}'.......globfs ❌`;
    }

    const tree = DirectoryTree.fromEntry(accessor, source, root);
    if (tree instanceof FileError) {
        throw `Could not create tree: ${tree}.......fromEntry ❌`;
    }

    testListing(tree);
    testLookups(accessor, source, tree);
    testLookupErrors(tree);
    testGlob(tree);
    testCaseInsensitive(accessor, source, root);
    testFromEntryRejectsFile(accessor, source, base);
    testCachingAndListFailure();
}

function names(entries: DirEntry[]): string[] {
    return entries.map((entry) => entry.name).sort();
}

function expectNames(label: string, entries: DirEntry[], expected: string[]): void {
    const got = names(entries);
    if (got.join("|") !== expected.join("|")) {
        throw `Got [${got.join(", ")}] expected [${expected.join(", ")}].......${label} ❌`;
    }
}

function expectCount(label: string, got: number, expected: number): void {
    if (got !== expected) {
        throw `Got ${got} expected ${expected}.......${label} ❌`;
    }
}

function expectError(label: string, value: unknown, contains: string): void {
    if (!(value instanceof FileError)) {
        throw `Expected a FileError.......${label} ❌`;
    }
    if (!`${value}`.includes(contains)) {
        throw `Got '${value}' expected message containing '${contains}'.......${label} ❌`;
    }
}

function expectFile(label: string, value: FileEntry | FileError, name: string): FileEntry {
    if (value instanceof FileError) {
        throw `Got '${value}' expected file '${name}'.......${label} ❌`;
    }
    if (value.name !== name) {
        throw `Got '${value.name}' expected '${name}'.......${label} ❌`;
    }
    return value;
}


function testListing(tree: DirectoryTree): void {
    expectNames("children", tree.children(), [ "Extensions", "Network", "a[1]-copy.txt", "a[1].txt", "root.txt" ]);
    expectNames("files", tree.files(), [ "a[1]-copy.txt", "a[1].txt", "root.txt" ]);
    expectNames("directories", tree.directories(), [ "Extensions", "Network" ]);
    expectNames("nested children", tree.children("Network"), [ "Cookies", "Deep" ]);
    expectNames("missing children", tree.children("Missing"), []);
    expectNames("children of a file", tree.children("root.txt"), []);
    console.info(`  Listing ✅`);
}

function testLookups(accessor: Accessor, source: SourceHandle, tree: DirectoryTree): void {
    const rootFile = expectFile("file", tree.file("root.txt"), "root.txt");
    expectFile("nested file", tree.file("Network/Deep/x.txt"), "x.txt");
    expectFile("backslash separators", tree.file("Network\\Deep\\x.txt"), "x.txt");
    expectFile("dot segments", tree.file("./Network/./Cookies"), "Cookies");
    expectFile("brackets are literal", tree.file("a[1].txt"), "a[1].txt");

    const dir = tree.directory("Network/Deep");
    if (dir instanceof FileError || dir.name !== "Deep") {
        throw `Expected directory 'Deep'.......directory ❌`;
    }

    const bytes = accessor.sourceReadFileHandle(source, rootFile.handle);
    if (bytes instanceof FileError || bytes.length !== "tree-root".length) {
        throw `Could not read 'root.txt' by handle.......sourceReadFileHandle ❌`;
    }
    console.info(`  Lookups ✅`);
}

function testLookupErrors(tree: DirectoryTree): void {
    expectError("missing file", tree.file("nope.db"), "nope.db not found");
    expectError("missing parent", tree.file("Network/Missing/x.txt"), "Network/Missing/x.txt not found");
    expectError("directory as file", tree.file("Network"), "is not a file");
    expectError("file as directory", tree.directory("root.txt"), "is not a directory");
    expectError("file used as parent", tree.file("root.txt/x"), "is not a directory");
    expectError("empty path", tree.file(""), "empty path");
    expectError("parent traversal", tree.file("../root.txt"), "'..' is not allowed");
    expectError("parent traversal as name", tree.find("Network/.."), "'..' is not allowed");
    expectNames("parent traversal listing", tree.children("../Network"), []);
    console.info(`  Lookup errors ✅`);
}

function testGlob(tree: DirectoryTree): void {
    const manifests = tree.glob("Extensions/*/manifest.json").map((entry) => entry.meta.display_path).sort();
    if (manifests.length !== 2 || !manifests[ 0 ]?.endsWith("manifest.json")) {
        throw `Got ${manifests.length} expected 2.......glob manifest.json ❌`;
    }

    expectNames("glob root", tree.glob("*.txt"), [ "a[1]-copy.txt", "a[1].txt", "root.txt" ]);
    expectNames("glob regex metacharacters", tree.glob("a[1]*.txt"), [ "a[1]-copy.txt", "a[1].txt" ]);
    expectNames("glob single character", tree.glob("roo?.txt"), [ "root.txt" ]);
    expectNames("glob no wildcard", tree.glob("root.txt"), [ "root.txt" ]);
    expectNames("glob missing directory", tree.glob("Missing/*"), []);
    expectNames("glob through a file", tree.glob("root.txt/*"), []);
    expectNames("glob parent traversal", tree.glob("../*"), []);
    console.info(`  Glob ✅`);
}

function testCaseInsensitive(accessor: Accessor, source: SourceHandle, root: GlobMatch): void {
    const strict = DirectoryTree.fromEntry(accessor, source, root);
    const loose = DirectoryTree.fromEntry(accessor, source, root, true);
    if (strict instanceof FileError || loose instanceof FileError) {
        throw `Could not create trees.......caseInsensitive ❌`;
    }

    expectError("case sensitive by default", strict.file("ROOT.TXT"), "not found");
    expectFile("case insensitive", loose.file("ROOT.TXT"), "root.txt");
    expectFile("case insensitive nested", loose.file("network/deep/X.TXT"), "x.txt");
    console.info(`  Case insensitive ✅`);
}

function testFromEntryRejectsFile(accessor: Accessor, source: SourceHandle, base: string): void {
    const matches = accessor.sourceGlobfs(source, `${base}/root.txt`);
    const file = matches instanceof FileError ? undefined : matches[ 0 ];
    if (file === undefined) {
        throw `Could not find root.txt.......fromEntry ❌`;
    }

    expectError("fromEntry file", DirectoryTree.fromEntry(accessor, source, file), "is not a directory");
    console.info(`  fromEntry ✅`);
}

function testCachingAndListFailure(): void {
    const entry = (name: string, kind: EntryKind): DirEntry => {
        const handle = kind === EntryKind.Directory ? { Directory: { name } } : { File: { name } };
        return { name, handle, meta: { kind, display_path: `stub:/${name}` }, times: {} } as unknown as DirEntry;
    };

    // Object so TypeScript does not narrow the counter after the first check
    const stats = { listCalls: 0 };
    const stub = {
        sourceReadDirHandle: (_source: SourceHandle, handle: DirHandle): DirEntry[] | FileError => {
            stats.listCalls++;
            const name = (handle as unknown as { Directory: { name: string; }; }).Directory.name;
            if (name === "Broken") {
                return new FileError(`ACCESSOR`, `permission denied`);
            }
            return name === "root" ? [ entry("Broken", EntryKind.Directory), entry("a.txt", EntryKind.File) ] : [];
        },
    } as unknown as Accessor;

    const warn = console.warn;
    let warnings = 0;
    console.warn = (): void => { warnings++; };

    try {
        const tree = new DirectoryTree(stub, { id: { Disk: {} } } as unknown as SourceHandle, { Directory: { name: "root" } } as unknown as DirHandle, "stub:/root");

        tree.file("a.txt");
        tree.file("a.txt");
        tree.children();
        expectCount("cache", stats.listCalls, 1);

        expectError("list failure", tree.file("Broken/x"), "could not list directory");
        expectError("list failure again", tree.file("Broken/y"), "could not list directory");
        expectNames("list failure children", tree.children("Broken"), []);
        expectCount("failure is cached", stats.listCalls, 2);
        expectCount("failure warns once", warnings, 1);
    } finally {
        console.warn = warn;
    }
    console.info(`  Caching and list failure ✅`);
}