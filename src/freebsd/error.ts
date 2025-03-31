import { ErrorBase } from "../utils/error";

export type ErrorName =
    | "PKG";

export class FreebsdError extends ErrorBase<ErrorName> { }
