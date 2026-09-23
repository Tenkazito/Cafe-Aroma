import type { Notification } from "@/features/notifications/types";

export const countUnread = (notifications: Notification[]): number =>
	notifications.filter((notification) => !notification.isRead).length;
