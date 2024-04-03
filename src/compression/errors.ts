import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "ZLIB";

export class CompressionError extends ErrorBase<ErrorName> {}
