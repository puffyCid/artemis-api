export interface History {
  line: string;
  path: string;
  created: string;
  modified: string;
  accessed: string;
  changed: string;
  message: string;
  datetime: string;
  timestamp_desc: "PowerShell History Modified";
  artifact: "PowerShell History";
  data_type: "application:powershell:entry";
}
