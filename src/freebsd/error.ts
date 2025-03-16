import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
    | "PKG";

export class FreebsdError extends ErrorBase<ErrorName> { }
