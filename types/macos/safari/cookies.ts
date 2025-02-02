export interface Cookie {
  flag: CookieFlag;
  domain: string;
  name: string;
  path: string;
  value: string;
  expiration: string;
  created: string;
}

export enum CookieFlag {
  IsSecure = "IsSecure",
  Unknown = "Unknown",
  IsHttp = "IsHttp",
  IsSecureHttp = "IsSecureHttp",
}
