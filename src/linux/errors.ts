import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "ELF"
  | "JOURNAL"
  | "LOGON"
  | "DEBPACKAGES"
  | "SUDOLOGS"
  | "RPMPACKAGES";

export class LinuxError extends ErrorBase<ErrorName> {}
