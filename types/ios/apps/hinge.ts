export interface Messages {
  user_id: string;
  timestamp: number;
  id: string;
  message: string;
}

export interface Notification {
  timestamp: string;
  message_id: string;
  origin: string;
  title: string;
}
