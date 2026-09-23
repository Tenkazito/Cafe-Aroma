import type { Order, OrderStatusCounts } from "@/features/orders/types";

/** Cuenta cuántos pedidos hay en cada estado, más el total. */
export const countOrdersByStatus = (orders: Order[]): OrderStatusCounts => {
	const counts: OrderStatusCounts = {
		solicitado: 0,
		pendiente: 0,
		entregado: 0,
		cancelado: 0,
		total: orders.length,
	};

	for (const order of orders) {
		counts[order.status] += 1;
	}

	return counts;
};
