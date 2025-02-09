/**
 * Information about installed GNOME extensions
 */
export interface Extension {
  /**Path to extension metadata.json file */
  extension_path: string;
  /**Name of the extension */
  name: string;
  /**Extension description */
  description: string;
  /**Author (UUID) of the extension */
  uuid: string;
  /**Extension version */
  version: number;
  /**Supported GNOME Shell versions */
  "shell-version": string[];
  /**Extension Type: User or System */
  extension_type: ExtensionType;
  /**Other JSON key entries */
  [key: string]: unknown;
  /**metadata.json created */
  created: string;
  /**metadata.json modified */
  modified: string;
  /**metadata.json accessed */
  accessed: string;
  /**metadata.json changed */
  changed: string;
}

export enum ExtensionType {
  User = "User",
  System = "System",
  Unknown = "Unknown",
}
