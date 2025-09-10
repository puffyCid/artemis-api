import { ProtoTag } from "../encoding/protobuf";

export interface LevelManifest {
    crc: number;
    record_type: RecordType;
    records: LevelRecords[];
}

export interface WalData {
    crc: number;
    record_type: RecordType;
    values: WalValue[];
}

export interface WalValue {
    log_type: LogType;
    key_data: Uint8Array;
    key: string;
    value_data: Uint8Array | null;
    value: string | number | boolean | unknown[] | Record<string, ProtoTag>;
    value_type: ValueType;
    value_type_number: number;
}

export enum LogType {
    Deletion = "Deletion",
    Value = "Value",
    Unknown = "Unknown",
}

export enum ManifestTag {
    Comparator = "Comparator",
    LogNumber = "LogNumber",
    NextFileNumber = "NextFileNumber",
    LastSequence = "LastSequence",
    CompactPointer = "CompactPointer",
    DeletedFile = "DeletedFile",
    NewFile = "NewFile",
    PrevLogNumber = "PrevLogNumber",
    Unknown = "Unknown",
}

export enum ValueType {
    String = "String",
    Null = "Null",
    Number = "Number",
    Date = "Date",
    Binary = "Binary",
    Array = "Array",
    Unknown = "Unknown",
    Protobuf = "Protobuf",
    Utf16 = "Utf16",
}

export enum RecordType {
    Full = "Full",
    First = "First",
    Middle = "Middle",
    Last = "Last",
    Unknown = "Unknown",
}

export interface LevelRecords {
    [ key: string ]: string | number | boolean | Uint8Array | NewFileValue | CompactPoint | DeletedFile;
}
export interface NewFileValue {
    level: number;
    file_number: number;
    size: number;
    smallest_key: Uint8Array;
    largest_key: Uint8Array;
}

export interface CompactPoint {
    level: number;
    key: Uint8Array;
}

export interface DeletedFile {
    level: number;
    file_number: number;
}