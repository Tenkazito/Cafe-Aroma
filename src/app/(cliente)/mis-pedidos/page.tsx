import type { Metadata } from "next";
import { CustomerOrdersManager } from "@/features/orders/components/CustomerOrdersManager";
import { MOCK_CUSTOMER_ORDERS } from "@/features/orders/mocks/orders";

export const metadata: Metadata = { title: "Últimos pedidos · Café Aroma" };

const CustomerOrdersPage = () => {
	return <CustomerOrdersManager orders={MOCK_CUSTOMER_ORDERS} />;
};

export default CustomerOrdersPage;
