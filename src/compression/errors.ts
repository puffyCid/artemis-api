import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "ZLIB"
  | "GZIP"
  | "SNAPPY"
  | "ZSTD";

export class CompressionError extends ErrorBase<ErrorName> { }
