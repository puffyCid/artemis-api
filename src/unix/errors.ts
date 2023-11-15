import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "CRON"
  | "BASHHISTORY"
  | "ZSHHISTORY"
  | "PYTHONHISTORY"
  | "SUDOLOGS";

export class UnixError extends ErrorBase<ErrorName> {}
