import { ErrorBase } from "../../utils/error.ts";

export type ErrorName = "BLOB";

export class SigningError extends ErrorBase<ErrorName> {}
