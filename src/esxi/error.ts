import { ErrorBase } from "../utils/error";

export type ErrorName =
    | "SHELLHISTORY";

export class EsxiError extends ErrorBase<ErrorName> { }
