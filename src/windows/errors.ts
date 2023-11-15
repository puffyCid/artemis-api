import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
    | "PE"
    | "SHIMDB";

export class WindowsError extends ErrorBase<ErrorName> { }
