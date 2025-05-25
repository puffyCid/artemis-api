import { SystemError } from "./error";

/**
 * An interface to output data using `artemis`
 */
export interface Output {
  /**Name of output directory */
  name: string;
  /**Target directory for output */
  directory: string;
  /**Format of output: JSON or JSONL or CSV */
  format: Format;
  /**Compress data with GZIP and all files with ZIP */
  compress: boolean;
  /**Use `timelineArtifact()` or timeline the data yourself (using TS/JS). The Rust timeliner cannot timeline dynamic artifacts */
  timeline: false;
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
  CSV = "csv",
}

/**Output type. Only local, azure, aws, and gcp supported */
export enum OutputType {
  LOCAL = "local",
  AZURE = "azure",
  AWS = "aws",
  GCP = "gcp",
}

/**
 * Function to pass data to artemis to save
 * @param data Data you want to output
 * @param data_name Name of the type of data. Ex: `processes`
 * @param output `Output` structure to pass to artemis
 * @returns True on success or `SystemError`
 */
export function outputResults(
  data: unknown,
  data_name: string,
  output: Output,
): boolean | SystemError {
  try {
    //@ts-ignore: Custom Artemis function
    const status: boolean = js_output_results(
      data,
      data_name,
      output,
    );
    return status;
  } catch (err) {
    return new SystemError(`OUTPUT`, `failed to output data: ${err}`);
  }
}

/**
 * Function to pass data to `artemis` to save, skipping metadata
 * @param data Data you want to output
 * @param data_name Name of the type of data. Ex: `processes`
 * @param output Output structure to pass to `artemis`
 * @returns True on success or `SystemError`
 */
export function dumpData(
  data: unknown,
  data_name: string,
  output: Output,
): boolean | SystemError {
  try {
    //@ts-ignore: Custom Artemis function
    const status: boolean = js_raw_dump(
      data,
      data_name,
      output,
    );
    return status;
  } catch (err) {
    return new SystemError(`OUTPUT`, `failed to output raw data: ${err}`);
  }
}
