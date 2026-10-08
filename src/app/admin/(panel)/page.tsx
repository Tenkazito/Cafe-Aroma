import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { DailyTotalsPanel } from "@/features/dashboard/components/DailyTotalsPanel";
import { LoyalCustomersWidget } from "@/features/dashboard/components/LoyalCustomersWidget";
import { SalesSummaryWidget } from "@/features/dashboard/components/SalesSummaryWidget";
import { TopProductsWidget } from "@/features/dashboard/components/TopProductsWidget";
import {
	MOCK_DAILY_GOAL,
	MOCK_LOYAL_CUSTOMERS,
	MOCK_SALES_SUMMARY,
	MOCK_TOP_PRODUCTS,
} from "@/features/dashboard/mocks/dashboard";
import { countOrdersByStatus } from "@/features/orders/lib/countOrdersByStatus";
import { MOCK_ORDERS } from "@/features/orders/mocks/orders";

export const metadata: Metadata = { title: locations.pageTitles.adminHome };

const AdminDashboardPage = () => {
	return (
		<div className="flex flex-col gap-6">
			<DailyTotalsPanel
				counts={countOrdersByStatus(MOCK_ORDERS)}
				goal={MOCK_DAILY_GOAL}
			/>
			<TopProductsWidget products={MOCK_TOP_PRODUCTS} />
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<SalesSummaryWidget summaryByPeriod={MOCK_SALES_SUMMARY} />
				<LoyalCustomersWidget customers={MOCK_LOYAL_CUSTOMERS} />
			</div>
		</div>
	);
};

export default AdminDashboardPage;
