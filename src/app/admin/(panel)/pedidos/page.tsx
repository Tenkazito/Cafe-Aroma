import type { Metadata } from "next";
import { OrdersManager } from "@/features/orders/components/OrdersManager";
import { MOCK_ORDERS } from "@/features/orders/mocks/orders";

export const metadata: Metadata = { title: "Pedidos · Admin Café Aroma" };

const OrdersPage = () => {
	return <OrdersManager orders={MOCK_ORDERS} />;
};

export default OrdersPage;
