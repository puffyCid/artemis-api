export interface Url {
  authority: string;
  username: string;
  password: string;
  host: string;
  domain: string;
  port: number | null;
  path: string;
  segments: string[];
  last_segment: string;
  query: string;
  query_pairs: string[];
  fragment: string;
  scheme: string;
  url: string;
  [key: string]: unknown;
}
