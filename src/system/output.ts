/**
 * An interface to output data using `artemis`
 *
 * References:
 *  - https://puffycid.github.io/artemis-book/collections/format.html
 */
export interface Output {
  /**Name of output directory */
  name: string;
  /**Target directory for output */
  directory: string;
  /**Format of output: JSON or JSONL */
  format: Format;
  /**Compress data with GZIP and all files with ZIP */
  compress: boolean;
  /**Endpoint ID */
  endpoint_id: string;
  /**ID for collection. Must be postive number */
  collection_id: number;
  /**Output type: local, azure, aws, or gcp */
  output: OutputType;
  /**URL associated with remote upload */
  url?: string;
  /**API key required for remote upload */
  api_key?: string;
}

/** Output format types. Only JSON and JSONL supported */
export enum Format {
  JSON = "json",
  JSONL = "jsonl",
}

/**Output type. Only local, azure, aws, and gcp supported */
export enum OutputType {
  LOCAL = "local",
  AZURE = "azure",
  AWS = "aws",
  GCP = "gcp",
}

/**
 * Function to pass output data to `artemis`
 * @param data JSON string of data
 * @param data_name Name of the type of data. Ex: `processes`
 * @param output Output structure to pass to artemis
 * @returns True on success. False on failure
 */
export function outputResults(
  data: string,
  data_name: string,
  output: Output,
): boolean {
  const output_string = JSON.stringify(output);
  const status: boolean = Deno.core.ops.output_results(
    data,
    data_name,
    output_string,
  );
  return status;
}
