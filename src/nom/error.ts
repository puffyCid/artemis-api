import { ErrorBase } from "../utils/error.ts";

export type ErrorName = "NOM";

export class NomError extends ErrorBase<ErrorName> {}
