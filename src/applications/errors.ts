import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "LIBREOFFICE"
  | "VSCODE";

export class ApplicationError extends ErrorBase<ErrorName> {}
