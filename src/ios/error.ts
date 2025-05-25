import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "INFO_PLIST"
  | "APP_ITUNES_METADATA"
  | "STATUS_PLIST"
  | "MANIFEST_PLIST"
  | "MANIFEST_DB"
  | "SENDBIRD"
  | "FIREBASE"
  | "AMAZON_ECHO"
  | "BUGSNAG"
  | "ZOOM"
  | "HINGE"
  | "ROOTDOMAIN"
  | "DUCKDUCKGO"
  | "APPLE_LINKD"
  | "APPSTATE";

export class IosError extends ErrorBase<ErrorName> { }
