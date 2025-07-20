import { ErrorBase } from "../utils/error";

export type ErrorName = "XML" | "BASE64" | "PROTOBUF" | "CSV";

export class EncodingError extends ErrorBase<ErrorName> { }
