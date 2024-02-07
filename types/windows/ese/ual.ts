export interface UserAccessLog {
  total_accesses: number;
  last_logon: number;
  first_logon: number;
  ip: string;
  username: string;
  domain: string;
  domain_username: string;
  role_guid: string;
  role_name: string;
}
