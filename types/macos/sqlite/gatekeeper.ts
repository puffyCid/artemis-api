export interface GatekeeperEntries {
  id: number;
  version: number;
  type: GkType;
  requirement?: string;
  allow: boolean;
  disabled: boolean;
  expires: string;
  label?: string;
  filter_unsigned?: string;
  entry_created: string;
  entry_modified: string;
  user?: string;
  remarks?: string;
  expiration?: string;
  object_state_label?: string;
  path?: string;
  object_state_ctime?: string;
  hash?: string;
  object_expires?: string;
  object_path?: string;
  object_ctime?: string;
  object_mtime?: string;
  message: string;
  datetime: string;
  timestamp_desc: "Entry Created";
  artifact: "Gatekeeper";
  data_type: "macos:gatekeeper:entry";
  source: string;
}

export enum GkType {
  EXECUTE = "SecAssessmentOperationTypeExecute",
  INSTALL = "SecAssessmentOperationTypeInstall",
  DOCUMENT = "SecAssessmentOperationTypeOpenDocument",
  UNKNOWN = "Unknown",
}
