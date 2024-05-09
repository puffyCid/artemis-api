export interface MacosQuarantine {
  path: string;
  events: QuarantineEvent[];
}
export interface QuarantineEvent {
  id: string;
  timestamp: number;
  bundle_id?: string;
  agent_name: string;
  url_string?: string;
  sender_name?: string;
  sender_address?: string;
  type: QuarantineType;
  origin_title?: string;
  origin_url?: string;
  origin_alias?: string;
}

export enum QuarantineType {
  WEBDOWNLOAD = "WebDownload",
  DOWNLOAD = "Download",
  EMAILATTACHMENT = "EmailAttachment",
  MESSAGEATTACHMENT = "MessageAttachment",
  CALENDARATTACHMENT = "CalendarAttachment",
  ATTACHMENT = "Attachment",
  UNKNOWN = "Unknown",
}
