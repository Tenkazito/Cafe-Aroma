import type { CustomerOrder, OrderFiltersValue } from "@/features/orders/types";

/** Filtra el historial del cliente por estado y fecha (los demás filtros no aplican). */
export const filterCustomerOrders = (
	orders: CustomerOrder[],
	filters: Pick<OrderFiltersValue, "status" | "date">,
): CustomerOrder[] => {
	return orders.filter((order) => {
		if (filters.status !== "todos" && order.status !== filters.status) {
			return false;
		}
		if (filters.date && order.date !== filters.date) {
			return false;
		}
		return true;
	});
};
