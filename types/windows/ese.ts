/** Generic Interface for dumpting ESE tables */
export interface EseTable {
    column_type: ColumnType;
    column_name: string;
    /**Binary data is base64 encoded. All data is decompressed if possible */
    column_data: string;
}

export enum ColumnType {
    Nil = "Nil",
    Bit = "Bit",
    UnsignedByte = "UnsignedByte",
    Short = "Short",
    Long = "Long",
    Currency = "Currency",
    Float32 = "Float32",
    Float64 = "Float64",
    DateTime = "DateTime",
    Binary = "Binary",
    /** Can be ASCII or Unicode */
    Text = "Text",
    LongBinary = "LongBinary",
    /**Can be ASCII or Unicode */
    LongText = "LongText",
    SuperLong = "SuperLong",
    UnsignedLong = "UnsignedLong",
    LongLong = "LongLong",
    Guid = "Guid",
    UnsingedShort = "UnsingedShort",
    Unknown = "Unknown"
}