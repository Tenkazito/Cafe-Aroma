import type { Order, OrderItem } from "@/features/orders/types";

export const getItemSubtotal = (item: OrderItem): number =>
	item.quantity * item.unitPrice;

/** Total del pedido: suma de cantidad × precio de cada producto. */
export const getOrderTotal = (order: Order): number =>
	order.items.reduce((total, item) => total + getItemSubtotal(item), 0);

/** Número de orden como se muestra en pantalla: 1045 → "#1045". */
export const formatOrderId = (id: number): string => `#${id}`;
