import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "ICON_ICNS";

export class ImageError extends ErrorBase<ErrorName> {}
