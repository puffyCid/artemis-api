import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "ZLIB"
  | "GZIP";

export class CompressionError extends ErrorBase<ErrorName> {}
