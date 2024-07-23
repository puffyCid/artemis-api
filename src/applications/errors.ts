import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "LIBREOFFICE"
  | "VSCODE"
  | "CHROMIUM"
  | "FIREFOX"
  | "SQLITE"
  | "DEFENDER"
  | "OFFICE"
  | "ONEDRIVE";

export class ApplicationError extends ErrorBase<ErrorName> {}
