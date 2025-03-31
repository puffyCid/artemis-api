import { ErrorBase } from "../utils/error";

export type ErrorName = "READ_XML" | "BASE64" | "PROTOBUF";

export class EncodingError extends ErrorBase<ErrorName> {}
