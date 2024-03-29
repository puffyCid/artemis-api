export interface RpmPackages {
  name: string;
  version: string;
  release: string;
  source: string;
  size: number;
  sha1: string;
  arch: string;
  /**In UNIXEPOCH seconds */
  install_time: number;
  vendor: string;
  package_group: string;
  summary: string;
  url: string;
}
