import { ErrorBase } from "../utils/error.ts";

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
  | "QUARANTINE_EVENT";

export class MacosError extends ErrorBase<ErrorName> {}
