import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "OUTPUT";

export class SystemError extends ErrorBase<ErrorName> {}
