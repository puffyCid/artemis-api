import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "CRON"
  | "BASHHISTORY"
  | "ZSHHISTORY"
  | "PYTHONHISTORY"
  | "SUDOLOGS";

export class UnixError extends ErrorBase<ErrorName> {}
