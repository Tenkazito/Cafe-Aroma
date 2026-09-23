import type { CustomerOrder, Order } from "@/features/orders/types";

/** Pedidos del día que ve el administrador (pantalla Pedidos, Dashboard y Facturación). */
export const MOCK_ORDERS: Order[] = [
	{
		id: 1045,
		createdAt: "2026-08-26 09:15",
		customerName: "Laura Patiño",
		address: "Calle 72 # 11-30, Chapinero",
		status: "solicitado",
		items: [
			{ productName: "Latte Clásico", quantity: 2, unitPrice: 8500 },
			{ productName: "Muffin de Arándanos", quantity: 1, unitPrice: 5500 },
		],
	},
	{
		id: 1044,
		createdAt: "2026-08-26 08:50",
		customerName: "Esteban Ríos",
		address: "Av. Caracas # 14-45, Centro",
		status: "solicitado",
		items: [
			{ productName: "Frappuccino Caramelo", quantity: 1, unitPrice: 12500 },
		],
	},
	{
		id: 1043,
		createdAt: "2026-08-26 08:32",
		customerName: "Valentina Cruz",
		address: "Calle 100 # 45-20, Usaquén",
		status: "pendiente",
		items: [
			{ productName: "Cappuccino Italiano", quantity: 2, unitPrice: 9000 },
			{ productName: "Frappuccino Caramelo", quantity: 1, unitPrice: 12500 },
		],
	},
	{
		id: 1042,
		createdAt: "2026-08-26 08:10",
		customerName: "Camilo Ortega",
		address: "Cra 7 # 115-30, Norte",
		status: "pendiente",
		items: [
			{ productName: "Matcha Latte", quantity: 1, unitPrice: 11000 },
			{
				productName: "Cheesecake de Frutos Rojos",
				quantity: 1,
				unitPrice: 9500,
			},
		],
	},
	{
		id: 1041,
		createdAt: "2026-08-26 07:55",
		customerName: "Daniela Mora",
		address: "Calle 85 # 12-50, Chapinero",
		status: "entregado",
		items: [
			{ productName: "Espresso Doble", quantity: 2, unitPrice: 6000 },
			{ productName: "Brownie de Chocolate", quantity: 1, unitPrice: 6500 },
		],
	},
	{
		id: 1040,
		createdAt: "2026-08-26 07:30",
		customerName: "Felipe Castaño",
		address: "Cra 11 # 93-77, Chicó",
		status: "entregado",
		items: [
			{ productName: "Latte Clásico", quantity: 1, unitPrice: 8500 },
			{ productName: "Brownie de Chocolate", quantity: 1, unitPrice: 6500 },
		],
	},
	{
		id: 1039,
		createdAt: "2026-08-26 07:05",
		customerName: "Isabella Gómez",
		address: "Calle 127 # 20-15, Suba",
		status: "cancelado",
		items: [
			{
				productName: "Cheesecake de Frutos Rojos",
				quantity: 1,
				unitPrice: 9500,
			},
		],
	},
];

/** Historial del cliente con sesión (pantalla Últimos pedidos). */
export const MOCK_CUSTOMER_ORDERS: CustomerOrder[] = [
	{ code: "ORD-1042", date: "2026-08-26", total: 19500, status: "entregado" },
	{ code: "ORD-1041", date: "2026-08-25", total: 19500, status: "pendiente" },
	{ code: "ORD-1040", date: "2026-08-24", total: 11000, status: "solicitado" },
	{ code: "ORD-1039", date: "2026-08-23", total: 23000, status: "cancelado" },
	{ code: "ORD-1038", date: "2026-08-22", total: 26000, status: "entregado" },
];

/**
 * Resumen histórico del cliente para el Panel principal. Va aparte porque
 * cubre todos sus pedidos, no solo los últimos 5 de la tabla.
 */
export const MOCK_CUSTOMER_ORDER_STATS = {
	total: 42,
	pending: 3,
	delivered: 36,
	cancelled: 3,
};
