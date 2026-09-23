import { getOrderTotal } from "@/features/orders/lib/orderTotals";
import type { Order } from "@/features/orders/types";

/** Una factura es un pedido entregado: solo esos se facturan. */
export const getInvoices = (orders: Order[]): Order[] =>
	orders.filter((order) => order.status === "entregado");

/** Suma del valor de todas las facturas. */
export const getBilledTotal = (invoices: Order[]): number =>
	invoices.reduce((total, invoice) => total + getOrderTotal(invoice), 0);

/** Datos fiscales del encabezado de la factura. */
export const COMPANY_INFO = {
	name: "Café Aroma",
	taxId: "NIT: 900.123.456-7",
	channel: "Pedidos Online",
};
