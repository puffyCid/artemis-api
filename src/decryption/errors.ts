import { ErrorBase } from "../utils/error";

export type ErrorName = "AES";

export class DecryptError extends ErrorBase<ErrorName> {}
