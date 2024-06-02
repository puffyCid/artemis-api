export interface UpdateHistory {
  client_id: string;
  support_url: string;
  /**Timestamp in UNIXEPOCH seconds */
  date: number;
  description: string;
  operation: Operation;
  server_selection: ServerSelection;
  service_id: string;
  title: string;
  update_id: string;
  update_revision: number;
  categories: string;
  more_info: string;
}

export enum ServerSelection {
  Default = "Default",
  ManagedServer = "ManagedServer",
  WindowsUpdate = "WindowsUpdate",
  Others = "Others",
  Unknown = "Unknown",
}

export enum Operation {
  Installation = "Installation",
  Uninstallation = "Uninstallation",
  Unknown = "Unknown",
}
