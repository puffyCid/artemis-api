export interface XprotectEntries {
  name: string;
  launch_type: string;
  matches: MatchData[];
}

export interface MatchData {
  /**Hex encoded values */
  pattern: string;
  filetype: string;
  sha1: string;
  filename: string;
}
