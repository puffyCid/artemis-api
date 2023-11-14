import { ErrorBase } from "../utils/error.ts";

export type ErrorName =
  | "READ_DIR"
  | "STAT"
  | "HASH"
  | "READ_TEXT_FILE"
  | "READ_FILE"
  | "GLOB";

export class FileError extends ErrorBase<ErrorName> {}
