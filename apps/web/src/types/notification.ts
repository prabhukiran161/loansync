export type NotificationType = "verified" | "added" | "rejected" | "invite";

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  isRead: boolean;
  type: NotificationType;
}
