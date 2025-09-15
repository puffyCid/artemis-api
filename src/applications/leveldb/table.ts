import { readFile } from "../../../mod";
import { LevelDbEntry, ValueType } from "../../../types/applications/level";
import { ProtoTag } from "../../../types/encoding/protobuf";
import { decompress_snappy, decompress_zstd } from "../../compression/decompress";
import { CompressionError } from "../../compression/errors";
import { extractUtf16String, extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { NomError } from "../../nom/error";
import { Endian } from "../../nom/helpers";
import { nomUnsignedEightBytes, nomUnsignedOneBytes, take, takeUntil } from "../../nom/mod";
import { ApplicationError } from "../errors";
import { getValueType, parseValue, parseVarInt } from "./wal";

/**
 * Function to parse ldb files
 * @param path Path to a ldb file
 * @returns Array of `LevelDbEntry` or `ApplicationError`
 */
export function parseLdb(path: string): LevelDbEntry[] | ApplicationError {
    const data = readFile(path);
    if (data instanceof FileError) {
        return new ApplicationError(`LEVELDB`, `could not read ${path}: ${data}`);
    }

    const footer = parseFooter(data);
    if (footer instanceof ApplicationError) {
        return footer;
    }

    const index_data = parseIndex(data, footer.index.size, footer.index.offset);
    if (index_data instanceof ApplicationError) {
        return index_data;
    }

    let shared_key = "";
    const first_key = parseKey(shared_key, index_data.index_data);
    if (first_key instanceof ApplicationError) {
        return first_key;
    }

    shared_key = first_key.key;
    let remaining = first_key.remaining;

    const block_keys: BlockData[] = [];
    const block_key = parseKeyBlock(first_key.value);
    if (block_key instanceof ApplicationError) {
        return block_key;
    }
    block_keys.push(block_key);

    while (remaining.buffer.byteLength !== 0) {
        const next_key = parseKey(shared_key, remaining);
        if (next_key instanceof ApplicationError) {
            break;
        }
        const block_key = parseKeyBlock(next_key.value);
        if (block_key instanceof ApplicationError) {
            break;
        }
        block_keys.push(block_key);


        remaining = next_key.remaining;
    }

    let values: LevelDbEntry[] = [];
    for (const entry of block_keys) {
        const result = parseBlock(data, entry.offset, entry.size, index_data.compression_type);
        if (result instanceof ApplicationError) {
            console.error(result);
            continue;
        }
        values = values.concat(result);
    }

    return values;

}

interface Footer {
    metaindex: TableBlockHandle;
    index: TableBlockHandle;
}

interface TableBlockHandle {
    offset: number;
    size: number;
}

/**
 * Parse ldb footer to get initial information about the ldb file
 * @param data Ldb bytes
 * @returns `Footer` information associated with the ldb file
 */
function parseFooter(data: Uint8Array): Footer | ApplicationError {
    const footer_size = 48;
    const foot_start = take(data, data.buffer.byteLength - footer_size);
    if (foot_start instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not parse footer: ${foot_start}`);
    }
    const var_data = take(foot_start.remaining, 8);
    if (var_data instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not parse var data: ${var_data}`);
    }
    let offset = parseVarInt(var_data.nommed as Uint8Array);
    if (offset instanceof ApplicationError) {
        return offset;
    }

    let size = parseVarInt(offset.remaining);
    if (size instanceof ApplicationError) {
        return size;
    }

    const meta_handle: TableBlockHandle = {
        offset: offset.value as number,
        size: size.value as number
    };

    offset = parseVarInt(size.remaining as Uint8Array);
    if (offset instanceof ApplicationError) {
        return offset;
    }

    size = parseVarInt(offset.remaining);
    if (size instanceof ApplicationError) {
        return size;
    }

    const index_handle: TableBlockHandle = {
        offset: offset.value as number,
        size: size.value as number
    };

    return { metaindex: meta_handle, index: index_handle };
}

interface IndexData {
    index_data: Uint8Array;
    remaining: Uint8Array;
    compression_type: CompressionType;
}

enum CompressionType {
    None,
    Snappy,
    Zstd
}

/**
 * Function to parse the ldb index block
 * @param data Ldb bytes
 * @param size Size of the index block
 * @param offset Offset to the index block
 * @returns `IndexData` information or `ApplicationError`
 */
function parseIndex(data: Uint8Array, size: number, offset: number): IndexData | ApplicationError {
    const start = take(data, offset);
    if (start instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get index start: ${start}`);
    }
    const trailer = 5;
    const index_data = take(start.remaining, size + trailer);
    if (index_data instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get index data: ${index_data}`);
    }

    // Last 5 bytes tells us checksum and if the data is compressed
    const index = index_data.nommed as Uint8Array;
    const trailer_data = index.buffer.slice(index.buffer.byteLength - trailer);
    const compression_type = new DataView(trailer_data).getUint8(0);

    const none = 0;
    const snappy = 1;
    const zstd = 2;
    const index_entry = new Uint8Array(index.buffer.slice(0, size));

    switch (compression_type) {
        case none: return { index_data: index_entry, remaining: index_data.remaining as Uint8Array, compression_type: CompressionType.None };
        case snappy: {
            const decom_data = decompress_snappy(index_entry);
            if (decom_data instanceof CompressionError) {
                return new ApplicationError(`LEVELDB`, `could not decompress snappy index: ${decom_data}`);
            }
            return { index_data: decom_data, remaining: index_data.remaining as Uint8Array, compression_type: CompressionType.Snappy };
        }
        case zstd: {
            const decom_data = decompress_zstd(index_entry);
            if (decom_data instanceof CompressionError) {
                return new ApplicationError(`LEVELDB`, `could not decompress zstd index: ${decom_data}`);
            }
            return { index_data: decom_data, remaining: index_data.remaining as Uint8Array, compression_type: CompressionType.Zstd };
        }
        default: return new ApplicationError(`LEVELDB`, `unknown compression type ${compression_type}`);
    }

}

interface KeyValueData {
    key: string;
    value: Uint8Array;
    remaining: Uint8Array;
}

/**
 * Function to parse initial keys from ldb entry
 * @param shared_key Key string that is shared between all keys
 * @param data Bytes associated with the key
 * @returns `KeyValueData` or `ApplicationError`
 */
function parseKey(shared_key: string, data: Uint8Array): KeyValueData | ApplicationError {
    let remaining = data;
    let share_key = parseVarInt(remaining);
    if (share_key instanceof ApplicationError) {
        return share_key;
    }

    let key_value = "";
    if (share_key.value === 0) {
        const next_key = nomUnsignedOneBytes(remaining);
        if (next_key instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get next data: ${next_key}`);
        }
        remaining = next_key.remaining;
    } else {
        key_value = shared_key.slice(0, share_key.value as number);
        remaining = share_key.remaining;
    }

    let key = parseVarInt(remaining);
    if (key instanceof ApplicationError) {
        return key;
    }

    const value_len = parseVarInt(key.remaining);
    if (value_len instanceof ApplicationError) {
        return value_len;
    }

    if (key.value as number <= 8) {
        return new ApplicationError(`LEVELDB`, `key value size too small: ${key.value}`);
    }

    const key_data = take(value_len.remaining, (key.value as number) - 8);
    if (key_data instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get key string data: ${key_data}`);
    }

    const key_state = nomUnsignedEightBytes(key_data.remaining as Uint8Array, Endian.Le);
    if (key_state instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get key state data: ${key_state}`);
    }

    let key_string = "";
    // Sometimes key is composed of 2 strings
    const prefix = 95;
    // If key starts has prefix '_' then it has two parts
    if ((key_data.nommed as Uint8Array)[ 0 ] === prefix) {
        // First has end of string character?
        const first_part = takeUntil(key_data.nommed, new Uint8Array([ 0 ]));
        if (first_part instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get first part of key: ${first_part}`);
        }

        const first_data = (first_part.remaining as Uint8Array).buffer.slice(2);
        // If 0 the encoding is UTF16-LE. Otherwise its ASCII
        if (new Uint8Array((first_part.remaining as Uint8Array).buffer.slice(1, 2)) === new Uint8Array([ 0 ])) {
            key_string = `${extractUtf8String(first_part.nommed as Uint8Array)} ${extractUtf16String(new Uint8Array(first_data))}`;
        } else {
            key_string = `${extractUtf8String(first_part.nommed as Uint8Array)} ${extractUtf8String(new Uint8Array(first_data))}`;
        }
    } else {
        key_string = extractUtf8String(key_data.nommed as Uint8Array);
    }

    const value_data = take(key_state.remaining, value_len.value as number);
    if (value_data instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get key value data: ${value_data}`);
    }
    return { key: `${key_value}${key_string}`, value: value_data.nommed as Uint8Array, remaining: value_data.remaining as Uint8Array };
}

interface BlockData {
    offset: number;
    size: number;
}

/**
 * Function to parse values associated with the initial keys. Will point to offsets that contain the actual data
 * @param data Bytes associated with the initial leveldb keys
 * @returns `BlockData` or `ApplicationError`
 */
function parseKeyBlock(data: Uint8Array): BlockData | ApplicationError {
    const offset = parseVarInt(data);
    if (offset instanceof ApplicationError) {
        return offset;
    }

    const size = parseVarInt(offset.remaining);
    if (size instanceof ApplicationError) {
        return size;
    }

    return { offset: offset.value as number, size: size.value as number };
}

/**
 * Function to parse ldb blocks and extract entries
 * @param data ldb file bytes
 * @param offset Offset to the block
 * @param size Size of the block
 * @param compression `CompressionType` used by the block
 * @returns Array of `LevelDbEntry` or `ApplicationError`
 */
function parseBlock(data: Uint8Array, offset: number, size: number, compression: CompressionType): LevelDbEntry[] | ApplicationError {
    const start = take(data, offset);
    if (start instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could go to start of key block data ${start}`);
    }

    const block_data = take(start.remaining, size);
    if (block_data instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could get key block data ${block_data}`);
    }

    let input = block_data.nommed as Uint8Array;
    switch (compression) {
        case CompressionType.None: {
            break;
        }
        case CompressionType.Snappy: {
            const decom_data = decompress_snappy(input);
            if (decom_data instanceof CompressionError) {
                return new ApplicationError(`LEVELDB`, `could decompress snappy block data ${decom_data}`);
            }
            input = decom_data;
            break;
        }
        case CompressionType.Zstd: {
            const decom_data = decompress_zstd(input);
            if (decom_data instanceof CompressionError) {
                return new ApplicationError(`LEVELDB`, `could decompress zstd block data ${decom_data}`);
            }
            input = decom_data;
            break;
        }
    }

    const values: LevelDbEntry[] = [];
    const first_key_value = parseBlockData("", input);
    if (first_key_value instanceof ApplicationError) {
        return first_key_value;
    }
    const entry: LevelDbEntry = {
        sequence: first_key_value.sequence,
        key_type: first_key_value.key_type,
        value_type: first_key_value.value_type,
        value: first_key_value.value,
        shared_key: first_key_value.shared_key,
        entry_key: first_key_value.entry_key,
        key: first_key_value.key
    };
    values.push(entry);

    let remaining = first_key_value.remaining;

    let shared_key = first_key_value.key;
    while (remaining.buffer.byteLength > 1) {
        const key_value = parseBlockData(shared_key, remaining);
        if (key_value instanceof ApplicationError) {
            break;
        }
        shared_key = key_value.key;


        remaining = key_value.remaining;
        const level_entry: LevelDbEntry = {
            sequence: key_value.sequence,
            key_type: key_value.key_type,
            value_type: key_value.value_type,
            value: key_value.value,
            shared_key: key_value.shared_key,
            entry_key: key_value.entry_key,
            key: key_value.key
        };

        if (level_entry.sequence === 0 && level_entry.key === "" || level_entry.key.includes(" [strings] Failed to get UTF8 string: ")) {
            continue;
        }

        values.push(level_entry);

    }
    return values;
}

interface BlockValue {
    shared_key: string;
    entry_key: string;
    key: string;
    value: string | number | boolean | unknown[] | Record<string, ProtoTag>;
    key_type: number;
    value_type: ValueType;
    remaining: Uint8Array;
    sequence: number;
}

/**
 * Function to parse block data which contains our database values
 * @param shared_key Key string that is shared between all keys
 * @param data Bytes associated with the block
 * @returns `BlockValue` or `ApplicationError`
 */
function parseBlockData(shared_key: string, data: Uint8Array): BlockValue | ApplicationError {
    let remaining = data;
    let share_key = parseVarInt(remaining);
    if (share_key instanceof ApplicationError) {
        return share_key;
    }
    let key_value = "";
    const first_key = 0;
    if (share_key.value === first_key) {
        const next_key = nomUnsignedOneBytes(remaining);
        if (next_key instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get next data: ${next_key}`);
        }
        remaining = next_key.remaining;
    } else {
        key_value = shared_key.slice(0, share_key.value as number);
        remaining = share_key.remaining;
    }


    let non_shared_key = parseVarInt(remaining);
    if (non_shared_key instanceof ApplicationError) {
        return non_shared_key;
    }

    const value_len = parseVarInt(non_shared_key.remaining);
    if (value_len instanceof ApplicationError) {
        return value_len;
    }
    // We are done if block size is less than non_shared_key length
    if (value_len.remaining.buffer.byteLength < (non_shared_key.value as number)) {
        return new ApplicationError(`LEVELDB`, `incomplete block`);
    }
    const non_shared_data = take(value_len.remaining, non_shared_key.value as number);
    if (non_shared_data instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get non-shared key data: ${non_shared_data}`);
    }
    remaining = non_shared_data.remaining as Uint8Array;

    const key_value_data: BlockValue = {
        shared_key: key_value,
        entry_key: "",
        key: "",
        value: "",
        remaining: new Uint8Array(),
        value_type: ValueType.Unknown,
        key_type: 0,
        sequence: 0,
    };

    const key_metadata_min_size = 8;
    if (non_shared_key.value as number >= key_metadata_min_size) {
        const non_shared_key = (non_shared_data.nommed as Uint8Array);
        const key_data = new Uint8Array(non_shared_key.buffer.slice(0, non_shared_key.buffer.byteLength - key_metadata_min_size));
        let key_string = "";
        let entry_key = "";
        // First key string has end of string character?
        const first_part = takeUntil(key_data, new Uint8Array([ 0 ]));
        if (first_part instanceof NomError) {
            key_string = extractUtf8String(key_data);
        } else {
            const first_data = (first_part.remaining as Uint8Array).buffer.slice(2);
            // If 0 the encoding is UTF16-LE. Otherwise its ASCII
            if (new Uint8Array((first_part.remaining as Uint8Array).buffer.slice(1, 2)) === new Uint8Array([ 0 ])) {
                key_string = `${extractUtf8String(first_part.nommed as Uint8Array)}  ${extractUtf16String(new Uint8Array(first_data))}`;
                entry_key = `${extractUtf8String(first_part.nommed as Uint8Array)} ${extractUtf16String(new Uint8Array(first_data))}`;
            } else {
                key_string = `${extractUtf8String(first_part.nommed as Uint8Array)}  ${extractUtf8String(new Uint8Array(first_data))}`;
                entry_key = `${extractUtf8String(first_part.nommed as Uint8Array)} ${extractUtf8String(new Uint8Array(first_data))}`;
            }
        }

        key_value_data.key = `${key_value}${key_string}`;
        key_value_data.entry_key = entry_key;
        const key_metadata = new Uint8Array(non_shared_key.buffer.slice(non_shared_key.buffer.byteLength - key_metadata_min_size));

        // Is this key type or value type?
        // Pretty sure its key type? Documentation is unclear
        // https://github.com/libyal/dtformats/blob/main/documentation/LevelDB%20database%20format.asciidoc#532-table-key
        const key_type = nomUnsignedOneBytes(key_metadata);
        if (key_type instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not determine key type: ${key_type}`);
        }
        const seq_size = 7;
        const seq_number = take(key_type.remaining, seq_size);
        if (seq_number instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not determine sequence number: ${seq_number}`);
        }

        key_value_data.key_type = key_type.value;
        const clean_seq = new Uint8Array(8);
        clean_seq.set(seq_number.nommed as Uint8Array);
        key_value_data.sequence = Number(new DataView(clean_seq.buffer).getBigUint64(0, true));
    } else {
        // If the non-shared key size is less than 8. Then there is no useful non-shared key data
        // The key is fully cached by the shared_key
        key_value_data.key = key_value;
        const clean_seq = new Uint8Array(8);
        clean_seq.set(non_shared_data.nommed as Uint8Array);
        key_value_data.sequence = Number(new DataView(clean_seq.buffer).getBigUint64(0, true));
    }

    const value_data = take(remaining, value_len.value as number);
    if (value_data instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get value data: ${value_data}`);
    }
    remaining = value_data.remaining as Uint8Array;

    key_value_data.value_type = getValueType(value_data.nommed as Uint8Array);
    key_value_data.value = parseValue(value_data.nommed as Uint8Array, key_value_data.value_type);
    key_value_data.remaining = remaining;

    return key_value_data;

}

/**
 * Function to test the leveldb ldb file parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the leveldb parsing
 */
export function testLevelLdb(): void {
    const parse_block_test = readFile("../../test_data/leveldb/levelldb.raw");
    if (parse_block_test instanceof FileError) {
        throw parse_block_test;
    }

    const block_result = parseBlock(parse_block_test, 0, 3017, CompressionType.Snappy);
    if (block_result instanceof ApplicationError) {
        throw block_result;
    }

    if (block_result.length !== 61) {
        throw `Got length ${block_result.length} expected 61.......parseBlock ❌`;
    }

    if (!JSON.stringify(block_result[ 0 ].value).includes("13401944653177090")) {
        throw `Got value ${JSON.stringify(block_result[ 0 ].value)} expected to contain 13401944653177090.......parseBlock ❌`;
    }
    console.info(`  Function parseBlock ✅`);


    const parse_block_data_test = readFile("../../test_data/leveldb/blockdata.raw");
    if (parse_block_data_test instanceof FileError) {
        throw parse_block_data_test;
    }

    const block_data_result = parseBlockData("", parse_block_data_test);
    if (block_data_result instanceof ApplicationError) {
        throw block_data_result;
    }

    if (block_data_result.key !== "META:https://192.168.1.242:9090") {
        throw `Got key ${block_data_result.key} expected META:https://192.168.1.242:9090.......parseBlockData ❌`;
    }

    if (block_data_result.sequence !== 16) {
        throw `Got sequence ${block_data_result.sequence} expected 16.......parseBlockData ❌`;
    }

    if (block_data_result.remaining.buffer.byteLength !== 4149) {
        throw `Got remaining length ${block_data_result.remaining.buffer.byteLength} expected 4149.......parseBlockData ❌`;
    }

    console.info(`  Function parseBlockData ✅`);

    const parse_key_block_test = [ 0, 201, 23 ];
    const parse_key_block_result = parseKeyBlock(new Uint8Array(parse_key_block_test));
    if (parse_key_block_result instanceof ApplicationError) {
        throw parse_key_block_result;
    }

    if (parse_key_block_result.offset !== 0) {
        throw `Got offset ${parse_key_block_result.offset} expected 0.......parseKeyBlock ❌`;
    }

    if (parse_key_block_result.size !== 3017) {
        throw `Got size ${parse_key_block_result.size} expected 3017.......parseKeyBlock ❌`;
    }

    console.info(`  Function parseKeyBlock ✅`);


    const parse_key_test = [ 0, 34, 3, 95, 104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109, 0, 1, 96, 1, 255, 255, 255, 255, 255, 255, 255, 0, 201, 23, 0, 57, 5, 95, 104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109, 0, 1, 115, 98, 95, 119, 105, 122, 46, 122, 112, 99, 46, 103, 119, 115, 45, 119, 105, 122, 45, 115, 101, 114, 112, 46, 1, 84, 0, 0, 0, 0, 0, 0, 206, 23, 214, 240, 3, 0, 57, 6, 95, 104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109, 0, 1, 115, 98, 95, 119, 105, 122, 46, 122, 112, 99, 46, 103, 119, 115, 45, 119, 105, 122, 45, 115, 101, 114, 112, 46, 1, 62, 0, 0, 0, 0, 0, 0, 169, 136, 4, 234, 252, 1, 0, 9, 5, 96, 1, 255, 255, 255, 255, 255, 255, 255, 152, 133, 6, 212, 15, 0, 0, 0, 0, 40, 0, 0, 0, 105, 0, 0, 0, 171, 0, 0, 0, 4, 0, 0, 0 ];
    const parse_key_result = parseKey("", new Uint8Array(parse_key_test));
    if (parse_key_result instanceof ApplicationError) {
        throw parse_key_result;
    }

    if (parse_key_result.key !== "_https://www.google.com `") {
        throw `Got key ${parse_key_result.key} expected '_https://www.google.com \`'.......parseKey ❌`;
    }

    if (JSON.stringify(Array.from(parse_key_result.value)) !== JSON.stringify([ 0, 201, 23 ])) {
        throw `Got value [${parse_key_result.value}] expected [0,201,23].......parseKey ❌`;
    }

    console.info(`  Function parseKey ✅`);


    const parse_index_test = [ 208, 1, 120, 0, 34, 3, 95, 104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109, 0, 1, 96, 1, 255, 9, 1, 20, 0, 201, 23, 0, 57, 5, 98, 40, 0, 104, 115, 98, 95, 119, 105, 122, 46, 122, 112, 99, 46, 103, 119, 115, 45, 119, 105, 122, 45, 115, 101, 114, 112, 46, 1, 84, 0, 5, 1, 28, 206, 23, 214, 240, 3, 0, 57, 6, 198, 65, 0, 0, 62, 5, 64, 44, 0, 169, 136, 4, 234, 252, 1, 0, 9, 5, 96, 1, 9, 145, 20, 255, 152, 133, 6, 212, 15, 1, 29, 60, 40, 0, 0, 0, 105, 0, 0, 0, 171, 0, 0, 0, 4, 0, 0, 0, 1, 95, 36, 244, 214, 241, 148, 6, 8, 254, 148, 6, 133, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 251, 128, 139, 36, 117, 71, 219 ];
    const parse_index_result = parseIndex(new Uint8Array(parse_index_test), 133, 0);
    if (parse_index_result instanceof ApplicationError) {
        throw parse_index_result;
    }

    if (parse_index_result.compression_type !== CompressionType.Snappy) {
        throw `Got compression type ${parse_index_result.compression_type} expected Snappy.......parseIndex ❌`;
    }

    if (parse_index_result.index_data.buffer.byteLength !== 208) {
        throw `Got index data length ${parse_index_result.index_data.buffer.byteLength} expected 208.......parseIndex ❌`;
    }

    console.info(`  Function parseIndex ✅`);


    const parse_foot_test = [ 241, 148, 6, 8, 254, 148, 6, 133, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 251, 128, 139, 36, 117, 71, 219 ];
    const parse_footer_result = parseFooter(new Uint8Array(parse_foot_test));
    if (parse_footer_result instanceof ApplicationError) {
        throw parse_footer_result;
    }

    if (parse_footer_result.index.size !== 133) {
        throw `Got index size ${parse_footer_result.index.size} expected 133.......parseFooter ❌`;
    }

    if (parse_footer_result.index.offset !== 100990) {
        throw `Got index offset ${parse_footer_result.index.offset} expected 100990.......parseFooter ❌`;
    }

    console.info(`  Function parseFooter ✅`);

    const parse_ldb_test = "../../test_data/leveldb/000005.ldb";
    const parse_ldb_result = parseLdb(parse_ldb_test);
    if (parse_ldb_result instanceof ApplicationError) {
        throw parse_ldb_result;
    }

    if (parse_ldb_result.length != 109) {
        throw `Got ldb entries length ${parse_ldb_result.length} expected 109.......parseLdb ❌`;
    }

    if (!JSON.stringify(parse_ldb_result[ 8 ].value).includes("13401944468429548")) {
        throw `Got ldb entry value ${JSON.stringify(parse_ldb_result[ 8 ].value)} expected to include 13401944468429548.......parseLdb ❌`;
    }

    console.info(`  Function parseLdb ✅`);

}