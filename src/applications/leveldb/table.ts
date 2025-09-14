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

export function parseLdb(path: string): LevelDbEntry[] | ApplicationError {
    const data = readFile(path);
    if (data instanceof FileError) {
        return new ApplicationError(`LEVELDB`, `could not read ${path}: ${data}`);
    }

    const footer = parseFooter(data);
    if (footer instanceof ApplicationError) {
        return footer;
    }

    // At: https://github.com/libyal/dtformats/blob/main/documentation/LevelDB%20database%20format.asciidoc#51-table-block-handle
    // 3. Parse??
    // 4. Finish parsing the WAL log? Get all the entries there
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

    //https://github.com/libyal/dtformats/blob/main/documentation/LevelDB%20database%20format.asciidoc#table_block
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
        // Sometimes key is composed of 2 strings
        const prefix = 95;
        // If key starts has prefix '_' then it has two parts
        // First has end of string character?
        const first_part = takeUntil(key_data, new Uint8Array([ 0 ]));
        if (first_part instanceof NomError) {
            //return new ApplicationError(`LEVELDB`, `could not get first part of key: ${first_part}`);
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
        // Pretty sure its key type. Documentation is unclear
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

        new Uint8Array().buffer;

        key_value_data.key_type = key_type.value;
        const clean_seq = new Uint8Array(8);
        clean_seq.set(seq_number.nommed as Uint8Array);
        key_value_data.sequence = Number(new DataView(clean_seq.buffer).getBigUint64(0, true));

    } else {
        // If the non-shared key size is less than 8. Then there is no useful non-shared key data
        // The key is fully cached by the shared_key
        key_value_data.key = key_value;
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