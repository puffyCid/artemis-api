import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "PE";

export class WindowsError extends ErrorBase<ErrorName> {}
