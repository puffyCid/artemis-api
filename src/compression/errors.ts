import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "ZLIB"
  | "GZIP";

export class CompressionError extends ErrorBase<ErrorName> {}
