export interface DebPackages {
  name: string;
  version: string;
  size: number;
  arch: string;
  status: string;
  maintainer: string;
  section: string;
  priority: string;
  homepage: string;
  dependencies: string[];
  message: string;
  datetime: "1970-01-01T00:00:00.000Z";
  timestamp_desc: "None";
  artifact: "DEB Package";
  data_type: "linux:deb:entry";
  evidence: string;
}
