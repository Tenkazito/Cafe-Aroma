import type { ReactNode } from "react";
import { ClientShell } from "@/common/components/layout/ClientShell";
import { CLIENT_NAV_ITEMS } from "@/common/lib/navigation";
import { MOCK_CUSTOMER_USER } from "@/features/auth/mocks/currentUser";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { countUnread } from "@/features/notifications/lib/countUnread";
import { MOCK_NOTIFICATIONS } from "@/features/notifications/mocks/notifications";

type CustomerLayoutProps = {
	children: ReactNode;
};

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
	const unreadCount = countUnread(MOCK_NOTIFICATIONS);

	// El contador de no leídas se agrega al enlace "Notificaciones" del sidebar
	const navItems = CLIENT_NAV_ITEMS.map((item) =>
		item.href === "/notificaciones" ? { ...item, badge: unreadCount } : item,
	);

	return (
		<ClientShell
			user={MOCK_CUSTOMER_USER}
			navItems={navItems}
			logoutHref="/login"
			headerActions={<NotificationBell unreadCount={unreadCount} />}
		>
			{children}
		</ClientShell>
	);
};

export default CustomerLayout;
