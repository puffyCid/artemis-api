import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "ELF"
  | "JOURNAL";

export class LinuxError extends ErrorBase<ErrorName> {}
