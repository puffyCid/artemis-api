import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "ZLIB"
  | "GZIP"
  | "SNAPPY"
  | "ZSTD"
  | "LZVN"
  | "LZ4";

export class CompressionError extends ErrorBase<ErrorName> { }
