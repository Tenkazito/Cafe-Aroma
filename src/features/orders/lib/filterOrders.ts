import type { Order, OrderFiltersValue } from "@/features/orders/types";

export const EMPTY_ORDER_FILTERS: OrderFiltersValue = {
	status: "todos",
	date: "",
	customer: "",
	search: "",
};

const includesText = (value: string, search: string): boolean =>
	value.toLowerCase().includes(search.trim().toLowerCase());

/**
 * Aplica los filtros de la pantalla de pedidos. Cada filtro vacío se ignora,
 * así que con EMPTY_ORDER_FILTERS se devuelven todos los pedidos.
 */
export const filterOrders = (
	orders: Order[],
	filters: OrderFiltersValue,
): Order[] => {
	return orders.filter((order) => {
		if (filters.status !== "todos" && order.status !== filters.status) {
			return false;
		}
		// createdAt es "AAAA-MM-DD HH:mm" y el input de fecha da "AAAA-MM-DD"
		if (filters.date && !order.createdAt.startsWith(filters.date)) {
			return false;
		}
		if (
			filters.customer &&
			!includesText(order.customerName, filters.customer)
		) {
			return false;
		}
		if (
			filters.search &&
			!includesText(String(order.id), filters.search.replace("#", "")) &&
			!includesText(order.customerName, filters.search)
		) {
			return false;
		}
		return true;
	});
};
