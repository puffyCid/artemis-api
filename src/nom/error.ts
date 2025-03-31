import { ErrorBase } from "../utils/error";

export type ErrorName = "NOM";

export class NomError extends ErrorBase<ErrorName> {}
