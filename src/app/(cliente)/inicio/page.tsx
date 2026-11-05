import type { Metadata } from "next";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { locations } from "@/common/locations";
import { CustomerStatsGrid } from "@/features/orders/components/CustomerStatsGrid";
import { OrderCtaCard } from "@/features/orders/components/OrderCtaCard";
import { MOCK_CUSTOMER_ORDER_STATS } from "@/features/orders/mocks/orders";

export const metadata: Metadata = { title: locations.pageTitles.customerHome };

const CustomerHomePage = () => {
	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title={locations.customerOrders.homeTitle}
				description={locations.customerOrders.homeDescription}
			/>
			<CustomerStatsGrid stats={MOCK_CUSTOMER_ORDER_STATS} />
			<OrderCtaCard />
		</div>
	);
};

export default CustomerHomePage;
