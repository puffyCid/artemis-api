export interface CrxResponse {
  data: {
    csp: Record<string, string[]>;
    dangerousfunctions: Record<string, Record<string, number[]>>;
    entrypoints: Record<string, Record<string, number[]>>;
    extcalls: string[];
    manifest: Record<string, unknown>;
    related: Record<string, unknown>;
    risk: Record<string, unknown>;
    webstore: {
      address: string;
      email: string;
      icon: string;
      last_updated: string;
      name: string;
      offered_by: string;
      permission_warnings: unknown[];
      privacy_policy: string;
      rating: number;
      rating_users: number;
      short_description: string;
      size: string;
      support_size: string;
      users: number;
      versions: string;
      website: string;
      type: string;
      price: string;
    };
  };
  extension_id: string;
  version: string;
}

export enum Browser {
  FIREFOX = "Firefox",
  CHROME = "Chrome",
  EDGE = "Edge",
}
