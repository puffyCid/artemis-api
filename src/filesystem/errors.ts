import { ErrorBase } from "../utils/error";

export type ErrorName =
  | "READ_DIR"
  | "STAT"
  | "HASH"
  | "READ_TEXT_FILE"
  | "READ_FILE"
  | "GLOB"
  | "READ_LINES"
  | "READER"
  | "ACCESSOR";

export class FileError extends ErrorBase<ErrorName> { }
