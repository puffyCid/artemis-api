import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "REQUEST_ERROR"
  | "LOOKUP_HASH"
  | "LOOKUP_IP"
  | "LOOKUP_DOMAIN";

export class HttpError extends ErrorBase<ErrorName> {}
