import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "ZLIB"
  | "GZIP"
  | "SNAPPY"
  | "ZSTD"
  | "LZVN";

export class CompressionError extends ErrorBase<ErrorName> { }
