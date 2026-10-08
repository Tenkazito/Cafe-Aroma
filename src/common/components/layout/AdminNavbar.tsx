"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/common/components/layout/BrandLogo";
import { UserBadge } from "@/common/components/layout/UserBadge";
import { Icon } from "@/common/components/ui/Icon";
import { isNavItemActive } from "@/common/lib/navigation";
import { locations } from "@/common/locations";
import type { NavItem, SessionUser } from "@/common/types/navigation";

type AdminNavbarProps = {
	items: NavItem[];
	user: SessionUser;
	/** A dónde lleva el botón "Salir". */
	logoutHref: string;
};

/** Barra superior del panel de administración. En móvil los enlaces pasan a un menú desplegable. */
export const AdminNavbar = ({ items, user, logoutHref }: AdminNavbarProps) => {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootHref = items[0]?.href ?? "/";

	const renderLinks = (orientation: "row" | "column") =>
		items.map((item) => {
			const isActive = isNavItemActive(pathname, item.href, rootHref);

			return (
				<li key={item.href}>
					<Link
						href={item.href}
						onClick={() => setIsMenuOpen(false)}
						aria-current={isActive ? "page" : undefined}
						className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
							isActive
								? "bg-navy text-white"
								: "text-gray-500 hover:bg-gray-100 hover:text-navy"
						} ${orientation === "column" ? "w-full" : ""}`}
					>
						<Icon name={item.icon} size={16} />
						{item.label}
					</Link>
				</li>
			);
		});

	return (
		<nav className="border-b border-gray-100 bg-white">
			<div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setIsMenuOpen((current) => !current)}
						aria-label={locations.navigation.openMenu}
						aria-expanded={isMenuOpen}
						className="rounded-lg p-2 text-navy hover:bg-gray-100 lg:hidden"
					>
						<Icon name={isMenuOpen ? "x" : "menu"} />
					</button>
					<BrandLogo />
				</div>

				<ul className="hidden items-center gap-1 lg:flex">
					{renderLinks("row")}
				</ul>

				<div className="flex items-center gap-4">
					<UserBadge user={user} />
					<Link
						href={logoutHref}
						className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600"
					>
						<Icon name="logOut" size={16} />
						<span className="hidden sm:inline">
							{locations.navigation.exit}
						</span>
					</Link>
				</div>
			</div>

			{isMenuOpen && (
				<ul className="flex flex-col gap-1 border-t border-gray-100 p-3 lg:hidden">
					{renderLinks("column")}
				</ul>
			)}
		</nav>
	);
};
