export interface SystemNotification {
  id: number | string;
  imp: boolean; // Important notice (triggers modal popup)
  unread: boolean;
  title: string;
  date: string;
  body: string;
}
