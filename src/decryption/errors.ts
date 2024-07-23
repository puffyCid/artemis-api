import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "AES";

export class DecryptError extends ErrorBase<ErrorName> {}
