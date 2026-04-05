import { ErrorBase } from "../utils/error";

export type ErrorName =
    | "SHELLHISTORY"
    | "VIBPACKAGE"
    | "SYSLOG"
    | "ACCOUNTS";

export class EsxiError extends ErrorBase<ErrorName> { }
