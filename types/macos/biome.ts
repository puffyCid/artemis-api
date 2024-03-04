export interface Biome {
  appFocus: AppFocus[];
  failed_records: string[];
}

export interface AppFocus {
  entry_created: number;
  start: number;
  end: number;
  bundle_id: string;
  action_guid: string;
  version: string;
  internal_version: string;
  raw_entry: Record<string, unknown>;
}
