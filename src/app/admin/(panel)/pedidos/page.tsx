import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { OrdersManager } from "@/features/orders/components/OrdersManager";
import { MOCK_ORDERS } from "@/features/orders/mocks/orders";

export const metadata: Metadata = { title: locations.pageTitles.adminOrders };

const OrdersPage = () => {
	return <OrdersManager orders={MOCK_ORDERS} />;
};

export default OrdersPage;
