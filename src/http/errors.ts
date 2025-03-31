import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "REQUEST_ERROR"
  | "LOOKUP_HASH"
  | "LOOKUP_IP"
  | "LOOKUP_DOMAIN";

export class HttpError extends ErrorBase<ErrorName> {}
