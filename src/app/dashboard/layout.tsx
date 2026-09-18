import { TopNavbar } from "@/common/components/TopNavbar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-gray-50/50">
			<TopNavbar />
			<main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
		</div>
	);
}
