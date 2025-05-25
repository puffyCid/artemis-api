import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "CRON"
  | "BASHHISTORY"
  | "ZSHHISTORY"
  | "PYTHONHISTORY"
  | "SSH_KNOWN_HOSTS";

export class UnixError extends ErrorBase<ErrorName> { }
