import { CompactPoint, DeletedFile, LevelManifest, LogType, ManifestTag, NewFileValue, RecordType, ValueType, WalData, WalValue } from "../../../types/applications/level";
import { ProtoTag } from "../../../types/encoding/protobuf";
import { EncodingError } from "../../encoding/errors";
import { parseProtobuf } from "../../encoding/protobuf";
import { extractUtf16String, extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { readFile } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedEightBytes, nomUnsignedFourBytes, nomUnsignedOneBytes, nomUnsignedTwoBytes } from "../../nom/helpers";
import { take, takeUntil } from "../../nom/parsers";
import { ApplicationError } from "../errors";

export function parseWalManifest(path: string): LevelManifest[] | ApplicationError {
    const data = readFile(path);
    if (data instanceof FileError) {
        return new ApplicationError(`LEVELDB`, `could not read ${path}: ${data}`);
    }

    const level_records: LevelManifest[] = [];
    let remaining = data;
    const min_size = 7;
    while (remaining.buffer.byteLength > min_size) {
        let input = nomUnsignedFourBytes(remaining, Endian.Le);
        if (input instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get CRC for ${path}: ${input}`);
        }

        const crc = input.value;
        input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
        if (input instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get size for ${path}: ${input}`);
        }
        const size = input.value;


        input = nomUnsignedOneBytes(input.remaining);
        if (input instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get record type for ${path}: ${input}`);
        }
        const record_type = getRecordType(input.value);

        const record = take(input.remaining, size);
        if (record instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get entry for ${path}: ${record}`);
        }
        const entry: LevelManifest = {
            crc,
            record_type,
            records: [],
        };
        let tag_remaining = record.nommed as Uint8Array;
        while (tag_remaining.buffer.byteLength !== 0) {
            input = nomUnsignedOneBytes(tag_remaining);
            if (input instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get tag type for ${path}: ${input}`);
            }
            const tag = getTag(input.value);

            const value = getTagValue(tag, input.remaining);
            if (value instanceof ApplicationError) {
                return value;
            }
            entry.records.push({ [ tag ]: value.value });
            tag_remaining = value.remaining;
            console.log(JSON.stringify(entry));
        }
        remaining = record.remaining as Uint8Array;
        level_records.push(entry);
    }

    return level_records;
}

export function parseWal(path: string): WalData[] | ApplicationError {
    const data = readFile(path);
    if (data instanceof FileError) {
        return new ApplicationError(`LEVELDB`, `could not read ${path}: ${data}`);
    }

    const level_records: WalData[] = [];
    let remaining = data;
    const min_size = 7;
    while (remaining.buffer.byteLength > min_size) {
        let input = nomUnsignedFourBytes(remaining, Endian.Le);
        if (input instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get CRC for ${path}: ${input}`);
        }

        const crc = input.value;
        input = nomUnsignedTwoBytes(input.remaining, Endian.Le);
        if (input instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get size for ${path}: ${input}`);
        }
        const size = input.value;


        input = nomUnsignedOneBytes(input.remaining);
        if (input instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get record type for ${path}: ${input}`);
        }
        const record_type = getRecordType(input.value);
        console.log(record_type);

        const record = take(input.remaining, size);
        if (record instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get entry for ${path}: ${record}`);
        }

        const values = parseWalValues(record.nommed as Uint8Array);
        if (values instanceof ApplicationError) {
            return values;
        }
        const entry: WalData = {
            crc,
            record_type,
            values,
        };


        remaining = record.remaining as Uint8Array;
        level_records.push(entry);
    }

    return level_records;
}

function parseWalValues(data: Uint8Array): WalValue[] | ApplicationError {
    console.log(JSON.stringify(Array.from(data)));
    let sequence = nomUnsignedEightBytes(data, Endian.Le);
    if (sequence instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get wal sequence: ${sequence}`);
    }

    let input = nomUnsignedFourBytes(sequence.remaining, Endian.Le);
    if (input instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get wal count: ${input}`);
    }

    let count = 0;
    const values: WalValue[] = [];
    let remaining = input.remaining;
    while (count < input.value) {
        const value_type = nomUnsignedOneBytes(remaining);
        if (value_type instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get wal value type: ${value_type}`);
        }

        let log_type = LogType.Unknown;
        let key = new Uint8Array([]);
        let value: null | Uint8Array = null;

        const key_size = nomUnsignedOneBytes(value_type.remaining);
        if (key_size instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get wal key size: ${key_size}`);
        }

        const key_data = take(key_size.remaining, key_size.value);
        if (key_data instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not get wal key data: ${key_data}`);
        }
        key = key_data.nommed as Uint8Array<ArrayBuffer>;
        remaining = key_data.remaining as Uint8Array;

        if (value_type.value === 1) {
            log_type = LogType.Value;
            const value_size = nomUnsignedOneBytes(remaining);
            if (value_size instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get wal value size: ${value_size}`);
            }
            const value_type = getValueType(value_size.remaining);
            let size = value_size.value;
            // UTF16 uses all remaining data?
            if (value_type === ValueType.Utf16) {
                size = value_size.remaining.byteLength;
            }

            const value_data = take(value_size.remaining, size);
            if (value_data instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get wal value data: ${value_data}`);
            }
            value = value_data.nommed as Uint8Array;
            remaining = value_data.remaining as Uint8Array;
        } else if (value_type.value === 0) {
            // It seems only keys can be recovered from deleted entries
            // Skipping for now
            log_type = LogType.Deletion;
            console.log("skipping deleted");
            count++;
            continue;
        }

        if (log_type === LogType.Unknown) {
            console.log(`got unknown log type: ${value_type.value}`);
            count++;
            continue;
            //return new ApplicationError(`LEVELDB`, `got unknown log type: ${value_type.value}`);
        }

        const entry: WalValue = {
            log_type,
            key_data: key,
            key: parseKey(key),
            value_data: value,
            value: 0,
            value_type: ValueType.Unknown,
            value_type_number: value?.at(0) ?? 0
        };
        if (entry.value_data !== null) {
            entry.value_type = getValueType(entry.value_data);
            console.log(JSON.stringify(entry));

            entry.value = parseValue(entry.value_data, entry.value_type);
            console.log(`key: ${entry.key} - ${JSON.stringify(entry.value)}`);
        }

        values.push(entry);
        count++;
    }

    return values;
}


function getRecordType(value: number): RecordType {
    switch (value) {
        case 1: return RecordType.Full;
        case 2: return RecordType.First;
        case 3: return RecordType.Middle;
        case 4: return RecordType.Last;
        default: return RecordType.Unknown;
    }
}

function getTag(value: number): ManifestTag {
    switch (value) {
        case 1: return ManifestTag.Comparator;
        case 2: return ManifestTag.LogNumber;
        case 3: return ManifestTag.NextFileNumber;
        case 4: return ManifestTag.LastSequence;
        case 5: return ManifestTag.CompactPointer;
        case 6: return ManifestTag.DeletedFile;
        case 7: return ManifestTag.NewFile;
        case 9: return ManifestTag.PrevLogNumber;
        default: return ManifestTag.Unknown;
    }
}

interface TagValue {
    value: string | number | Uint8Array | boolean | NewFileValue | CompactPoint | DeletedFile;
    remaining: Uint8Array;
}

function getTagValue(tag: ManifestTag, data: Uint8Array): TagValue | ApplicationError {
    switch (tag) {
        case ManifestTag.Comparator: {
            const size = nomUnsignedOneBytes(data);
            if (size instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get Comparator size: ${size}`);
            }
            const value = take(size.remaining, size.value);
            if (value instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get Comparator value: ${value}`);
            }

            const text = extractUtf8String(value.nommed as Uint8Array);
            return { value: text, remaining: value.remaining as Uint8Array };
        }
        case ManifestTag.LogNumber: return parseVarInt(data);
        case ManifestTag.NextFileNumber: return parseVarInt(data);
        case ManifestTag.LastSequence: return parseVarInt(data);
        case ManifestTag.PrevLogNumber: return parseVarInt(data);
        case ManifestTag.NewFile: {
            const level = parseVarInt(data);
            if (level instanceof ApplicationError) {
                return level;
            }
            const file_number = parseVarInt(level.remaining);
            if (file_number instanceof ApplicationError) {
                return file_number;
            }
            const size = parseVarInt(file_number.remaining);
            if (size instanceof ApplicationError) {
                return size;
            }
            const short_key_size = nomUnsignedOneBytes(size.remaining);
            if (short_key_size instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get short key size: ${short_key_size}`);
            }
            const small_key = take(short_key_size.remaining, short_key_size.value);
            if (small_key instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get short key value: ${small_key}`);
            }

            const long_key_size = nomUnsignedOneBytes(small_key.remaining as Uint8Array);
            if (long_key_size instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get long key size: ${long_key_size}`);
            }
            const long_key = take(long_key_size.remaining, long_key_size.value);
            if (long_key instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get long key value: ${long_key}`);
            }
            const new_file: NewFileValue = {
                smallest_key: small_key.nommed as Uint8Array,
                largest_key: long_key.nommed as Uint8Array,
                level: level.value as number,
                file_number: file_number.value as number,
                size: size.value as number,
            };
            return { value: new_file, remaining: long_key.remaining as Uint8Array };
        }
        case ManifestTag.CompactPointer: {
            const level = parseVarInt(data);
            if (level instanceof ApplicationError) {
                return level;
            }
            const key_size = nomUnsignedOneBytes(level.remaining as Uint8Array);
            if (key_size instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get key size: ${key_size}`);
            }
            const key = take(key_size.remaining, key_size.value);
            if (key instanceof NomError) {
                return new ApplicationError(`LEVELDB`, `could not get key value: ${key}`);
            }
            const compact: CompactPoint = {
                level: level.value as number,
                key: key.nommed as Uint8Array
            };

            return { value: compact, remaining: key.remaining as Uint8Array };
        }
        case ManifestTag.DeletedFile: {
            const level = parseVarInt(data);
            if (level instanceof ApplicationError) {
                return level;
            }
            const file_number = parseVarInt(level.remaining);
            if (file_number instanceof ApplicationError) {
                return file_number;
            }
            const compact: DeletedFile = {
                level: level.value as number,
                file_number: file_number.value as number
            };

            return { value: compact, remaining: file_number.remaining };
        }

    }

    return new ApplicationError(`LEVELDB`, `unknown tag: ${tag}`);
}

export function parseVarInt(data: Uint8Array): TagValue | ApplicationError {
    let var_value = 0;
    let proto_data = data;

    let shift = 0;
    const adjust = 0x7f;
    const wire = 7;
    const done = 0x80;
    while (proto_data.buffer.byteLength !== 0) {
        let value = nomUnsignedOneBytes(proto_data);
        if (value instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not parse LogNumber ${value}`);
        }
        var_value += (value.value & adjust) << (shift * wire);
        shift += 1;

        proto_data = value.remaining;
        if ((value.value & done) === 0) {
            break;
        }
    }
    return { value: var_value, remaining: proto_data };
}

function parseKey(data: Uint8Array): string {
    // Sometimes key is composed of 2 strings
    const prefix = 95;
    // If key starts has prefix '_' then it has two parts
    if (data.at(0) === prefix) {
        // First has end of string character?
        const first_part = takeUntil(data, new Uint8Array([ 0 ]));
        if (first_part instanceof NomError) {
            return "Unknown Key";
        }

        const first_data = (first_part.remaining as Uint8Array).buffer.slice(2);
        // If 0 the encoding is UTF16-LE. Otherwise its ASCII
        if (new Uint8Array((first_part.remaining as Uint8Array).buffer.slice(1, 2)) === new Uint8Array([ 0 ])) {
            return `${extractUtf8String(first_part.nommed as Uint8Array)}${extractUtf16String(new Uint8Array(first_data))}`;
        } else {
            return `${extractUtf8String(first_part.nommed as Uint8Array)}${extractUtf8String(new Uint8Array(first_data))}`;
        }
    }
    return extractUtf8String(data);
}

function getValueType(data: Uint8Array): ValueType {
    // If the length is less than 3 then value is string by default
    // https://chromium.googlesource.com/chromium/src.git/+/62.0.3178.1/content/browser/indexed_db/leveldb_coding_scheme.md#idbkeypath-values
    if (data.byteLength <= 3) {
        return ValueType.String;
    }
    const result = nomUnsignedOneBytes(data);
    if (result instanceof NomError) {
        return ValueType.Unknown;
    }
    switch (result.value) {
        case 0: return ValueType.Unknown;
        case 1: return ValueType.String;
        case 2: return ValueType.Date;
        case 3: return ValueType.Number;
        case 4: return ValueType.Array;
        case 6: return ValueType.Binary;
        case 8: return ValueType.Protobuf;
        case 15: return ValueType.Utf16;
        default: return ValueType.Unknown;
    }
}

function parseValue(data: Uint8Array, value_type: ValueType): string | number | boolean | unknown[] | Record<string, ProtoTag> {
    let input = data;
    // If Protobuf or value is very small
    // Use entire byte array
    // https://chromium.googlesource.com/chromium/src.git/+/62.0.3178.1/content/browser/indexed_db/leveldb_coding_scheme.md#idbkeypath-values
    if (value_type !== ValueType.Protobuf && data.byteLength > 3) {
        input = new Uint8Array(input.buffer.slice(1));
    }

    if (value_type === ValueType.Protobuf) {
        const result = parseProtobuf(input);
        if (result instanceof EncodingError) {
            return "Unknown value";
        }
        return result;
    }

    if (value_type === ValueType.String) {
        return extractUtf8String(input);
    }
    if (value_type === ValueType.Utf16) {
        return extractUtf16String(input);
    }
    console.log(`unknown value type: ${value_type}`);
    console.log(JSON.stringify(Array.from(data)));
    return "Unknown value";
}