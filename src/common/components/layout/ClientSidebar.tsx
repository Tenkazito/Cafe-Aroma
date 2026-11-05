"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/common/components/ui/Icon";
import { isNavItemActive } from "@/common/lib/navigation";
import { locations } from "@/common/locations";
import type { NavItem } from "@/common/types/navigation";

type ClientSidebarProps = {
	items: NavItem[];
	logoutHref: string;
	/** Se llama al tocar un enlace; en móvil sirve para cerrar el menú. */
	onNavigate?: () => void;
};

/** Menú lateral de las pantallas del cliente. */
export const ClientSidebar = ({
	items,
	logoutHref,
	onNavigate,
}: ClientSidebarProps) => {
	const pathname = usePathname();
	const rootHref = items[0]?.href ?? "/";

	return (
		<nav
			aria-label={locations.navigation.customerMenuLabel}
			className="flex flex-col gap-1"
		>
			<ul className="flex flex-col gap-1">
				{items.map((item) => {
					const isActive = isNavItemActive(pathname, item.href, rootHref);

					return (
						<li key={item.href}>
							<Link
								href={item.href}
								onClick={onNavigate}
								aria-current={isActive ? "page" : undefined}
								className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
									isActive
										? "bg-navy text-white"
										: "text-gray-600 hover:bg-white/50 hover:text-navy"
								}`}
							>
								<Icon name={item.icon} />
								<span className="flex-1">{item.label}</span>
								{Boolean(item.badge) && (
									<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal px-1.5 text-xs font-bold text-navy">
										{item.badge}
									</span>
								)}
							</Link>
						</li>
					);
				})}
			</ul>

			<hr className="my-3 border-navy/10" />

			<Link
				href={logoutHref}
				onClick={onNavigate}
				className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-white/50 hover:text-navy"
			>
				<Icon name="logOut" />
				{locations.navigation.logout}
			</Link>
		</nav>
	);
};
