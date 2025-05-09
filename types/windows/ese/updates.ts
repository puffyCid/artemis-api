export interface UpdateHistory {
  client_id: string;
  support_url: string;
  date: string;
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

export interface UpdateHistoryV2 {
  provider_id: string;
  update_id:string;
  time: string | null;
  title: string | null;
  description: string | null;
  info_url: string | null;
  category: string | null;
  uninstall: boolean | null;
  reboot: boolean | null;
  for_os: boolean | null;
  metadata: Record<string, unknown> | null;
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
