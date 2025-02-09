import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "URL_PARSE";

export class UnfoldError extends ErrorBase<ErrorName> {}
