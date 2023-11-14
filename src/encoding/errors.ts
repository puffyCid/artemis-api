import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "READ_XML";

export class EncodingError extends ErrorBase<ErrorName> {}
