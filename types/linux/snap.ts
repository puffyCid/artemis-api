/**
 * Metadata on the installed Snap state
 */
export interface SnapState {
  type: string;
  /**Array of Snap revisions */
  sequence: Snap[];
  active: boolean;
  /**Current Active revision */
  current: string;
  channel: string;
  /**Last refresh timestamp in UTC */
  "last-refresh-time": string;
  [key: string]: unknown;
}

export interface Snap {
  /**Name of snap */
  name: string;
  /**Application version */
  version: string;
  /**Snap revision */
  revision: number;
  summary?: string;
  description?: string;
  "snap-id": string;
  chanel?: string;
  title?: string;
  [key: string]: unknown;
}
