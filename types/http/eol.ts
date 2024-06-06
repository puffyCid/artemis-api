/**
 * End of Life status from https://endoflife.date
 */
export interface EolStatus {
  /**Name of software */
  name: string;
  /**Version installed */
  version: string;
  /**Latest version available */
  latest_version: string;
  /**If version is end of life */
  eol: string;
  /**If version is Long term support */
  lts: boolean;
  /**URL to the software at https://endoflife.date */
  url: string;
  /**Release date for installed version cycle */
  release_date: string;
  /**Release date for latest version */
  latest_release_date: string;
  /**Version is supported until specified date */
  support: string;
}

export interface EolResponse {
  cycle: string;
  releaseDate: string;
  eol: string;
  latest: string;
  lts: boolean;
  support: string;
  latestReleaseDate: string;
}
