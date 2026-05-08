export interface OfficeRecentFilesWindows {
  path: string;
  last_opened: string;
  application: string;
  key_path: string;
  timestamp_desc: "Last Opened";
  artifact: "Office Recent File";
  data_type: "application:office:recent:entry";
  message: string;
  evidence: string;
}

export enum OfficeApp {
  WORD = "Word",
  POWERPOINT = "PowerPoint",
  EXCEL = "Excel",
  ACCESS = "Access",
  ONENOTE = "OneNote",
  UNKNOWN = "Unknown",
}
