import { ErrorBase } from "../utils/error";

export type ErrorName = "OUTPUT";

export class SystemError extends ErrorBase<ErrorName> {}
