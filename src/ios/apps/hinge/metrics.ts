import { querySqlite } from "../../../../mod";
import { ApplicationError } from "../../../applications/errors";
import { decode } from "../../../encoding/base64";
import { EncodingError } from "../../../encoding/errors";
import { extractUtf8String } from "../../../encoding/strings";
import { IosError } from "../../error";

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
  const metrics: any[] = [];

  for (const entry of result as Record<string, string>[]) {
    const payload = entry[ "ZDATA" ];
    const bytes = decode(payload);
    if (bytes instanceof EncodingError) {
      continue;
    }
    const json_data = JSON.parse(extractUtf8String(bytes));
    metrics.push(json_data);
  }

  return metrics;
}
