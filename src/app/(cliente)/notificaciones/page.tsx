import type { Metadata } from "next";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { locations } from "@/common/locations";
import { NotificationList } from "@/features/notifications/components/NotificationList";
import { MOCK_NOTIFICATIONS } from "@/features/notifications/mocks/notifications";

export const metadata: Metadata = { title: locations.pageTitles.notifications };

const NotificationsPage = () => {
	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title={locations.notifications.title}
				description={locations.notifications.description}
			/>
			<NotificationList notifications={MOCK_NOTIFICATIONS} />
		</div>
	);
};

export default NotificationsPage;
