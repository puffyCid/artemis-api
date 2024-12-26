import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "ELF"
  | "JOURNAL"
  | "LOGON"
  | "DEBPACKAGES"
  | "SUDOLOGS"
  | "RPMPACKAGES"
  | "GNOME_APP_USAGE"
  | "GEDIT";

export class LinuxError extends ErrorBase<ErrorName> {}
