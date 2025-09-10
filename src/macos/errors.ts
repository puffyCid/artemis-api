import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "ALIAS"
  | "PLIST"
  | "FIREWALL"
  | "POLICY"
  | "MACHO"
  | "FSEVENTS"
  | "ACCOUNTS"
  | "EMOND"
  | "LAUNCHD"
  | "LOGINITEMS"
  | "SAFARI"
  | "EXECPOLICY"
  | "UNIFIEDLOGS"
  | "SUDOLOGS"
  | "BOM"
  | "SYSTEM_EXTENSION"
  | "TCC"
  | "SPOTLIGHT"
  | "XPROTECT"
  | "BIOME"
  | "LULU"
  | "MUNKI"
  | "QUARANTINE_EVENT"
  | "BOOKMARK"
  | "GAKTKEEPER"
  | "LOGONS"
  | "COOKIES"
  | "SYSTEMSTATS"
  | "AUTHORIZATIONS";

export class MacosError extends ErrorBase<ErrorName> {}
