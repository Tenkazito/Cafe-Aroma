"use client";

import { type ReactNode, useState } from "react";
import { ClientHeader } from "@/common/components/layout/ClientHeader";
import { ClientSidebar } from "@/common/components/layout/ClientSidebar";
import type { NavItem, SessionUser } from "@/common/types/navigation";

type ClientShellProps = {
	user: SessionUser;
	navItems: NavItem[];
	logoutHref: string;
	headerActions?: ReactNode;
	children: ReactNode;
};

/**
 * Esqueleto de las pantallas del cliente: header arriba, sidebar a la izquierda
 * y contenido. En móvil el sidebar se abre como panel sobre el contenido.
 */
export const ClientShell = ({
	user,
	navItems,
	logoutHref,
	headerActions,
	children,
}: ClientShellProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const closeSidebar = () => setIsSidebarOpen(false);

	return (
		<div className="min-h-screen bg-surface-client">
			<ClientHeader
				user={user}
				actions={headerActions}
				onMenuClick={() => setIsSidebarOpen(true)}
			/>

			<div className="flex">
				<aside className="hidden w-64 shrink-0 p-4 md:block">
					<ClientSidebar items={navItems} logoutHref={logoutHref} />
				</aside>

				{isSidebarOpen && (
					<div className="fixed inset-0 z-40 md:hidden">
						<button
							type="button"
							aria-label="Cerrar menú"
							onClick={closeSidebar}
							className="absolute inset-0 bg-navy/40"
						/>
						<aside className="relative h-full w-72 bg-surface-client p-4 shadow-xl">
							<ClientSidebar
								items={navItems}
								logoutHref={logoutHref}
								onNavigate={closeSidebar}
							/>
						</aside>
					</div>
				)}

				<main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main>
			</div>
		</div>
	);
};
