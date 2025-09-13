import { readFile } from "../../../mod";
import { decompress_snappy, decompress_zstd } from "../../compression/decompress";
import { CompressionError } from "../../compression/errors";
import { extractUtf16String, extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { NomError } from "../../nom/error";
import { Endian } from "../../nom/helpers";
import { nomUnsignedEightBytes, nomUnsignedOneBytes, take, takeUntil } from "../../nom/mod";
import { ApplicationError } from "../errors";
import { getValueType, parseValue, parseVarInt } from "./wal";

export function parseLdb(path: string) {
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

    console.log(JSON.stringify(Array.from(index_data.index_data)));

    let shared_key = "";
    const first_key = parseKey(shared_key, index_data.index_data);
    if (first_key instanceof ApplicationError) {
        return first_key;
    }
    shared_key = first_key.key;
    console.log(JSON.stringify(first_key));
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
            console.error(`error: ${next_key}`);
            console.log(JSON.stringify(Array.from(remaining)));
            break;
        }
        const block_key = parseKeyBlock(next_key.value);
        if (block_key instanceof ApplicationError) {
            continue;
        }
        block_keys.push(block_key);


        remaining = next_key.remaining;
        console.log(`key: ${JSON.stringify(next_key.key)} - ${JSON.stringify(Array.from(next_key.value))}`);
    }

    console.log(JSON.stringify(block_keys));
    for (const entry of block_keys) {
        parseBlock(data, entry.offset, entry.size, index_data.compression_type);
        break;
    }

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
    console.log(`offset: ${offset} size: ${size}`);
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

function parseKey(shared_key: string, data: Uint8Array, is_block = false): KeyValueData | ApplicationError {
    let remaining = data;
    let share_key = parseVarInt(remaining);
    if (share_key instanceof ApplicationError) {
        return share_key;
    }
    console.log(`key value: ${share_key.value}. shared lenght is: ${shared_key.length}`);

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
    console.log(`key value is: ${key_value}`);

    let key = parseVarInt(remaining);
    if (key instanceof ApplicationError) {
        return key;
    }

    const value_len = parseVarInt(key.remaining);
    if (value_len instanceof ApplicationError) {
        return value_len;
    }

    console.log(`is block: ${is_block}`);
    if (share_key.value as number - 1 === shared_key.length && share_key.value !== 0) {
        remaining = value_len.remaining;
        if (!is_block) {
            const key_state = nomUnsignedEightBytes(remaining, Endian.Le);
            if (key_state instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get key state data: ${key_state}`);
            }
            remaining = key_state.remaining;
        }
        const value_remaining = take(remaining, key.value as number);
        if (value_remaining instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get key non-shared data: ${value_remaining}`);
        }
        remaining = value_remaining.remaining as Uint8Array;

        //https://github.com/libyal/dtformats/blob/main/documentation/LevelDB%20database%20format.asciidoc#table_block
        const value_data = take(remaining, value_len.value as number);
        if (value_data instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get key value data: ${value_data}`);
        }
        console.log(`shared key is: ${shared_key}`);
        return { key: `${shared_key.slice(0, share_key.value as number)}`, value: value_data.nommed as Uint8Array, remaining: value_data.remaining as Uint8Array };
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

function parseBlock(data: Uint8Array, offset: number, size: number, compression: CompressionType) {
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


    // console.log(JSON.stringify(Array.from(input)));
    const first_key_value = parseKey("", input, true);
    if (first_key_value instanceof ApplicationError) {
        return first_key_value;
    }

    const value_type = getValueType(first_key_value.value);
    const value = parseValue(first_key_value.value, value_type);
    console.log(first_key_value.key);
    let remaining = first_key_value.remaining;

    let shared_key = first_key_value.key;
    while (remaining.buffer.byteLength > 1) {
        //console.log(JSON.stringify(Array.from(remaining)));
        const key_value = parseKey(shared_key, remaining, true);
        if (key_value instanceof ApplicationError) {
            console.log(`error here: ${JSON.stringify(key_value)}`);
            break;
        }
        shared_key = key_value.key;

        const value_type = getValueType(key_value.value);
        const value = parseValue(key_value.value, value_type);
        console.log(key_value.key);
        remaining = key_value.remaining;
        console.log(JSON.stringify(value));

    }
    //console.log(JSON.stringify(value));

}