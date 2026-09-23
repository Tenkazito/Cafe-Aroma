import Link from "next/link";
import { Icon } from "@/common/components/ui/Icon";

type NotificationBellProps = {
	unreadCount: number;
};

/** Campana del header del cliente con el número de notificaciones sin leer. */
export const NotificationBell = ({ unreadCount }: NotificationBellProps) => {
	const label =
		unreadCount > 0
			? `Notificaciones, ${unreadCount} sin leer`
			: "Notificaciones";

	return (
		<Link
			href="/notificaciones"
			aria-label={label}
			className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy shadow-sm hover:bg-gray-50"
		>
			<Icon name="bell" />
			{unreadCount > 0 && (
				<span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal px-1 text-xs font-bold text-navy">
					{unreadCount}
				</span>
			)}
		</Link>
	);
};
