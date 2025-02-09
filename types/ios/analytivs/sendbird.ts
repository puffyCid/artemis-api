export interface StatStorage {
  device_id: string;
  /**YYYY-MM-DDTHH:mm:ss.SSSZ */
  last_sent: string;
  /**YYYY-MM-DDTHH:mm:ssZ */
  oldest_stat: string;
  daily_states: Daily[];
}

export interface Daily {
  stat_type: string;
  /**YYYYMMDD */
  formatted_date?: string;
  data?: {
    use_local_cache: boolean;
  };
  is_uploaded?: boolean;
  timestamp?: number;
}
