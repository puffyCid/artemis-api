import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "PE"
  | "SHIMDB"
  | "AMCACHE"
  | "BITS"
  | "ESE"
  | "EVENTLOG"
  | "JUMPLIST"
  | "NTFS"
  | "PREFETCH"
  | "RECYCLEBIN"
  | "REGISTRY"
  | "SEARCH"
  | "SERVICES"
  | "SHELLBAGS"
  | "SHIMCACHE"
  | "SHIMDB"
  | "SHORTCUTS"
  | "SRUM"
  | "TASKS"
  | "USERASSIST"
  | "USERS"
  | "USNJRNL"
  | "LOGONCORRELATION"
  | "CHOCOLATEYINFO"
  | "UPDATESHISTORY"
  | "POWERSHELL";

export class WindowsError extends ErrorBase<ErrorName> {}
