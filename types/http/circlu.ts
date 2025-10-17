export interface HashlookupResponse {
  FileName?: string;
  FileSize: string;
  MD5: string;
  "RDS:Package_id": string;
  "SHA-1": string;
  "SHA-256": string;
  "insert-timestamp"?: string;
  source?: string;
  "hashlookup:trust"?: number;
  SSDEEP?: string;
  "tar:gnome"?: string;
  "tar:uname"?: string;
  TLSH?: string;
  ProductCode?: {
    PackageDescription?: string;
    PackageMaintainer?: string;
    ProductName?: string;
    PackageSection?: string;
    PackageVersion?: string;
    ApplicationType?: string;
    MfgCode?: string;
    Language?: string;
  };

  "hashlookup:children-total"?: number;
  "hashlookup:parent-total"?: number;
  mimetype?: string;
  parents?: Record<string, string>[];
  children?: Record<string, string>[];
  [ key: string ]: unknown;
}

export interface MissingHash {
  message: string;
  query: string;
}

export enum HashType {
  MD5 = "md5",
  SHA1 = "sha1",
  SHA256 = "sha256",
}
