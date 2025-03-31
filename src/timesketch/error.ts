import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "UPLOAD"
  | "TIMELINE"
  | "OUTPUT"
  | "ARTIFACT"
  | "AUTH"
  | "SKETCH_ID";

export class TimesketchError extends ErrorBase<ErrorName> {}
