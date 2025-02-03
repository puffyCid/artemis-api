import { querySqlite } from "../../../../mod.ts";
import { ApplicationError } from "../../../applications/errors.ts";
import { decode } from "../../../encoding/base64.ts";
import { EncodingError } from "../../../encoding/errors.ts";
import { extractUtf8String } from "../../../encoding/strings.ts";
import { IosError } from "../../error.ts";

/**
 * Function to extract JSON blob from metrics db
 * @param path Path to metrics db
 * @returns Array of JSON objects or `IosError`
 */
export function parseMetrics(
  path: string,
): Record<string, unknown>[] | IosError {
  const query = "SELECT * FROM ZMETRICMO";
  const result = querySqlite(path, query);
  if (result instanceof ApplicationError) {
    return new IosError(`HINGE`, `failed to query metrics: ${result}`);
  }
  const metrics = [];

  for (const entry of result as Record<string, string>[]) {
    const payload = entry["ZDATA"];
    const bytes = decode(payload);
    if (bytes instanceof EncodingError) {
      continue;
    }
    const json_data = JSON.parse(extractUtf8String(bytes));
    metrics.push(json_data);
  }

  return metrics;
}
