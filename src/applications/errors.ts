import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "LIBREOFFICE"
  | "VSCODE"
  | "CHROMIUM"
  | "FIREFOX"
  | "SQLITE"
  | "DEFENDER"
  | "OFFICE"
  | "ONEDRIVE"
  | "NEXTCLOUD_CLIENT";

export class ApplicationError extends ErrorBase<ErrorName> { }
