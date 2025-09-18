import { CompactPoint, DeletedFile, LevelDbEntry, LevelManifest, LogType, ManifestTag, NewFileValue, RecordType, ValueType, WalData, WalValue } from "../../../types/applications/level";
import { ProtoTag } from "../../../types/encoding/protobuf";
import { encode } from "../../encoding/base64";
import { EncodingError } from "../../encoding/errors";
import { parseProtobuf } from "../../encoding/protobuf";
import { extractUtf16String, extractUtf8String } from "../../encoding/strings";
import { FileError } from "../../filesystem/errors";
import { readFile } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedEightBytes, nomUnsignedFourBytes, nomUnsignedOneBytes, nomUnsignedTwoBytes } from "../../nom/helpers";
import { take, takeUntil } from "../../nom/parsers";
import { ApplicationError } from "../errors";

/**
 * Function to parse the LevelDB manifest
 * @param path Path the LevelDb manifest
 * @returns Array of `LevelManifest` or `ApplicationError`
 */
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
        }
        remaining = record.remaining as Uint8Array;
        level_records.push(entry);
    }

    return level_records;
}

/**
 * Function to parse the LevelDb write ahead log (WAL)
 * @param path Path the Write Ahead Log (WAL)
 * @returns Array of `LevelDbEntry` or `ApplicationError`
 */
export function parseWal(path: string): LevelDbEntry[] | ApplicationError {
    const data = readFile(path);
    if (data instanceof FileError) {
        return new ApplicationError(`LEVELDB`, `could not read ${path}: ${data}`);
    }

    let level_records: LevelDbEntry[] = [];
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

        const values = parseWalValues(record.nommed as Uint8Array, path);
        if (values instanceof ApplicationError) {
            return values;
        }

        remaining = record.remaining as Uint8Array;

        level_records = level_records.concat(values);
    }

    return level_records;
}

/**
 * Function to parse write ahead log (WAL) values
 * @param data Raw bytes associated with wal data
 * @param path Path to WAL log file
 * @returns Array of `WalValue` or `ApplicationError`
 */
function parseWalValues(data: Uint8Array, path: string): LevelDbEntry[] | ApplicationError {
    let sequence = nomUnsignedEightBytes(data, Endian.Le);
    if (sequence instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get wal sequence: ${sequence}`);
    }

    let input = nomUnsignedFourBytes(sequence.remaining, Endian.Le);
    if (input instanceof NomError) {
        return new ApplicationError(`LEVELDB`, `could not get wal count: ${input}`);
    }

    let count = 0;
    const values: LevelDbEntry[] = [];
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
            const value_size = parseVarInt(remaining);
            if (value_size instanceof ApplicationError) {
                return new ApplicationError(`LEVELDB`, `could not get wal value size: ${value_size}`);
            }
            const value_type = getValueType(value_size.remaining);
            let size = value_size.value as number;
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
            const key_string = parseKey(key);

            const entry: LevelDbEntry = {
                sequence: 0,
                key_type: 0,
                value_type: ValueType.Unknown,
                value: "",
                shared_key: "",
                origin: key_string.split(" ").at(0) ?? key_string,
                key: key_string.split(" ").at(1) ?? key_string,
                path
            };
            values.push(entry);

            count++;
            continue;
        }

        if (log_type === LogType.Unknown) {
            return new ApplicationError(`LEVELDB`, `got unknown log type: ${value_type.value}`);
        }

        const key_string = parseKey(key);
        const entry: LevelDbEntry = {
            sequence: 0,
            key_type: 0,
            value_type: ValueType.Unknown,
            value: "",
            shared_key: "",
            origin: key_string.split(" ").at(0) ?? key_string,
            key: key_string.split(" ").at(1) ?? key_string,
            path
        };

        if (value !== null) {
            entry.value_type = getValueType(value);
            entry.value = parseValue(value, entry.value_type);
        }

        values.push(entry);
        count++;
    }

    return values;
}

/**
 * Determine RecordType
 * @param value Record type value
 * @returns `RecordType` enum
 */
function getRecordType(value: number): RecordType {
    switch (value) {
        case 1: return RecordType.Full;
        case 2: return RecordType.First;
        case 3: return RecordType.Middle;
        case 4: return RecordType.Last;
        default: return RecordType.Unknown;
    }
}

/**
 * Determine ManifestTag type
 * @param value Tag value
 * @returns `ManifestTag` enum
 */
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

/**
 * Function to parse tag values
 * @param tag `ManifestTag` object
 * @param data Raw bytes associated with the tag value
 * @returns `TagValue` or `ApplicationError`
 */
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

/**
 * Function to parse varint data. Based on protobuf format
 * @param data Raw bytes associated protobuf varint data
 * @returns `TagValue` object or `ApplicationError`
 */
export function parseVarInt(data: Uint8Array): TagValue | ApplicationError {
    // If the varint length is one then 0 index is our value
    if (data.buffer.byteLength === 1) {
        return { value: data[ 0 ], remaining: new Uint8Array() };
    }

    let var_value = 0;
    let proto_data = data;

    let shift = 0;
    const adjust = 0x7f;
    const wire = 7;
    const done = 0x80;
    while (proto_data.buffer.byteLength !== 0) {
        let value = nomUnsignedOneBytes(proto_data);
        if (value instanceof NomError) {
            return new ApplicationError(`LEVELDB`, `could not parse varint ${value}`);
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

/**
 * Function to parse the leveldb key string
 * @param data Bytes associated leveldb key
 * @returns The key string
 */
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
            return `${extractUtf8String(first_part.nommed as Uint8Array)} ${extractUtf16String(new Uint8Array(first_data))}`;
        } else {
            return `${extractUtf8String(first_part.nommed as Uint8Array)} ${extractUtf8String(new Uint8Array(first_data))}`;
        }
    }
    return extractUtf8String(data);
}

/**
 * Function to determine leveldb value type
 * @param data Bytes associated value type
 * @returns `ValueType` enum
 */
export function getValueType(data: Uint8Array): ValueType {
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
        case 0: return ValueType.Utf16;
        case 1: return ValueType.String;
        case 2: return ValueType.Date;
        case 3: return ValueType.Number;
        case 4: return ValueType.Array;
        case 6: return ValueType.Binary;
        case 8: return ValueType.Protobuf;
        case 15: return ValueType.Utf16;
        default: {
            // Default values might be strings?
            if (Array.from(data).includes(0)) {
                return ValueType.Utf16;
            } else if (!extractUtf8String(result.remaining).includes("[string]")) {
                return ValueType.String;
            }
            console.warn(`Unknown value type: ${result.value}`);
            return ValueType.Unknown;
        }
    }
}

/**
 * Function to get leveldb value
 * @param data Bytes associated with value
 * @param value_type `ValueType` enum
 * @returns string | number | boolean | unknown[] | Record<string, ProtoTag>
 */
export function parseValue(data: Uint8Array, value_type: ValueType): string | number | boolean | unknown[] | Record<string, ProtoTag> {
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
    // This may already be base64?
    if (value_type === ValueType.Binary) {
        return encode(data);
    }
    //console.log(`unknown value type: ${value_type}`);
    //console.log(JSON.stringify(Array.from(data)));
    return "Unknown value";
}

/**
 * Function to test the leveldb wal file parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the leveldb parsing
 */
export function testLevelWal(): void {
    const parse_value_test = [ 8, 130, 194, 232, 178, 246, 159, 231, 23, 16, 85 ];
    const parse_value_result = parseValue(new Uint8Array(parse_value_test), ValueType.Protobuf);
    if (parse_value_result instanceof ApplicationError) {
        throw parse_value_result;
    }

    if (parse_value_result[ "1" ].value != "13401944653177090") {
        throw `Got value ${parse_value_result[ "1" ].value} expected 13401944653177090.......parseValue ❌`;
    }
    console.info(`  Function parseValue ✅`);

    const value_type_test = [ 0, 1, 2, 3, 4, 6, 8, 15 ];
    for (const entry of value_type_test) {
        const result = getValueType(new Uint8Array([ entry, 0, 0, 0 ]));
        if (result === ValueType.Unknown) {
            `Got unknown value type for ${entry}.......getValueType ❌`;
        }
    }
    console.info(`  Function getValueType ✅`);

    const parse_key_test = [ 77, 69, 84, 65, 58, 104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109 ];
    const parse_key_result = parseKey(new Uint8Array(parse_key_test));

    if (parse_key_result !== "META:https://www.google.com") {
        throw `Got key ${parse_key_result} expected META:https://www.google.com.......parseKey ❌`;
    }
    console.info(`  Function parseKey ✅`);

    const parse_var_int_test = [ 77, 69, 84, 65, 58, 104, 116, 116, 112, 115, 58, 47, 47, 119, 119, 119, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109 ];
    const parse_var_int_result = parseVarInt(new Uint8Array(parse_var_int_test));
    if (parse_var_int_result instanceof ApplicationError) {
        throw parse_var_int_result;
    }
    if (parse_var_int_result.value !== 77) {
        throw `Got value ${parse_var_int_result.value} expected 77.......parseVarInt ❌`;
    }
    console.info(`  Function parseVarInt ✅`);

    const get_tag_value_test = [ 26, 108, 101, 118, 101, 108, 100, 98, 46, 66, 121, 116, 101, 119, 105, 115, 101, 67, 111, 109, 112, 97, 114, 97, 116, 111, 114, 2, 0, 3, 2, 4, 0 ];
    const get_tag_value_result = getTagValue(ManifestTag.Comparator, new Uint8Array(get_tag_value_test));
    if (get_tag_value_result instanceof ApplicationError) {
        throw get_tag_value_result;
    }
    if (get_tag_value_result.value !== "leveldb.BytewiseComparator") {
        throw `Got value ${get_tag_value_result.value} expected leveldb.BytewiseComparator.......getTagValue ❌`;
    }
    console.info(`  Function getTagValue ✅`);

    const get_tag_test = [ 1, 2, 3, 4, 5, 6, 7, 9 ];
    for (const entry of get_tag_test) {
        const result = getTag(entry);
        if (result === ManifestTag.Unknown) {
            `Got unknown manifest tag for ${entry}.......getTag ❌`;
        }
    }
    console.info(`  Function getTag ✅`);

    const get_record_type_test = [ 1, 2, 3, 4 ];
    for (const entry of get_record_type_test) {
        const result = getRecordType(entry);
        if (result === RecordType.Unknown) {
            `Got unknown record type for ${entry}.......getRecordType ❌`;
        }
    }
    console.info(`  Function getRecordType ✅`);

    const parse_wal_values_test = [ 226, 45, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 12, 77, 69, 84, 65, 58, 102, 105, 108, 101, 58, 47, 47, 11, 8, 208, 186, 223, 177, 158, 197, 230, 23, 16, 36, 1, 31, 95, 102, 105, 108, 101, 58, 47, 47, 0, 1, 108, 97, 115, 116, 82, 101, 99, 101, 105, 118, 101, 100, 65, 116, 67, 111, 117, 110, 116, 101, 114, 14, 1, 49, 55, 53, 51, 57, 50, 51, 55, 48, 48, 51, 48, 55
    ];
    const parse_wal_values_result = parseWalValues(new Uint8Array(parse_wal_values_test), "");
    if (parse_wal_values_result instanceof ApplicationError) {
        throw parse_wal_values_result;
    }

    if (parse_wal_values_result.length != 2) {
        throw `Got length ${parse_wal_values_result.length} expected 2.......parseWalValues ❌`;
    }
    if (parse_wal_values_result[ 1 ].value != 1753923700307) {
        throw `Got value ${parse_wal_values_result[ 1 ].value} expected 1753923700307.......parseWalValues ❌`;
    }
    console.info(`  Function parseWalValues ✅`);

    const parse_wal_result = parseWal("../../test_data/leveldb/000004.log");
    if (parse_wal_result instanceof ApplicationError) {
        throw parse_wal_result;
    }

    if (parse_wal_result.length != 7) {
        throw `Got length ${parse_wal_result.length} expected 7.......parseWal ❌`;
    }
    if (parse_wal_result[ 1 ].value !== "0aAFtxy5hqMZ-m5_84cwxsP9wDeMSWgnZIZV8HYeffZdqJJZVdLX0yDE4UmHJ-F18zr6wVg952cpmadDgN3LcJ7Bbac7IopaVc8pplhgtVdTuVXI4aig") {
        throw `Got ${parse_wal_result[ 1 ].value} expected 0aAFtxy5hqMZ-m5_84cwxsP9wDeMSWgnZIZV8HYeffZdqJJZVdLX0yDE4UmHJ-F18zr6wVg952cpmadDgN3LcJ7Bbac7IopaVc8pplhgtVdTuVXI4aig.......parseWal ❌`;
    }
    console.info(`  Function parseWal ✅`);

    const parse_manifest_result = parseWalManifest("../../test_data/leveldb/MANIFEST-000001");
    if (parse_manifest_result instanceof ApplicationError) {
        throw parse_wal_result;
    }

    if (parse_manifest_result.length != 1) {
        throw `Got manifest length ${parse_manifest_result.length} expected 1.......parseWalManifest ❌`;
    }
    if (!JSON.stringify(parse_manifest_result[ 0 ].records[ 0 ]).includes("Comparator")) {
        throw `Got ${JSON.stringify(parse_manifest_result[ 0 ].records[ 0 ])} and does not include Comparator.......parseWalManifest ❌`;
    }
    console.info(`  Function parseWalManifest ✅`);
}