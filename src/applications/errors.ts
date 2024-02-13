import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "LIBREOFFICE"
  | "VSCODE"
  | "CHROMIUM"
  | "FIREFOX"
  | "SQLITE";

export class ApplicationError extends ErrorBase<ErrorName> {}
