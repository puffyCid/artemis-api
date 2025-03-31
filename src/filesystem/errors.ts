import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "READ_DIR"
  | "STAT"
  | "HASH"
  | "READ_TEXT_FILE"
  | "READ_FILE"
  | "GLOB"
  | "ACQUIRE";

export class FileError extends ErrorBase<ErrorName> {}
