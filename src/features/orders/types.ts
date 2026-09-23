/**
 * Ciclo de un pedido: el cliente lo "solicita", el admin lo acepta ("pendiente")
 * o lo rechaza ("cancelado"), y el mensajero lo marca como "entregado".
 */
export type OrderStatus =
	| "solicitado"
	| "pendiente"
	| "entregado"
	| "cancelado";

export type OrderItem = {
	productName: string;
	quantity: number;
	/** Precio unitario en COP. */
	unitPrice: number;
};

/** Pedido tal como lo ve el administrador. */
export type Order = {
	id: number;
	/** Fecha y hora en formato "AAAA-MM-DD HH:mm". */
	createdAt: string;
	customerName: string;
	address: string;
	status: OrderStatus;
	items: OrderItem[];
};

/** Pedido tal como lo ve el cliente en "Últimos pedidos". */
export type CustomerOrder = {
	code: string;
	/** Fecha en formato "AAAA-MM-DD". */
	date: string;
	total: number;
	status: OrderStatus;
};

export type OrderStatusCounts = Record<OrderStatus, number> & {
	total: number;
};

export type OrderFiltersValue = {
	status: OrderStatus | "todos";
	/** Fecha "AAAA-MM-DD" o vacío para no filtrar. */
	date: string;
	customer: string;
	/** Busca por número de orden o nombre del cliente. */
	search: string;
};
