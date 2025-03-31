import { ErrorBase } from "../../utils/error";

export type ErrorName = "BLOB";

export class SigningError extends ErrorBase<ErrorName> {}
