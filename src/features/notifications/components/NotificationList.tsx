"use client";

import { useState } from "react";
import { EmptyState } from "@/common/components/ui/EmptyState";
import { locations } from "@/common/locations";
import { NotificationItem } from "@/features/notifications/components/NotificationItem";
import type { Notification } from "@/features/notifications/types";

type NotificationListProps = {
	notifications: Notification[];
};

export const NotificationList = ({ notifications }: NotificationListProps) => {
	// Copia local para poder marcar como leídas sin backend
	const [items, setItems] = useState(notifications);

	const markAsRead = (id: number) => {
		// TODO: llamar al Server Action que marca la notificación como leída
		setItems((currentItems) =>
			currentItems.map((item) =>
				item.id === id ? { ...item, isRead: true } : item,
			),
		);
	};

	if (items.length === 0) {
		return (
			<div className="rounded-2xl bg-white">
				<EmptyState icon="bell" title={locations.notifications.empty} />
			</div>
		);
	}

	return (
		<ul className="flex flex-col gap-3">
			{items.map((notification) => (
				<NotificationItem
					key={notification.id}
					notification={notification}
					onMarkAsRead={markAsRead}
				/>
			))}
		</ul>
	);
};
