import { SystemError } from "./error";

/**
 * An interface to output data using `artemis`
 */
export interface Output {
  /**Name of output directory */
  name: string;
  /**Target directory for output */
  directory: string;
  /**Format of output: JSON, JSONL, CSV, XML, Sqlite, or Parquet */
  format: Format;
  /**Compress data with GZIP and all files with ZIP */
  compress: boolean;
  /**Endpoint ID */
  endpoint_id: string;
  /**ID for collection. Must be positive number */
  collection_id: number;
  /**Output type: local, azure, aws, or gcp */
  destination: OutputType;
  /**URL associated with remote upload */
  url?: string;
  /**API key required for remote upload */
  api_key?: string;
}

/** Output format types */
export enum Format {
  JSON = "json",
  JSONL = "jsonl",
  CSV = "csv",
  XML = "xml",
  PARQUET = "parquet",
  SQLITE = "sqlite",
}

/**Output type. Only local, azure, aws, and gcp supported */
export enum OutputType {
  LOCAL = "local",
  AZURE = "azure",
  AWS = "aws",
  GCP = "gcp",
}

/**
 * Class that exposes the Artemis output pipeline to JavaScript
 */
export class OutputManager {
  private manager: unknown;

  /**
   * Construct the artemis `OutputManager`
   * @param output `Output` object structure
   */
  constructor(output: Output) {
    // @ts-expect-error: Custom Artemis class
    this.manager = new JsOutputManager(output);
  }

  /**
   * Function to write artifact data results
   * @param data Artifact data to write
   * @param artifact_name Name of artifact to write to
   * @returns True on success or `SystemError`
   */
  public write_artifact(data: unknown, artifact_name: string): boolean | SystemError {
    try {
      // @ts-expect-error: Custom Artemis class function
      const results = this.manager.js_write_artifact(data, artifact_name);
      return results;
    } catch (err) {
      return new SystemError(`OUTPUT`, `failed to write artifact: ${err}`);
    }
  }

  /**
   * Function to finish writing artifact results. Once this function is called the `OutputManager` is destroyed and cannot be used again
   * @returns True on success or `SystemError`
   */
  public finalize(): boolean | SystemError {
    try {
      // @ts-expect-error: Custom Artemis class function
      const results = this.manager.js_finalize();
      return results;
    } catch (err) {
      return new SystemError(`OUTPUT`, `failed to finalize output: ${err}`);
    }
  }
}