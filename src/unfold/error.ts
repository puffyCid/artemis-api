import { ErrorBase } from "../utils/error";

export type ErrorName = "URL_PARSE";

export class UnfoldError extends ErrorBase<ErrorName> {}
