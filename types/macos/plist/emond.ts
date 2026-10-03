/**
 * macOS `Emond` (Event Monitor) can be used as persistence on a system.
 * A user can create `Emond` rules to execute commands on macOS.
 *
 * Starting on Ventura `Emond` was removed
 *
 * References:
 *  - https://www.xorrior.com/emond-persistence/
 */
export interface Emond {
  /**Raw plist data associated with Emond rule */
  plist_data: Record<string, unknown> | number[] | Record<string, unknown>[]
  /**Path to Emond plist */
  evidence: string;
}
