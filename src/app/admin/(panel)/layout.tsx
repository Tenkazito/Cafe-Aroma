import type { ReactNode } from "react";
import { AdminNavbar } from "@/common/components/layout/AdminNavbar";
import { ADMIN_NAV_ITEMS } from "@/common/lib/navigation";
import { MOCK_ADMIN_USER } from "@/features/auth/mocks/currentUser";

type AdminPanelLayoutProps = {
	children: ReactNode;
};

const AdminPanelLayout = ({ children }: AdminPanelLayoutProps) => {
	return (
		<div className="min-h-screen bg-surface-admin">
			<AdminNavbar
				items={ADMIN_NAV_ITEMS}
				user={MOCK_ADMIN_USER}
				logoutHref="/admin/login"
			/>
			<main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
		</div>
	);
};

export default AdminPanelLayout;
