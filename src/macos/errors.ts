import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "ALIAS"
  | "PLIST"
  | "FIREWALL"
  | "POLICY"
  | "MACHO"
  | "FSEVENTS";

export class MacosError extends ErrorBase<ErrorName> {}
