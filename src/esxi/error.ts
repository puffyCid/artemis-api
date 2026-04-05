import { ErrorBase } from "../utils/error";

export type ErrorName =
    | "SHELLHISTORY"
    | "VIBPACKAGE";

export class EsxiError extends ErrorBase<ErrorName> { }
