import type { Metadata } from "next";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { NotificationList } from "@/features/notifications/components/NotificationList";
import { MOCK_NOTIFICATIONS } from "@/features/notifications/mocks/notifications";

export const metadata: Metadata = { title: "Notificaciones · Café Aroma" };

const NotificationsPage = () => {
	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title="Notificaciones"
				description="Mantente al tanto del estado de tus pedidos y novedades."
			/>
			<NotificationList notifications={MOCK_NOTIFICATIONS} />
		</div>
	);
};

export default NotificationsPage;
