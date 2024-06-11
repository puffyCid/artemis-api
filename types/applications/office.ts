export interface OfficeRecentFilesWindows {
  path: string;
  last_opened: string;
  application: string;
  registry_file: string;
  key_path: string;
}

export enum OfficeApp {
  WORD = "Word",
  POWERPOINT = "PowerPoint",
  EXCEL = "Excel",
  ACCESS = "Access",
  ONENOTE = "OneNote",
  UNKNOWN = "Unknown",
}
