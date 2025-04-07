import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "ELF"
  | "JOURNAL"
  | "LOGON"
  | "DEBPACKAGES"
  | "SUDOLOGS"
  | "RPMPACKAGES"
  | "GNOME_APP_USAGE"
  | "GEDIT"
  | "GVFS"
  | "SNAP"
  | "ABRT"
  | "EPIPHANY";

export class LinuxError extends ErrorBase<ErrorName> { }
