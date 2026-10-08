"use client";

import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";
import type { Notification } from "@/features/notifications/types";

type NotificationItemProps = {
	notification: Notification;
	onMarkAsRead: (id: number) => void;
};

/** Una notificación. Las no leídas se resaltan y tienen el botón ✓ para marcarlas como leídas. */
export const NotificationItem = ({
	notification,
	onMarkAsRead,
}: NotificationItemProps) => {
	const isUnread = !notification.isRead;

	return (
		<li
			className={`flex items-start gap-4 rounded-2xl p-4 ${isUnread ? "bg-surface-field" : "bg-white"}`}
		>
			<div
				className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
					isUnread ? "bg-teal text-navy" : "bg-mint/50 text-gray-400"
				}`}
			>
				<Icon name="bell" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="font-bold text-navy">{notification.title}</p>
				<p className="text-sm text-gray-500">{notification.message}</p>
			</div>
			<div className="flex shrink-0 items-center gap-2">
				<span className="text-xs text-gray-400">{notification.timeAgo}</span>
				{isUnread && (
					<button
						type="button"
						onClick={() => onMarkAsRead(notification.id)}
						aria-label={locations.notifications.markAsRead(notification.title)}
						className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-navy hover:bg-teal/80"
					>
						<Icon name="check" size={14} />
					</button>
				)}
			</div>
		</li>
	);
};
