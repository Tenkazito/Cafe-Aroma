"use client";

import { toast } from "@heroui/react";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { NotificationItem } from "@/features/notifications/components/NotificationItem";
import { NotificationList } from "@/features/notifications/components/NotificationList";
import { MOCK_NOTIFICATIONS } from "@/features/notifications/mocks/notifications";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

export const NotificationsShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("notifications")}>
			<ShowcaseGroup title="Componentes">
				<ComponentPreview
					name="NotificationBell"
					description="Campana del header con el número de no leídas. Se inyecta en ClientHeader desde el layout."
					path="src/features/notifications/components/NotificationBell.tsx"
					background="client"
				>
					<div className="flex gap-6">
						<NotificationBell unreadCount={2} />
						<NotificationBell unreadCount={0} />
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="NotificationItem"
					description="Una notificación: resaltada y con botón ✓ si no está leída."
					path="src/features/notifications/components/NotificationItem.tsx"
					background="client"
				>
					<ul className="flex flex-col gap-3">
						<NotificationItem
							notification={MOCK_NOTIFICATIONS[0]}
							onMarkAsRead={() => toast.info("Marcada como leída")}
						/>
						<NotificationItem
							notification={MOCK_NOTIFICATIONS[2]}
							onMarkAsRead={() => undefined}
						/>
					</ul>
				</ComponentPreview>

				<ComponentPreview
					name="NotificationList"
					description="Lista con estado local: al tocar ✓ la notificación pasa a leída."
					path="src/features/notifications/components/NotificationList.tsx"
					background="client"
				>
					<div className="flex flex-col gap-6">
						<NotificationList notifications={MOCK_NOTIFICATIONS} />
						<NotificationList notifications={[]} />
					</div>
				</ComponentPreview>
			</ShowcaseGroup>

			<ShowcaseGroup title="Lógica">
				<ComponentPreview
					kind="code"
					name="countUnread(notifications)"
					description="Cuántas notificaciones no están leídas. Alimenta la campana y el contador del sidebar."
					path="src/features/notifications/lib/countUnread.ts"
				/>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
