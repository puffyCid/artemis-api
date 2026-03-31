import { glob, readFile, readRawFile } from "../../../mod";
import { CacheFlag, CacheState, ChromiumCache, ChromiumProfiles } from "../../../types/applications/chromium";
import { extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedEightBytes, nomUnsignedFourBytes, nomUnsignedOneBytes, nomUnsignedTwoBytes } from "../../nom/helpers";
import { take, takeUntil } from "../../nom/parsers";
import { PlatformType } from "../../system/systeminfo";
import { unixEpochToISO, webkitToUnixEpoch } from "../../time/conversion";
import { WindowsError } from "../../windows/errors";
import { ApplicationError } from "../errors";

/**
 * TODO:
 * 1. Parse data_X values next! :)
 * 2. Ignore f_X values? Its gzip data. Maybe include them in final output like an evidence field?
 */

/**
 * Extract Chromium cache data
 * @param paths Array of `ChromiumProfiles`
 * @param platform OS `PlatformType`
 * @returns 
 */
export function chromiumCache(paths: ChromiumProfiles[], platform: PlatformType): ChromiumCache[] {
    let values: ChromiumCache[] = [];
    let index: Index | undefined | ApplicationError = undefined;
    const data = {} as Record<FileType.Block256 | FileType.Block1k | FileType.Block4k | FileType.Ranking, DataBlock | undefined>;

    for (const path of paths) {
        let full_path = `${path.full_path}/*/Cache/Cache_Data/*`;
        if (platform === PlatformType.Windows) {
            full_path = `${path.full_path}\\*\\Cache\\Cache_Data\\*`;
        }

        const caches = glob(full_path);
        if (caches instanceof FileError) {
            continue;
        }

        let evidence = full_path;
        for (const entry of caches) {
            if (!entry.is_file) {
                continue;
            }

            if (entry.filename === "index") {
                index = parseIndex(entry.full_path, platform);
                if (index instanceof ApplicationError) {
                    continue;
                }
                evidence = entry.full_path;
            } else if (entry.filename.includes("data_")) {
                const data_block = parseData(entry.full_path, platform);
                if (data_block instanceof ApplicationError) {
                    continue;
                }
                if (entry.filename === "data_0") {
                    data[FileType.Ranking] = data_block;
                } else if (entry.filename === "data_1") {
                    data[FileType.Block256] = data_block;
                } else if (entry.filename === "data_2") {
                    data[FileType.Block1k] = data_block;
                } else if (entry.filename === "data_3") {
                    data[FileType.Block4k] = data_block;
                }
            }
        }

        if (index === undefined || index instanceof ApplicationError) {
            return [];
        }

        // Now parse each cache entry
        const cache = extractCache(index, data, path, evidence);
        if (cache instanceof ApplicationError) {
            continue;
        }
        values = values.concat(cache);
    }

    console.log(values.length);
    return values;
}

interface Index {
    sig: number;
    minor_version: number;
    major_version: number;
    entries: number;
    data_size: number;
    last_created_file_number: number;
    dirty: number;
    statistics_cache: CacheAddress;
    table_size: number;
    crash: number;
    experiment_id: number;
    created: string;
    filled: number;
    sizes: number[];
    head_cache: CacheAddress[];
    tail_cache: CacheAddress[];
    transaction_cache: CacheAddress;
    operation: number;
    operation_list: number;
    // Only contains initialized entries (CacheAddress.intiailized === true)
    cache_entries: CacheAddress[];
    index_path: string;
}

interface CacheAddress {
    file_number: number;
    file_type: FileType;
    file_type_number: number;
    block_number: number;
    contiguous_blocks: number;
    reserved: number;
    initialized: boolean;
    file_selector: number;
}

enum FileType {
    External = "External",
    Ranking = "Ranking",
    Block256 = "Block 256",
    Block1k = "Block 1K",
    Block4k = "Block 4K",
    BlockFiles = "Block Files",
    BlockEntries = "Block Entries",
    BlockEvicted = "Block Evicted",
    Unknown = "Unknown",
}

function parseIndex(path: string, platform: PlatformType): Index | ApplicationError {
    let bytes;
    // On Windows if the browser is opened the cache files may be locked
    // We will use raw disk access to open them
    if (platform === PlatformType.Windows) {
        bytes = readRawFile(path);
        if (bytes instanceof WindowsError) {
            return new ApplicationError(`CHROMIUM`, `Failed to read cache index file via raw disk ${path}: ${bytes}`);
        }
    } else {
        bytes = readFile(path);
        if (bytes instanceof FileError) {
            return new ApplicationError(`CHROMIUM`, `Failed to read cache index file ${path}: ${bytes}`);

        }
    }

    const sig = nomUnsignedFourBytes(bytes, Endian.Le);
    if (sig instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file sig ${path}: ${sig}`);
    }

    const minor = nomUnsignedTwoBytes(sig.remaining, Endian.Le);
    if (minor instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file minor version ${path}: ${minor}`);
    }

    const major = nomUnsignedTwoBytes(minor.remaining, Endian.Le);
    if (major instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file major version ${path}: ${major}`);
    }

    const entries = nomUnsignedFourBytes(major.remaining, Endian.Le);
    if (entries instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file entries ${path}: ${entries}`);
    }

    const data_size = nomUnsignedFourBytes(entries.remaining, Endian.Le);
    if (data_size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file data size ${path}: ${data_size}`);
    }
    const last_created_file_number = nomUnsignedFourBytes(data_size.remaining, Endian.Le);
    if (last_created_file_number instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file last created ${path}: ${last_created_file_number}`);
    }
    const dirty = nomUnsignedFourBytes(last_created_file_number.remaining, Endian.Le);
    if (dirty instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file dirty ${path}: ${dirty}`);
    }
    const stats = nomUnsignedFourBytes(dirty.remaining, Endian.Le);
    if (stats instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file stats ${path}: ${stats}`);
    }
    const table = nomUnsignedFourBytes(stats.remaining, Endian.Le);
    if (table instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file table ${path}: ${table}`);
    }
    const crash = nomUnsignedFourBytes(table.remaining, Endian.Le);
    if (crash instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file crash ${path}: ${crash}`);
    }
    const experiment_id = nomUnsignedFourBytes(crash.remaining, Endian.Le);
    if (experiment_id instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file experiment ${path}: ${experiment_id}`);
    }
    const created = nomUnsignedEightBytes(experiment_id.remaining, Endian.Le);
    if (created instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file created ${path}: ${created}`);
    }

    // Padding for header = 208 bytes
    // Padding for start of LRU data = 8 bytes
    let padding = 216;
    let remaining = take(created.remaining, padding);
    if (remaining instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file ${path}: ${remaining}`);
    }

    const filled = nomUnsignedFourBytes(remaining.remaining as Uint8Array, Endian.Le);
    if (filled instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file filled ${path}: ${filled}`);
    }

    const array_size = 5;
    const total_size = array_size * 3;
    const sizes: number[] = [];
    const head_cache: CacheAddress[] = [];
    const tail_cache: CacheAddress[] = [];

    // Next 3 structures are arrays of 5 entries. Each entry is 4 bytes
    for (let i = 0; i < total_size; i++) {
        const value = nomUnsignedFourBytes(filled.remaining, Endian.Le);
        if (value instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to parse index file array addresses ${path}: ${filled}`);
        }
        filled.remaining = value.remaining;
        if (sizes.length !== array_size) {
            sizes.push(value.value);
        } else if (head_cache.length !== array_size) {
            head_cache.push(getCacheAddress(value.value));
        } else if (tail_cache.length !== array_size) {
            tail_cache.push(getCacheAddress(value.value));

        }
    }

    const transaction = nomUnsignedFourBytes(filled.remaining, Endian.Le);
    if (transaction instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file transaction ${path}: ${transaction}`);
    }

    const operation = nomUnsignedFourBytes(transaction.remaining, Endian.Le);
    if (operation instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file operation ${path}: ${operation}`);
    }

    const operation_list = nomUnsignedFourBytes(operation.remaining, Endian.Le);
    if (operation_list instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file operation list ${path}: ${operation_list}`);
    }

    padding = 28;
    remaining = take(operation_list.remaining, padding);
    if (remaining instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file ${path}: ${remaining}`);
    }

    const cache_bytes = take(remaining.remaining, table.value);
    if (cache_bytes instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse index file cache ${path}: ${cache_bytes}`);
    }
    const cache_entries: CacheAddress[] = [];
    const min_size = 4;
    while (remaining.remaining.length > min_size) {
        const value = nomUnsignedFourBytes(remaining.remaining as Uint8Array, Endian.Le);
        if (value instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to parse index file cache entries ${path}: ${value}`);
        }
        remaining.remaining = value.remaining;
        const cache = getCacheAddress(value.value);
        // Not intialized
        if (!cache.initialized) {
            continue;
        }
        cache_entries.push(cache);
    }
    const adjust_time = 1000000n;
    const index: Index = {
        sig: sig.value,
        minor_version: minor.value,
        major_version: major.value,
        entries: entries.value,
        data_size: data_size.value,
        last_created_file_number: last_created_file_number.value,
        dirty: dirty.value,
        statistics_cache: getCacheAddress(stats.value),
        table_size: table.value,
        crash: crash.value,
        experiment_id: experiment_id.value,
        created: unixEpochToISO(webkitToUnixEpoch(Number(created.value / adjust_time))),
        filled: filled.value,
        sizes,
        head_cache,
        tail_cache,
        transaction_cache: getCacheAddress(transaction.value),
        operation: operation.value,
        operation_list: operation_list.value,
        cache_entries,
        index_path: path,
    };

    return index;
}

function getFileType(value: number): FileType {
    switch (value) {
        case 0: return FileType.External;
        case 1: return FileType.Ranking;
        case 2: return FileType.Block256;
        case 3: return FileType.Block1k;
        case 4: return FileType.Block4k;
        case 5: return FileType.BlockFiles;
        case 6: return FileType.BlockEntries;
        case 7: return FileType.BlockEvicted;
        default: return FileType.Unknown;
    }
}

function getCacheAddress(value: number): CacheAddress {
    const initialized = Boolean(((value & 0x80000000) >>> 0) > 0);
    const file_type_number = (((value & 0x70000000) >>> 0) >> 28);
    const cache: CacheAddress = {
        file_type: getFileType(file_type_number),
        file_number: getFileType(file_type_number) === FileType.External ? value & 0x0fffffff : 0,
        file_type_number,
        block_number: getFileType(file_type_number) !== FileType.External ? value & 0x0000ffff : 0,
        contiguous_blocks: getFileType(file_type_number) !== FileType.External ? 1 + ((value & 0x03000000) >> 24) : 0,
        reserved: getFileType(file_type_number) !== FileType.External ? value & 0x0c000000 : 0,
        file_selector: getFileType(file_type_number) !== FileType.External ? (value & 0x00ff0000) >> 16 : 0,
        initialized
    };
    if (cache.initialized) {
        //console.log(JSON.stringify(cache));
    }
    return cache;
}

interface DataBlock {
    sig: number;
    minor: number;
    major: number;
    /**Number for the data_X file */
    file_index: number;
    next_index: number;
    block_size: number;
    number_entries: number;
    max_entries: number;
    empty_counters: number[];
    last_used: number[];
    updating: number;
    user: number[];
    // bitmap: Uint8Array[];
    data_path: string;
    bytes: Uint8Array;
}

function parseData(path: string, platform: PlatformType): DataBlock | ApplicationError {
    let bytes;
    // On Windows if the browser is opened the cache files may be locked
    // We will use raw disk access to open them
    if (platform === PlatformType.Windows) {
        bytes = readRawFile(path);
        if (bytes instanceof WindowsError) {
            return new ApplicationError(`CHROMIUM`, `Failed to read cache index file via raw disk ${path}: ${bytes}`);
        }
    } else {
        bytes = readFile(path);
        if (bytes instanceof FileError) {
            return new ApplicationError(`CHROMIUM`, `Failed to read cache index file ${path}: ${bytes}`);

        }
    }

    const sig = nomUnsignedFourBytes(bytes, Endian.Le);
    if (sig instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file sig ${path}: ${sig}`);
    }

    const minor = nomUnsignedTwoBytes(sig.remaining, Endian.Le);
    if (minor instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file minor ${path}: ${minor}`);
    }

    const major = nomUnsignedTwoBytes(minor.remaining, Endian.Le);
    if (major instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file major ${path}: ${major}`);
    }

    const file_index = nomUnsignedTwoBytes(major.remaining, Endian.Le);
    if (file_index instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file index ${path}: ${file_index}`);
    }

    const next_index = nomUnsignedTwoBytes(file_index.remaining, Endian.Le);
    if (next_index instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data next file index ${path}: ${next_index}`);
    }

    const block_size = nomUnsignedFourBytes(next_index.remaining, Endian.Le);
    if (block_size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file block size ${path}: ${block_size}`);
    }

    const number_entries = nomUnsignedFourBytes(block_size.remaining, Endian.Le);
    if (number_entries instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file number entries ${path}: ${number_entries}`);
    }

    const max_entries = nomUnsignedFourBytes(number_entries.remaining, Endian.Le);
    if (max_entries instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file max entries ${path}: ${max_entries}`);
    }

    let limit = 4;
    const total_limit = limit * 2;
    const empty_counters: number[] = [];
    const last_used: number[] = [];
    for (let i = 0; i < total_limit; i++) {
        const value = nomUnsignedFourBytes(max_entries.remaining, Endian.Le);
        if (value instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to parse data file array ${path}: ${value}`);
        }
        max_entries.remaining = value.remaining;
        if (empty_counters.length !== limit) {
            empty_counters.push(value.value);
        } else if (last_used.length !== limit) {
            last_used.push(value.value);
        }
    }

    const updating = nomUnsignedFourBytes(max_entries.remaining, Endian.Le);
    if (updating instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data file updating ${path}: ${updating}`);
    }

    limit = 5;
    const user: number[] = [];
    for (let i = 0; i < limit; i++) {
        const value = nomUnsignedFourBytes(updating.remaining, Endian.Le);
        if (value instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to parse data user ${path}: ${value}`);
        }
        updating.remaining = value.remaining;
        user.push(value.value);
    }

    const data: DataBlock = {
        sig: sig.value,
        minor: minor.value,
        major: major.value,
        file_index: file_index.value,
        next_index: next_index.value,
        block_size: block_size.value,
        number_entries: number_entries.value,
        max_entries: max_entries.value,
        empty_counters,
        last_used,
        updating: updating.value,
        user,
        data_path: path,
        bytes,
    };

    return data;
}

function extractCache(index: Index, data: Record<FileType.Block256 | FileType.Block1k | FileType.Block4k | FileType.Ranking, DataBlock | undefined>, path: ChromiumProfiles, evidence: string): ChromiumCache[] | ApplicationError {
    const blocks = [FileType.Block256, FileType.Block1k, FileType.Block4k];
    const values: ChromiumCache[] = [];
    for (const entry of index.cache_entries) {
        if (!blocks.includes(entry.file_type)) {
            continue;
        }
        // Safe because we check to make sure its one of these values above
        const file_type = entry.file_type as FileType.Block256 | FileType.Block1k | FileType.Block4k;
        const block = data[file_type];
        if (block === undefined) {
            continue;
        }
        const cache_entries = getCacheEntry(entry.block_number, block);
        if (cache_entries instanceof ApplicationError) {
            continue;
        }

        const clean_url = cache_entries.url.split(" ", 3).at(2) ?? cache_entries.url;
        const cache: ChromiumCache = {
            version: path.version,
            message: `URL cache '${clean_url}'`,
            datetime: cache_entries.created,
            browser: path.browser,
            timestamp_desc: "Browser Cache Created",
            artifact: "Browser Cache",
            data_type: `applications:${path.browser.toLowerCase()}:cache:entry`,
            hash: cache_entries.hash,
            cache_state: cache_entries.state,
            created: cache_entries.created,
            cache_flags: cache_entries.flag,
            url: clean_url,
            request: "1970-01-01T00:00:00Z",
            response: "1970-01-01T00:00:00Z",
            response2: "1970-01-01T00:00:00Z",
            response_headers: [],
            cache_key: cache_entries.url,
            evidence,
        };

        // Lets get the response headers cache if any
        // Response headers should always be first stream cache entry
        const response = cache_entries.stream_cache.at(0);
        if (response !== undefined && blocks.includes(response.file_type)) {
            const file_type = response.file_type as FileType.Block256 | FileType.Block1k | FileType.Block4k;

            const block = data[file_type];
            if (block !== undefined) {
                const response_cache = getResponseCache(response.block_number, block);
                if (!(response_cache instanceof ApplicationError)) {
                    cache.request = response_cache.request;
                    cache.response = response_cache.response;
                    cache.response2 = response_cache.timestamp;
                    cache.response_headers = response_cache.headers;
                }
            }
        }
        values.push(cache);
        //console.log(JSON.stringify(cache_entries));
    }

    return values;
}

interface CacheEntry {
    hash: number;
    next_address: CacheAddress;
    ranking: CacheAddress;
    resuse: number;
    refetch: number;
    state: CacheState;
    created: string;
    key_size: number;
    long_address: CacheAddress;
    stream_sizes: number[];
    stream_cache: CacheAddress[];
    flag: CacheFlag;
    self_hash: number;
    /**Cache key */
    url: string;
}

function getCacheEntry(block_number: number, data: DataBlock): CacheEntry | ApplicationError {
    const start = 8192;
    const entry_offset = (block_number * data.block_size) + start;
    const offset_start = take(data.bytes, entry_offset);
    if (offset_start instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache ${data.data_path}: ${offset_start}`);
    }

    const hash = nomUnsignedFourBytes(offset_start.remaining as Uint8Array, Endian.Le);
    if (hash instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file hash ${data.data_path}: ${hash}`);
    }

    const next_address = nomUnsignedFourBytes(hash.remaining, Endian.Le);
    if (next_address instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file next address ${data.data_path}: ${next_address}`);
    }

    const ranking = nomUnsignedFourBytes(next_address.remaining, Endian.Le);
    if (ranking instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file ranking ${data.data_path}: ${ranking}`);
    }

    const reuse = nomUnsignedFourBytes(ranking.remaining, Endian.Le);
    if (reuse instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file reuse ${data.data_path}: ${reuse}`);
    }

    const refetch = nomUnsignedFourBytes(reuse.remaining, Endian.Le);
    if (refetch instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file refetch ${data.data_path}: ${refetch}`);
    }

    const cache_state = nomUnsignedFourBytes(refetch.remaining, Endian.Le);
    if (cache_state instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file cache state ${data.data_path}: ${cache_state}`);
    }

    const created = nomUnsignedEightBytes(cache_state.remaining, Endian.Le);
    if (created instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file created ${data.data_path}: ${created}`);
    }

    const key_size = nomUnsignedFourBytes(created.remaining, Endian.Le);
    if (key_size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file key size ${data.data_path}: ${key_size}`);
    }

    const long_address = nomUnsignedFourBytes(key_size.remaining, Endian.Le);
    if (long_address instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file long address ${data.data_path}: ${long_address}`);
    }

    const limit = 4;
    const total_limit = limit * 2;
    const stream_sizes: number[] = [];
    const stream_cache: CacheAddress[] = [];
    for (let i = 0; i < total_limit; i++) {
        const value = nomUnsignedFourBytes(long_address.remaining, Endian.Le);
        if (value instanceof NomError) {
            return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file array ${data.data_path}: ${value}`);
        }
        long_address.remaining = value.remaining;

        if (stream_sizes.length !== limit) {
            stream_sizes.push(value.value);
        } else if (stream_cache.length !== limit) {
            stream_cache.push(getCacheAddress(value.value));
        }
    }

    const cache_flags = nomUnsignedFourBytes(long_address.remaining, Endian.Le);
    if (cache_flags instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file cache flag ${data.data_path}: ${cache_flags}`);
    }

    const padding = 16;
    const remaining = take(cache_flags.remaining, padding);
    if (remaining instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file padding ${data.data_path}: ${remaining}`);
    }

    const self_hash = nomUnsignedFourBytes(remaining.remaining as Uint8Array, Endian.Le);
    if (self_hash instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache file self hash ${data.data_path}: ${self_hash}`);
    }

    const url_size = 160;
    const url = take(self_hash.remaining, url_size);
    if (url instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse data cache furl ${data.data_path}: ${url}`);
    }

    const adjust_time = 1000000n;
    const entry: CacheEntry = {
        hash: hash.value,
        next_address: getCacheAddress(next_address.value),
        ranking: getCacheAddress(ranking.value),
        resuse: reuse.value,
        refetch: refetch.value,
        state: getState(cache_state.value),
        created: unixEpochToISO(webkitToUnixEpoch(Number(created.value / adjust_time))),
        key_size: key_size.value,
        long_address: getCacheAddress(long_address.value),
        stream_sizes,
        stream_cache,
        flag: getFlag(cache_flags.value),
        self_hash: self_hash.value,
        url: extractUtf8String(url.nommed as Uint8Array),
    };

    return entry;
}

function getState(state: number): CacheState {
    switch (state) {
        case 0: return CacheState.Normal;
        case 1: return CacheState.Evicted;
        case 2: return CacheState.Doomed;
        default: return CacheState.Unknown;
    }
}

function getFlag(flag: number): CacheFlag {
    switch (flag) {
        case 1: return CacheFlag.Parent;
        case 2: return CacheFlag.Child;
        default: return CacheFlag.Unknown;
    }
}

interface CacheResponse {
    hash: number;
    request: string;
    response: string;
    timestamp: string;
    size: number;
    headers: string[];
}

function getResponseCache(block_number: number, data: DataBlock): CacheResponse | ApplicationError {
    const start = 8192;
    const entry_offset = (block_number * data.block_size) + start;
    const offset_start = take(data.bytes, entry_offset);

    if (offset_start instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data ${data.data_path}: ${offset_start}`);
    }

    const hash = nomUnsignedFourBytes(offset_start.remaining as Uint8Array, Endian.Le);
    if (hash instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file hash ${data.data_path}: ${hash}`);
    }

    // Another hash or address?
    const unknown = nomUnsignedFourBytes(hash.remaining, Endian.Le);
    if (unknown instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file unknowns ${data.data_path}: ${unknown}`);
    }

    // Somekind of flag?
    const unknown2 = nomUnsignedFourBytes(unknown.remaining, Endian.Le);
    if (unknown2 instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file unknown2 ${data.data_path}: ${unknown2}`);
    }

    const request = nomUnsignedEightBytes(unknown2.remaining, Endian.Le);
    if (request instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file request ${data.data_path}: ${request}`);
    }

    const response = nomUnsignedEightBytes(request.remaining, Endian.Le);
    if (response instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file response ${data.data_path}: ${response}`);
    }

    const timestamp = nomUnsignedEightBytes(response.remaining, Endian.Le);
    if (timestamp instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file timestamp ${data.data_path}: ${timestamp}`);
    }

    const size = nomUnsignedFourBytes(timestamp.remaining, Endian.Le);
    if (size instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file size ${data.data_path}: ${size}`);
    }

    const payload = take(size.remaining, size.value);
    if (payload instanceof NomError) {
        return new ApplicationError(`CHROMIUM`, `Failed to parse response data cache file payload ${data.data_path}: ${payload}`);
    }

    // Payload is multiple lines with end of string character
    const headers: string[] = [];
    while (payload.remaining.length !== 0) {
        const value = takeUntil(payload.nommed, new Uint8Array([0]));
        if (value instanceof NomError) {
            break;
        }

        const header = extractUtf8String(value.nommed as Uint8Array);
        if (header === "") {
            break;
        }
        headers.push(header);
        const remaining = nomUnsignedOneBytes(value.remaining as Uint8Array);
        if (remaining instanceof NomError) {
            break;
        }
        payload.nommed = remaining.remaining;
    }

    // There might be even **more** info to parse
    // Such as HTTPS cert info
    // Could be interesting to parse later

    const adjust_time = 1000000n;
    const cache_response: CacheResponse = {
        hash: hash.value,
        request: unixEpochToISO(webkitToUnixEpoch(Number(request.value / adjust_time))),
        response: unixEpochToISO(webkitToUnixEpoch(Number(response.value / adjust_time))),
        timestamp: unixEpochToISO(webkitToUnixEpoch(Number(timestamp.value / adjust_time))),
        size: size.value,
        headers,
    };

    return cache_response;
}