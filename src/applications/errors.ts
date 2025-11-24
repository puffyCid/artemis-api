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
  | "NEXTCLOUD_CLIENT"
  | "CHROME"
  | "EDGE"
  | "CHROMIUM"
  | "LEVELDB"
  | "ANYDESK"
  | "SYNCTHING";

export class ApplicationError extends ErrorBase<ErrorName> { }
